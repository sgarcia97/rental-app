'use client'
import Link from "next/link"
import Image from "next/image"
import Placeholder from '@/public/property1.png'

import { Heart, Home, MapPin, Building } from "lucide-react"
import Template from "@/components/template"
import { useState, useEffect } from "react"
import { getProperties, caDollar } from "@/lib/services"
import Listing from "@/components/listing"

const Listings = () => {
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    getProperties().then(d => setData(d))
  })
/*
  const properties = [
    {
      id: "501607",
      image: "/listing3.jpeg",
      price: "$1650-2575",
      type: "Apartment",
      address: "950 McPherson Square NE",
      neighborhood: "Bridgeland",
      city: "Calgary",
      beds: "studio - 2bd",
      baths: "1 - 2ba",
      sqft: "436 - 813 ft²",
      pets: true,
      availability: "Immediate availability",
    },
  ]
 */
  return (
    <Template>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All listings</h1>
 
          <div className="section">
            {data && data.map((p:any) => (
              <Listing key={p.property_id} p={p} img={Placeholder}/>
            ))}
          </div>
        </div>
        </Template>
  )
}

export default Listings
 