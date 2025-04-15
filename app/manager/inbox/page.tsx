'use client'
import TemplateManager from "@/components/template-manager"
import { getDisputes } from "@/lib/services"
import { useState, useEffect } from 'react'
import DisputeForm from "@/components/disputeForm"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import Loader from "@/components/loader"

export default function InboxPage() {

  const [data, setData] = useState<any>(null)
  const [isForm, setIsForm] = useState(false)

  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/`)
    }
    getDisputes().then(d => setData(d))

  },[])

  const handleInbox = () => {

  }

  return (
          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="table-header">
              <h2 className="text-sm font-medium">Inbox ({data && data.length} messages)</h2>
              <button onClick={()=>{setIsForm(!isForm)}} className="button-small" >{isForm ? 'Cancel message' : 'Create message'}</button>
            </div>
{ isForm ? <DisputeForm/> :
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {!data ? <tr>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  </tr> : data.map((message:any, index:number) => (
                  <tr key={index}>
                    <td>{message.property_id}</td>
                    <td>{message.description}</td>
                    <td>{message.resolved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
}
          </div>
  )
}
