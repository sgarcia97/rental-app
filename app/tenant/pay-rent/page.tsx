"use client";
import TemplateTenant from "@/components/template-tenant";
import { useAuth } from "@/utils/supabase/context";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getTenantActiveContracts, payRent } from "@/lib/tenantServices";
import moment from "moment";
import { formatEther } from "ethers";
import { Button } from "@/components/ui/button";

export default function PayRentPage() {
  const { session } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionStorage.sess) redirect(`/`);
    if (!session?.user.id) return;

    getTenantActiveContracts(session.user.id).then((res) => {
      setContracts(res || []);
    });
  }, [session]);

  const handlePay = async (propertyId: string) => {
    try {
      await payRent(propertyId);
      alert("Rent paid successfully!");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed.");
    }
  };

  return (
    <TemplateTenant>
      <div className="bg-white rounded-md shadow-sm mt-6 p-6">
        <h2 className="text-lg font-medium mb-6">Pay Rent</h2>

        {contracts.length === 0 ? (
          <p>No active rental contracts.</p>
        ) : (
          contracts.map((contract, i) => {
            const dueDate = moment(contract.rent_due_date);
            const isLate = moment().isAfter(dueDate);
            const rent = contract.rent_amount ?? "0";
            const lateFee = isLate ? contract.late_fee ?? "0" : "0";
            const total = (BigInt(rent) + BigInt(lateFee)).toString();

            return (
              <div
                key={contract.property_id}
                className="mb-6 border-b pb-4 last:border-none"
              >
                <h3 className="text-md font-semibold mb-1">
                  {contract.address}
                </h3>
                <div className="text-sm text-gray-600 mb-1">
                  Due: {dueDate.format("MMM D, YYYY")}
                </div>
                <div className="text-sm">
                  Rent: {formatEther(rent)} ETH <br />
                  Late Fee: {formatEther(lateFee)} ETH <br />
                  <span className="font-semibold">
                    Total: {formatEther(total)} ETH
                  </span>
                </div>
                <div className="mt-2">
                  <Button
                    onClick={() => handlePay(contract.property_id)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </TemplateTenant>
  );
}
