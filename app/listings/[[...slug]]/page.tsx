'use client'
import Link from "next/link"
import Image from "next/image"
import Placeholder from '@/public/property1.png'
import { useParams, useRouter } from "next/navigation"
import { Heart, Home, MapPin, Building } from "lucide-react"
import Template from "@/components/template"
import { useState, useEffect } from "react"
import { getProperties, searchProperty, caDollar } from "@/lib/services"
import Listing from "@/components/listing"

const Listings = () => {
  const { slug } = useParams<{slug:any}>()
  const [type, val, add] = slug
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    if(type == 'all'){
      getProperties().then(d => setData(d))
    }else if(type == 'search'){
      searchProperty(decodeURIComponent(val)).then(d => setData(d))
    }
    console.log(type)
    
  },[])
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
          <div className="section-header">
            <span>Listings</span>
            <div className="section-header-section">
            <button className={val == 'Calgary' ? 'section-header-active' : ''} onClick={()=>{router.push(`/listings/search/Calgary`)}}>Calgary</button>
            <button className={val == 'Edmonton' ? 'section-header-active' : ''} onClick={()=>{router.push(`/listings/search/Edmonton`)}}>Edmonton</button>
            <button className={val == 'Canmore' ? 'section-header-active' : ''} onClick={()=>{router.push(`/listings/search/Canmore`)}}>Canmore</button>
            <button  className={val == 'Strathmore' ? 'section-header-active' : ''} onClick={()=>{router.push(`/listings/search/Strathmore`)}}>Strathmore</button>
            </div>
          </div>
 
          <div className="section">
            {data && (data.length == 0) ? <div>No properties found</div> : data && data.map((p:any) => (
              <Listing key={p.property_id} p={p} img={Placeholder}/>
            ))}
          </div>
        </div>
        </Template>
  )
}

export default Listings
 