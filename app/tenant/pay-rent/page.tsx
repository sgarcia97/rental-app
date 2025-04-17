"use client";
import TemplateTenant from "@/components/template-tenant";
import { useAuth } from "@/utils/supabase/context";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  getTenantActiveContracts,
  payRent,
  getRentalStatus,
} from "@/lib/tenantServices";
import moment from "moment";
import { formatEther } from "ethers";
import { Button } from "@/components/ui/button";

export default function PayRentPage() {
  const { session } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!sessionStorage.sess) redirect(`/`);
    if (!session?.user.id) return;

    // Load Supabase properties
    getTenantActiveContracts(session.user.id).then(async (props) => {
      setContracts(props || []);

      // Fetch status per property
      const statusResults = await Promise.all(
        (props || []).map(async (contract: any) => {
          const status = await getRentalStatus(contract.property_id);
          return { id: contract.property_id, status };
        })
      );

      const map: Record<string, any> = {};
      statusResults.forEach((entry) => {
        map[entry.id] = entry.status;
      });
      setStatusMap(map);
    });
  }, [session]);

  const handlePay = async (propertyId: string) => {
    try {
      const rentalData = await getRentalStatus(propertyId);

      const now = rentalData.currentBlockTime; // from latest block
      const { startDate, rentInterval } = rentalData.rental;

      // Calculate the next due date using on-chain time
      const elapsed = now - Number(startDate);
      const intervalsPassed = Math.floor(elapsed / Number(rentInterval));
      const rentDueDate =
        Number(startDate) + intervalsPassed * Number(rentInterval);

      // Prevent double payment: allow payment only if it's due or late
      if (now < rentDueDate - rentInterval + 60) {
        alert(
          "Rent already paid for this period. Please wait until the next due date."
        );
        return;
      }

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
          contracts.map((contract) => {
            const status = statusMap[contract.property_id];
            if (!status) return null;

            const dueDate = moment.unix(status.nextDueDate);
            const rent = parseFloat(formatEther(status.rentAmount));
            const lateFee = status.isLate
              ? parseFloat(formatEther(status.lateFee))
              : 0;
            const total = rent + lateFee;

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
                  Rent: {rent.toFixed(2)} ETH <br />
                  Late Fee: {lateFee.toFixed(2)} ETH <br />
                  <span className="font-semibold">
                    Total: {total.toFixed(2)} ETH
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
