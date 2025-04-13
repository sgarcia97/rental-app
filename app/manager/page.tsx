'use client'
import TemplateManager from "@/components/template-manager"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { useAuth } from "@/utils/supabase/context"
import { getProperties } from "@/lib/services"
import { useState, useEffect} from 'react'
import moment from 'moment'

export default function ListingsPage() {
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    getProperties().then(d => setData(d))
  },[])
  const listings = [
    { address: "33 19 Ave SW", date: "11/05/2025", description: "Beautiful 2 story townhouse..." },
    { address: "56 8 Ave NW", date: "11/04/2025", description: "Beautiful 2 story townhouse..." },
    { address: "112 Marlborough rd NE", date: "2/01/2025", description: "Newly built Condo with 2 bedr..." },
    { address: "50 Rocky Ridge NW", date: "20/12/2024", description: "Beautiful 2 story townhouse..." },
    { address: "26 Evanston Drive SE", date: "10/12/2024", description: "Newly built Condo with 2 bedr..." },
  ]
  //if(!data) return <div>Loading...</div>
  return (
    <TemplateManager>
          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Active Listings (3 Listings)</h2>
            </div>

            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>Address</th>
                  <th>Date Listed</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!data ? <tr>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  <td><div className="table-loader"></div></td>
                  </tr> : data.map((listing:any, index:number) => (
                  <tr key={index}>
                    <td>{listing.address}</td>
                    <td>{moment(listing.created_at).format('MMM D YY')}</td>
                    <td>{listing.description}</td>
                    <td>
                      <Button variant="ghost" size="sm">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     </TemplateManager>
  )
}
