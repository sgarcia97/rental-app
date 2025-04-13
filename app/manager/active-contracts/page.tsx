'use client'
import Link from "next/link";
import type { NextPage } from "next";
import TemplateManager from "@/components/template-manager";
import { useState, useEffect } from "react";
import { getContracts } from "@/lib/services";

interface Listing {
  address: string;
  dateListed: string;
  description: string;
}

const ActiveListingsPage: NextPage = () => {
  
   const [data, setData] = useState<any>(null)

  
    useEffect(()=>{
      getContracts().then(d => setData(d))
    },[])

  const listings: Listing[] = [
    {
      address: "33 19 Ave SW",
      dateListed: "11/05/2025",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "56 8 Ave NW",
      dateListed: "11/04/2025",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "112 Marlbrough rd NE",
      dateListed: "2/01/2025",
      description: "Newly built Condo with 2 bedr...",
    },
    {
      address: "50 Rocky Ridge NW",
      dateListed: "20/12/2024",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "26 Evanston Drive SE",
      dateListed: "10/12/2024",
      description: "Newly built Condo with 2 bedr...",
    },
  ];

  return (
   <TemplateManager>

          {/* Listings content */}
          <div className="bg-white rounded-md shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Active Listings ({listings.length} Listings)</h2>
            </div>

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
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td>
                      {listing.address}
                    </td>
                    <td>{listing.created_at}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{listing.description}</td>
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
          </div>
       </TemplateManager>
  );
};

export default ActiveListingsPage;