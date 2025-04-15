'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Home, MapPin, Building } from "lucide-react"
import Template from "@/components/template"
import { useState, useEffect } from "react"
import { getProperties } from "@/lib/services"
 
const Listings = () => {
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    getProperties().then(d => setData(d))
  })

  const properties = [
    {
      id: "510224",
      image: "/listing1.jpeg",
      price: "$1409-1825",
      type: "Apartment",
      address: "1310 14 Ave SW",
      neighborhood: "Beltline",
      city: "Calgary",
      beds: "1 - 2bd",
      baths: "1ba",
      sqft: "732 ft²",
      pets: true,
      availability: "Immediate availability",
    },
    {
      id: "568003",
      image: "/listing2.jpeg",
      price: "$1650-2825",
      type: "Apartment",
      address: "8620 Canada Olympic Dr SW",
      neighborhood: "Trinity Hills",
      city: "Calgary",
      beds: "1 - 3bd",
      baths: "1 - 2ba",
      sqft: "525 - 1044 ft²",
      pets: true,
      availability: "Immediate availability",
      promotion: "1 MONTH FREE RENT",
    },
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
 
  return (
    <Template>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Search Results</h1>
 
          <div className="space-y-6">
            {data && data.map((p:any) => (
              <div key={p.property_id} className="border rounded-md overflow-hidden shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/4">
                    <Image
                      src={"/placeholder.svg"}
                      alt={p.address}
                      width={100}
                      height={100}
                      className="property-image"
                    />
                    <button className="absolute top-2 left-2 bg-white p-1 rounded-full">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </button>
                    {/*property.promotion && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold">
                        {property.promotion}
                      </div>
                    )*/}
                  </div>
                  <div className="p-4 md:w-3/4 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{/*property.price*/}</h2>
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
                        <p>ID {p.property_id}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                      <Link href={`/property/${p.property_id}`} passHref>
                        <Button className="w-full bg-blue-700 hover:bg-bl</Link>ue-800">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Template>
  )
}

export default Listings
 