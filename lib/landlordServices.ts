import { supabase } from "@/utils/supabase/client";
import { ethers } from "ethers";
import RentalAgreement from "@/contracts/RentalAgreement.json"; // ABI
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // update if redeployed

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getInterestedProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `*, 
         owner:users!fk_owner(name, wallet_address), 
         tenant:users!fk_prospective_tenant(name, wallet_address)`
    )
    .not("prospective_tenant_id", "is", null);

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }
  return data;
};

export const updatePropertyStatus = async (
  propertyId: string,
  newStatus: string
) => {
  const { error } = await supabase
    .from("properties")
    .update({ status: newStatus })
    .eq("property_id", propertyId);

  if (error) {
    console.error("Failed to update property status:", error.message);
  }
};

export const createRental = async (property: any) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    signer
  );

  const rentAmount = ethers.parseEther("1");
  const depositAmount = ethers.parseEther("2");
  const lateFee = ethers.parseEther("0.1");
  const rentInterval = 30 * 24 * 60 * 60;

  const tenantWallet = property.tenant?.wallet_address;
  if (!tenantWallet) {
    throw new Error("Tenant wallet address is missing");
  }

  await contract.createRental(
    property.property_id,
    tenantWallet,
    rentAmount,
    depositAmount,
    lateFee,
    rentInterval
  );

  await updatePropertyStatus(property.property_id, "pending");

  await supabase
    .from("properties")
    .update({
      rent: parseFloat(ethers.formatEther(rentAmount)), // sync rent
      deposit: parseFloat(ethers.formatEther(depositAmount)), // add deposit field
      late_fee: parseFloat(ethers.formatEther(lateFee)), // add late fee column
      rent_interval: rentInterval, // if you added this
    })
    .eq("property_id", property.property_id);
};

export const endRental = async (propertyId: string) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    signer
  );

  const tx = await contract.endRental(propertyId);
  return await tx.wait();
};

export const getOnChainDueDate = async (propertyId: string) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    provider
  );

  const rental = await contract.rentals(propertyId);
  const rentDueDate = Number(rental.rentDueDate);

  console.log(
    "🕓 On-Chain Rent Due Date:",
    rentDueDate,
    new Date(rentDueDate * 1000).toISOString()
  );
  return rentDueDate;
};
