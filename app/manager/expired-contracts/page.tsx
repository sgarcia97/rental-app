'use client'
import TemplateManager from "@/components/template-manager";
import Image from "next/image";
import Edit from '@/public/file-edit.svg'
import type { NextPage } from "next";
import { getExpiredContracts, caDollar } from "@/lib/services";
import { useState, useEffect } from 'react'
import moment from "moment";
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import Loader from "@/components/loader";

const SecureHomePage: NextPage = () => {

  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/`)
    }
    getExpiredContracts().then(d => setData(d))
  },[])
  if(!data) return <Loader/>
  return (
   <TemplateManager>

          <div className="bg-white rounded-md shadow-sm">
          <div className="table-header">
              <h2 className="text-sm font-medium">Expired Contracts - {data && data.length} contract(s)</h2>
             
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
      </TemplateManager>
  );
};

export default SecureHomePage;