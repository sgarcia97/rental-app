'use client'
import Image from "next/image";
import Edit from "@/public/add-document.svg"
import type { NextPage } from "next";
import TemplateManager from "@/components/template-manager";
import { useState, useEffect } from "react";
import { getBookings, caDollar } from "@/lib/services";
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import moment from "moment";
import ContractBookingForm from "@/components/contractBookingForm";
import Loader from "@/components/loader";
const ActiveListingsPage: NextPage = () => {
 
   const [data, setData] = useState<any>(null)
   const [isForm, setIsForm] = useState(false)
   const [idd, setIdd] = useState<any>("")

    useEffect(()=>{
      if(!sessionStorage.sess){ redirect(`/`)
      }
      getBookings().then(d => setData(d))
    },[])

    const handleContract = (id:string) => {
      setIdd(id)
      setIsForm(!isForm)
    }

    if(!data) return <Loader/>
  return (
   <TemplateManager>

          <div className="bg-white rounded-md shadow-sm">
          <div className="table-header">
              <h2 className="text-sm font-medium">Bookings - {data && data.length} booking(s)</h2>
              { isForm &&
              <button onClick={()=>{setIsForm(!isForm)}} className="button-small" >Close</button>
              }
            </div>
        { isForm ? <ContractBookingForm id={idd}/> :
            <table className="table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Created</th>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>City</th>
                  <th>Province</th>
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
                  </tr> : data.map((booking:any, index:number) => (
                  <tr key={index} >
                    <td>{booking.address}</td>
                    <td>{moment(booking.created_at).format('MMM-D-YYYY')}</td>
                    <td>{booking.name}</td>
                    <td>{moment(booking.start_date).format('MMM-D-YYYY')}</td>
                    <td>{booking.city}</td>
                    <td>{booking.province}</td>
                    <td>
                      <button onClick={()=>handleContract(booking.id)}className="edit-button"><Image src={Edit} alt=""/>Create</button>
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