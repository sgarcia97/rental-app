'use client'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import TenantNavigation from "@/components/tenant-navigation"
import { useEffect } from "react";

export default function TenantPage() {
  const { session } = useAuth()

  useEffect(()=>{
      if(!sessionStorage.sess) redirect('/')
    })
  
  const messages = [
    { name: "Michael Katsap", date: "11/05/2025", message: "Hi, I have an inquiry about....." },
    { name: "Jane Doe", date: "11/04/2025", message: "Hi, I have an inquiry about....." },
    { name: "Stuart Little", date: "2/01/2025", message: "Hi, I have an inquiry about....." },
    { name: "Elsa Shane", date: "20/12/2024", message: "Hi, I have an inquiry about....." },
    { name: "Ellen Dutch", date: "10/12/2024", message: "Hi, I have an inquiry about....." },
  ]

  return (

          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Inbox (4 messages)</h2>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     
  )
}
