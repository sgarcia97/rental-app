import { supabase } from "@/utils/supabase/client";
import { ethers } from "ethers";
import RentalAgreement from "@/contracts/RentalAgreement.json";

//const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const expressInterest = async (propertyId: string, userId: string) => {
  const { error } = await supabase
    .from("properties")
    .update({ prospective_tenant_id: userId })
    .eq("property_id", propertyId);

  if (error) {
    alert("Failed to express interest: " + error.message);
  } else {
    alert("Interest submitted! The landlord will see your request.");
  }
};

const activateRental = async (propertyId: string) => {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask is not available");
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);

  const accounts = await provider.send("eth_accounts", []);
  if (accounts.length === 0) {
    try {
      await provider.send("eth_requestAccounts", []);
    } catch (err) {
      console.error("MetaMask connection rejected or failed", err);
      throw err;
    }
  }
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    signer
  );

  // Combined rent + deposit (from contract defaults)
  const rent = ethers.parseEther("1");
  const deposit = ethers.parseEther("2");

  const tx = await contract.activateRental(propertyId, {
    value: rent + deposit,
  });

  await tx.wait();

  // update status
  const { error } = await supabase
    .from("properties")
    .update({ status: "active" })
    .eq("property_id", propertyId);

  if (error) {
    console.error("Failed to update status in Supabase:", error.message);
  }
};

const getTenantActiveContracts = async (tenantId: string) => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("prospective_tenant_id", tenantId)
    .eq("status", "active");

  if (error) {
    console.error("Error fetching active contracts:", error.message);
    return [];
  }
  return data;
};

const getRentalStatus = async (propertyId: string) => {
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    provider
  );

  const rental = await contract.rentals(propertyId);

  const [
    _propertyId,
    _tenant,
    rentAmount,
    _depositAmount,
    lateFee,
    startDate,
    rentInterval,
    _isActive,
    _createdAt,
    _terminatedAt,
  ] = rental;

  const block = await provider.getBlock("latest");
  const now = block?.timestamp ?? Math.floor(Date.now() / 1000);

  // Compute number of intervals that have passed since startDate
  const elapsed = now - Number(startDate);
  const intervalsPassed = Math.floor(elapsed / Number(rentInterval));
  const nextDueDate =
    Number(startDate) + intervalsPassed * Number(rentInterval);

  const isLate = now > nextDueDate;
  const rent = BigInt(rentAmount);
  const late = isLate ? BigInt(lateFee) : BigInt(0);
  const totalDue = rent + late;
  console.log("🧾 Rental Timestamps:");
  console.log(
    "Start Date:",
    Number(startDate),
    new Date(Number(startDate) * 1000).toISOString()
  );
  console.log("Rent Interval (s):", Number(rentInterval));
  console.log("Current Block Time:", now, new Date(now * 1000).toISOString());
  console.log(
    "Rent Due Date (on-chain):",
    Number(nextDueDate),
    new Date(Number(nextDueDate) * 1000).toISOString()
  );

  return {
    currentBlockTime: now,
    nextDueDate,
    isLate,
    rentAmount: rent,
    lateFee: late,
    totalDue,
    rental: {
      propertyId: _propertyId,
      tenant: _tenant,
      startDate: Number(startDate),
      rentInterval: Number(rentInterval),
    },
  };
};

const payRent = async (propertyId: string) => {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask is not available");
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);

  const accounts = await provider.send("eth_accounts", []);
  if (accounts.length === 0) {
    try {
      await provider.send("eth_requestAccounts", []);
    } catch (err) {
      console.error("MetaMask connection rejected or failed", err);
      throw err;
    }
  }

  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    RentalAgreement.abi,
    signer
  );

  try {
    const rental = await contract.rentals(propertyId);

    const rentAmount = rental.rentAmount;
    const lateFee = rental.lateFee;
    const rentDueDate = Number(rental.rentDueDate);

    // Get current block timestamp
    const latestBlock = await provider.getBlock("latest");
    if (!latestBlock || latestBlock.timestamp === undefined) {
      throw new Error("Failed to fetch current block or timestamp");
    }
    const currentTime = Number(latestBlock.timestamp);

    const isLate = currentTime > rentDueDate;
    const totalDue = isLate ? rentAmount + lateFee : rentAmount;

    const tx = await contract.payRent(propertyId, {
      value: totalDue,
    });
    const receipt = await tx.wait();

    const paymentTime = new Date(latestBlock.timestamp * 1000).toISOString();

    await supabase.from("payment_history").insert({
      property_id: propertyId,
      amount: parseFloat(ethers.formatEther(totalDue)),
      payment_timestamp: paymentTime,
      tx_hash: receipt.hash,
    });

    alert("Rent paid successfully!");
  } catch (err) {
    console.error("Payment failed:", err);
    alert("Rent payment failed. See console for details.");
  }
};

export {
  expressInterest,
  activateRental,
  getTenantActiveContracts,
  getRentalStatus,
  payRent,
};
