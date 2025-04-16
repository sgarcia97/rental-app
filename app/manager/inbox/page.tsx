"use client";
import TemplateManager from "@/components/template-manager";
import { getInterestedProperties, createRental } from "@/lib/landlordServices";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/supabase/context";
import { redirect } from "next/navigation";
import Loader from "@/components/loader";

export default function InboxPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.user) {
      redirect("/");
      return;
    }

    getInterestedProperties().then((res) => {
      setData(res || []);
      setLoading(false);
    });
  }, [session]);

  const handleCreateRental = async (property: any) => {
    if (!session?.user) {
      alert("You must be logged in.");
      return;
    }

    // Optional: check if the logged in user owns this property
    if (property.owner_id !== session.user.id) {
      alert("You are not authorized to create this rental.");
      return;
    }

    try {
      await createRental(property);
      alert("Rental contract created!");
    } catch (err) {
      console.error("Failed to create rental:", err);
      alert("Rental creation failed. See console.");
    }
  };

  if (loading) return <Loader />;

  return (
    <TemplateManager>
      <div className="bg-white rounded-md shadow-sm mt-6">
        <div className="table-header">
          <h2 className="text-sm font-medium">
            Rental Requests ({data.length})
          </h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Tenant</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={i}>
                <td>{entry.address}</td>
                <td>{entry.tenant?.name ?? "Unknown Tenant"}</td>
                <td>{entry.description}</td>
                <td>
                  <button
                    className="button-small"
                    onClick={() => handleCreateRental(entry)}
                  >
                    Create Rental
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TemplateManager>
  );
}
