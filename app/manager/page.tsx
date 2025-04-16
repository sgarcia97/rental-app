"use client";
import { redirect } from "next/navigation";
import TemplateManager from "@/components/template-manager";
import Image from "next/image";
import Edit from "@/public/file-edit.svg";
import { useAuth } from "@/utils/supabase/context";
import { getProperties } from "@/lib/services";
import { useState, useEffect } from "react";
import moment from "moment";
import ListingForm from "@/components/listingForm";
import Loader from "@/components/loader";

export default function ListingsPage() {
  const [data, setData] = useState<any>(null);
  const [isForm, setIsForm] = useState(false);
  const [id, setId] = useState<any>("");

  useEffect(() => {
    if (!sessionStorage.sess) {
      redirect(`/`);
    }
  }, []);

  useEffect(() => {
    getProperties().then((d) => setData(d));
  }, []);

  const handleListing = (id: string) => {
    //alert(id)
    setId(id);
    setIsForm(!isForm);
  };

  if (!data) return <Loader />;
  return (
    <TemplateManager>
      <div className="bg-white rounded-md shadow-sm mt-6">
        <div className="table-header">
          <h2 className="text-sm font-medium">
            Properties - {data && data.length} listing(s)
          </h2>
          <button
            onClick={() => {
              setIsForm(!isForm);
            }}
            className="button-small"
          >
            {isForm ? "Cancel listing" : "Create listing"}
          </button>
        </div>
        {isForm ? (
          <ListingForm id={id} />
        ) : (
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th>Address</th>
                <th>Date Listed</th>
                <th>Description</th>
                <th>Owner</th>
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
                </tr>
              ) : (
                data.map((listing: any, index: number) => (
                  <tr key={index}>
                    <td>{listing.address}</td>
                    <td>{moment(listing.created_at).format("MMM-D-YYYY")}</td>
                    <td>{listing.description}</td>
                    <td>{listing.users?.name ?? "Unclaimed"}</td>
                    <td>
                      <button
                        onClick={() => handleListing(listing.property_id)}
                        className="edit-button"
                      >
                        <Image alt="edit" src={Edit} />
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
}
