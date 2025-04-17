'use client'
import { Building, Home, Link, MapPin } from "lucide-react";
import Image from "next/image";
import Heart from '@/public/heart-filled.svg'
import Directions from '@/public/diamond-turn-right.svg'
import { getFavourite, caDollar } from "@/lib/services";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from "@/utils/supabase/context";

type ListingType = {
    p:any;
    img:any;
}

const Listing = ({p, img}:ListingType) => {
    const { session } = useAuth()
    const router = useRouter()
    const [fav, setFav] = useState(null)
    useEffect(()=>{
        handleFavourite(p.property_id)
    },[])

    const handleFavourite = async (id:string) => {
         const f = session && await getFavourite(id,session.user.id)
         f && setFav(f.property_id)

    }

    return(
        <div key={p.property_id} className="list">
      
                  <div className="list-img-wrapper">
                    <Image
                      src={img}
                      alt={p.address}
                     
                      className="list-img"
                    />
                
                     
              
                    {/*property.promotion && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold">
                        {property.promotion}
                      </div>
                    )*/}
                  </div>
                  <div className="list-content">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="text-xl font-bold">{caDollar.format(p.rent)}</div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm">
                          <Home className="h-4 w-4 mr-1" />
                          <span>{p.description}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{p.address}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-1" />
                          <span>
                            {`${p.city}, ${p.province}`}
                          </span>
                        </div>
                      </div>
                      <div className="property-features">
                        <span className="text-sm">{/*property.beds*/}</span>
                        <span className="text-sm">{/*property.baths*/}</span>
                        <span className="text-sm">{/*property.sqft*/}</span>
                        <span className="text-sm">{/*property.pets ? "Pets Ok" : "No Pets"*/}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{/*property.availability*/}</p>
                        <p>Property ID: {p.property_id}</p>
                      </div>
                    </div>
                   
                   <div className="list-sub-content">
                        <Button onClick={()=>router.push(`/property/${p.property_id}`)} className="bg-blue-700 hover:bg-bl</Link>ue-800">View Details</Button>
                       <div className="list-button-wrapper">
                       {
                        fav == p.property_id &&
                        <Image src={Heart} alt="" className="list-fave"/>
                      
                      }
                       <Image onClick={()=>window.open(`https://www.google.ca/maps/place/${p.address}`,"tab", "popup")} src={Directions} alt="" className="direction-button"/>
                       
                      </div>
                  </div>
                 
                  </div>
  
              </div>
    )
}

export default Listing