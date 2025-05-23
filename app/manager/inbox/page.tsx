'use client'
import TemplateManager from "@/components/template-manager"
import { getDisputes } from "@/lib/services"
import { useState, useEffect } from 'react'
import DisputeForm from "@/components/disputeForm"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'

export default function InboxPage() {
  const { session } = useAuth()
  if(!session){ redirect('/')}
  const [data, setData] = useState<any>(null)
  const [isForm, setIsForm] = useState(false)

  useEffect(()=>{
    getDisputes().then(d => setData(d))

  },[])

  const handleInbox = () => {

  }
  const messages = [
    { name: "Michael Katsap", date: "11/05/2025", message: "Hi, I have an inquiry about....." },
    { name: "Jane Doe", date: "11/04/2025", message: "Hi, I have an inquiry about....." },
    { name: "Stuart Little", date: "2/01/2025", message: "Hi, I have an inquiry about....." },
    { name: "Elsa Shane", date: "20/12/2024", message: "Hi, I have an inquiry about....." },
    { name: "Ellen Dutch", date: "10/12/2024", message: "Hi, I have an inquiry about....." },
  ]

  return (
     <TemplateManager>

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
       </TemplateManager>
  )
}
