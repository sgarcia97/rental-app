'use client'
import type { NextPage } from "next";
import { getExpiredContracts } from "@/lib/services";
import TemplateTenant from "@/components/template-tenant";
import { useState, useEffect } from 'react'
import { useAuth } from "@/utils/supabase/context";

const SecureHomePage: NextPage = () => {
  const { session } = useAuth()
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    getExpiredContracts(session?.user.id).then(d => setData(d))
  })

  return (
    <TemplateTenant>
        
        <div className="bg-white rounded-md shadow-sm">
          <div className="table-header">
              <h2 className="text-sm font-medium">Contracts ({data && data.length} contracts)</h2>
             
            </div>

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
                {!data ? <tr>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  </tr> : data.map((listing:any, index:number) => (
                  <tr key={index} >
                    <td>{listing.rent_amount}</td>
                    <td>{listing.deposit_amount}</td>
                    <td>{listing.late_fee}</td>
                    <td>{listing.rent_due_date}</td>
                    <td>{listing.rent_interval}</td>
                    <td>{listing.status}</td>
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
    </TemplateTenant>
  );
};

export default SecureHomePage;