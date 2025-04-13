'use client'
import type { NextPage } from "next";
import Image from "next/image";
import TemplateTenant from "@/components/template-tenant";
import { getContracts, caDollar } from "@/lib/services";
import { useEffect, useState } from 'react'
import Edit from "@/public/file-edit.svg"
import moment from "moment";

const ActiveListingsPage: NextPage = () => {
   const [data, setData] = useState<any>(null)
    
   useEffect(()=>{
      getContracts().then(d => setData(d))
    },[])

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
                    <td>{caDollar.format(listing.rent_amount)}</td>
                    <td>{caDollar.format(listing.deposit_amount)}</td>
                    <td>{caDollar.format(listing.late_fee)}</td>
                    <td>{moment(listing.rent_due_date).format('MMM-D-YYYY')}</td>
                    <td>{listing.rent_interval}</td>
                    <td>{listing.status}</td>
                    <td>
                      <button className="edit-button"><Image alt="edit" src={Edit}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </TemplateTenant>
  );
};

export default ActiveListingsPage;