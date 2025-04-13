'use client'
import Link from "next/link";
import type { NextPage } from "next";
import TemplateManager from "@/components/template-manager";
import { useState, useEffect } from "react";
import { getContracts } from "@/lib/services";
import ContractForm from "@/components/contractForm";

interface Listing {
  address: string;
  dateListed: string;
  description: string;
}

const ActiveListingsPage: NextPage = () => {
  
   const [data, setData] = useState<any>(null)
   const [isForm, setIsForm] = useState(false)
  
    useEffect(()=>{
      getContracts().then(d => setData(d))
    },[])

  return (
   <TemplateManager>

          {/* Listings content */}
          <div className="bg-white rounded-md shadow-sm">
          <div className="table-header">
              <h2 className="text-sm font-medium">Contracts ({data && data.length} contracts)</h2>
              <button onClick={()=>{setIsForm(!isForm)}} className="button-small" >{isForm ? 'Cancel contract' : 'Create contract'}</button>
            </div>
{ isForm ? <ContractForm/> :
            <table className="table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Date Listed</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!data ? <tr>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  </tr> : data.map((listing:any, index:number) => (
                  <tr key={index} >
                    <td>{listing.rent_amount}</td>
                    <td>{listing.deposit_amount}</td>
                    <td>{listing.late_fee}</td>
                    <td>
                      <button className="text-[#005377]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
}
          </div>
       </TemplateManager>
  );
};

export default ActiveListingsPage;