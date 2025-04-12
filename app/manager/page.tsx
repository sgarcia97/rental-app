'use client'
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import { PenSquare } from "lucide-react"
import { useAuth } from "@/utils/supabase/context"
import { getProperties } from "@/lib/services"
import { useState, useEffect} from 'react'

export default function ListingsPage() {
  const [data, setData] = useState<any>(null)
  const { session } = useAuth()

  useEffect(()=>{
    getProperties().then(d => setData(d))
    //console.log('Property data: ',data)
  },[])
  const listings = [
    { address: "33 19 Ave SW", date: "11/05/2025", description: "Beautiful 2 story townhouse..." },
    { address: "56 8 Ave NW", date: "11/04/2025", description: "Beautiful 2 story townhouse..." },
    { address: "112 Marlborough rd NE", date: "2/01/2025", description: "Newly built Condo with 2 bedr..." },
    { address: "50 Rocky Ridge NW", date: "20/12/2024", description: "Beautiful 2 story townhouse..." },
    { address: "26 Evanston Drive SE", date: "10/12/2024", description: "Newly built Condo with 2 bedr..." },
  ]
  if(!data) return <div>Loading...</div>
  return (
    <div className="flex min-h-screen flex-col">
      <Header showUsername={true} />

      <main className="flex-1 bg-gray-50">
        <div>Welcome {session?.user.email}</div>
        <div className="container mx-auto px-4 py-6">
          <Navigation />

          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Active Listings (3 Listings)</h2>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Listed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data && data.map((listing:any, index:number) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
