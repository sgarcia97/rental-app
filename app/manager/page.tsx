'use client'
import TemplateManager from "@/components/template-manager"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { useAuth } from "@/utils/supabase/context"
import { getProperties } from "@/lib/services"
import { useState, useEffect} from 'react'
import moment from 'moment'
import ListingForm from "@/components/listingForm"

export default function ListingsPage() {
  const [data, setData] = useState<any>(null)
  const [isForm, setIsForm] = useState(false)

  useEffect(()=>{
    getProperties().then(d => setData(d))
  },[])

  return (
    <TemplateManager>
          <div className="bg-white rounded-md shadow-sm mt-6">
          <div className="table-header">
              <h2 className="text-sm font-medium">Contracts ({data && data.length} contracts)</h2>
              <button onClick={()=>{setIsForm(!isForm)}} className="button-small" >{isForm ? 'Cancel listing' : 'Create listing'}</button>
            </div>
{ isForm ? <ListingForm/> :

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
}
          </div>
     </TemplateManager>
  )
}
