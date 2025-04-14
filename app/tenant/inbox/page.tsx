'use client'
import TemplateTenant from "@/components/template-tenant"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import { useEffect } from "react";

export default function InboxPage() {
  const { session } = useAuth()

  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/`)
    }
  },[])
  const messages = [
    { name: "Michael Katsap", date: "11/05/2025", message: "Hi, I have an inquiry about....." },
    { name: "Jane Doe", date: "11/04/2025", message: "Hi, I have an inquiry about....." },
    { name: "Stuart Little", date: "2/01/2025", message: "Hi, I have an inquiry about....." },
    { name: "Elsa Shane", date: "20/12/2024", message: "Hi, I have an inquiry about....." },
    { name: "Ellen Dutch", date: "10/12/2024", message: "Hi, I have an inquiry about....." },
  ]

  return (
     <TemplateTenant>

          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Inbox (5 messages)</h2>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {!messages ? <tr>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  </tr> : messages.map((message, index) => (
                  <tr key={index}>
                    <td>{message.name}</td>
                    <td>{message.date}</td>
                    <td>{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </TemplateTenant>
  )
}
