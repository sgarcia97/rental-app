"use client";
import Image from "next/image";
import Edit from "@/public/file-edit.svg";
import type { NextPage } from "next";
import TemplateManager from "@/components/template-manager";
import { useState, useEffect } from "react";
import { getContracts, caDollar } from "@/lib/services";
import { useAuth } from "@/utils/supabase/context";
import { redirect } from "next/navigation";
import moment from "moment";
import { endRental } from "@/lib/landlordServices";
import ContractForm from "@/components/contractForm";
import Loader from "@/components/loader";
const ActiveListingsPage: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [isForm, setIsForm] = useState(false);
  const [idd, setIdd] = useState<any>("");

  useEffect(() => {
    if (!sessionStorage.sess) {
      redirect(`/`);
    }
    getContracts().then((d) => setData(d));
  }, []);

  const handleContract = (id: string) => {
    setIdd(id);
    setIsForm(!isForm);
  };

  if (!data) return <Loader />;
  return (
    <TemplateManager>
      <div className="bg-white rounded-md shadow-sm">
        <div className="table-header">
          <h2 className="text-sm font-medium">
            Properties - {data && data.length} listing(s)
          </h2>
          {isForm && (
            <button
              onClick={() => {
                setIsForm(!isForm);
              }}
              className="button-small"
            >
              Close
            </button>
          )}
        </div>
        {isForm ? (
          <ContractForm id={idd} />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Rent</th>
                <th>Deposit</th>
                <th>Late Fee</th>
                <th>Due Date</th>
                <th>interval</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!data ? (
                <tr>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                  <td>
                    <div className="table-loader"></div>
                  </td>
                </tr>
              ) : (
                data.map((listing: any, index: number) => (
                  <tr key={index}>
                    <td>{listing.rent} ETH</td>
                    <td>{listing.deposit} ETH</td>
                    <td>{listing.late_fee} ETH</td>
                    <td>
                      {moment(listing.rent_due_date).format("MMM-D-YYYY")}
                    </td>
                    <td>{listing.rent_interval}</td>
                    <td>{listing.status}</td>
                    {/* <td>
                      <button
                        onClick={() => handleContract(listing.property_id)}
                        className="edit-button"
                      >
                        <Image src={Edit} alt="" />
                      </button>
                    </td> */}
                    <td className="flex gap-2">
                      <button
                        onClick={() => handleContract(listing.property_id)}
                        className="edit-button"
                      >
                        <Image src={Edit} alt="" />
                      </button>
                      <button
                        onClick={async () => {
                          const confirmEnd = confirm(
                            "Are you sure you want to end this contract?"
                          );
                          if (!confirmEnd) return;

                          try {
                            await endRental(listing.property_id);
                            alert("Contract ended successfully.");
                            getContracts().then((d) => setData(d)); // refresh table
                          } catch (err) {
                            console.error("Failed to end rental:", err);
                            alert(
                              "Failed to end rental. See console for details."
                            );
                          }
                        }}
                        className="button-small"
                      >
                        End Contract
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </TemplateManager>
  );
};

export default ActiveListingsPage;
