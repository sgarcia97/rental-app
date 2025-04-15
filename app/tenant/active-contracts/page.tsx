'use client'
import type { NextPage } from "next";
import Image from "next/image";
import TemplateTenant from "@/components/template-tenant";
import { getActiveContracts, caDollar } from "@/lib/services";
import { useEffect, useState } from 'react'
import Edit from "@/public/file-edit.svg"
import moment from "moment";
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import SignContractForm from "@/components/signContractForm";
import Loader from "@/components/loader";

const ActiveListingsPage: NextPage = () => {
  const { session } = useAuth()

  const [data, setData] = useState<any>(null)
  const [form, setForm] = useState<boolean>(false)
  const [contract, setContract] = useState<string>("")
  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/`)
    }
    getActiveContracts(session?.user.id).then(d => setData(d))
  },[])

  const handleContract = (contract:string) => {
    setContract(contract)
    setForm(!form)
  }

  if(!data) return <Loader/>
  return (
   <TemplateTenant>

           <div className="bg-white rounded-md shadow-sm">
          <div className="table-header">
              <h2 className="text-sm font-medium">Contracts ({data && data.length} contracts)</h2>
          { form && <button className="button-small" onClick={()=>setForm(!form)}>Close</button>}
            </div>
            { form ? <SignContractForm rental={contract}/> :
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
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
}
          </div>
       </TemplateTenant>
  );
};

export default ActiveListingsPage;