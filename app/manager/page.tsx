'use client'
import { redirect } from "next/navigation"
import TemplateManager from "@/components/template-manager"
import Image from "next/image"
import Edit from '@/public/file-edit.svg'
import { useAuth } from "@/utils/supabase/context"
import { getProperties } from "@/lib/services"
import { useState, useEffect} from 'react'
import moment from 'moment'
import ListingForm from "@/components/listingForm"


export default function ListingsPage() {
  const { session } = useAuth()
if(session){ redirect('/')}
  const [data, setData] = useState<any>(null)
  const [isForm, setIsForm] = useState(false)
  const [id, setId] = useState<any>("")

  useEffect(()=>{
    getProperties().then(d => setData(d))
    console.log(session)
  },[])

  const handleListing = (id:string) => {
    //alert(id)
    setId(id)
    setIsForm(!isForm)
  }

  return (
    <TemplateManager>
          <div className="bg-white rounded-md shadow-sm mt-6">
          <div className="table-header">
              <h2 className="text-sm font-medium">Contracts - {data && data.length} listing(s)</h2>
              <button onClick={()=>{setIsForm(!isForm)}} className="button-small" >{isForm ? 'Cancel listing' : 'Create listing'}</button>
            </div>
{ isForm ? <ListingForm id={id}/> :

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
                    <td>{moment(listing.created_at).format('MMM-D-YYYY')}</td>
                    <td>{listing.description}</td>
                    <td>
                    <button onClick={() => handleListing(listing.property_id)} className="edit-button"><Image alt="edit" src={Edit}/></button>
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
