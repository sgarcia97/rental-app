'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Heart, Calendar, User, Mail, Phone, MoreVertical } from "lucide-react"
import { useParams, useRouter } from 'next/navigation'
import { getProperty, caDollar } from "@/lib/services"
import { useEffect, useState } from 'react'
import Loader from "@/components/loader"
import Template from "@/components/template"
import Favourites from "@/components/favourites"
import SimilarProperties from "@/components/similarProperties"
import PhotoGallery from "@/components/photoGallery"
import Share from "@/components/share"
 
export default function PropertyPage() {
  const [data, setData] = useState<any>(null)
  const [similar, setSimilar] = useState<any>(null)
  const router = useRouter()
  const { id } = useParams<{ id: string}>()
  useEffect(()=>{
    getProperty(id).then(d => setData(d))
    console.log(data)
   
  },[])


  if(!data) return <Loader/>
  return (
       <Template>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-2/3">
        <PhotoGallery/>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{data.description}</h1>
            <div className="property-icons">
            <Favourites id={id}/>
            <Share data={data}/>
            </div>
          </div>
 
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">{data.address}</p>
                <p>
                  <Link href={`https://www.google.ca/maps/place/${data.city}`} target="_blank" className="text-blue-700 hover:underline">
                  {data.city} 
                  </Link>,&nbsp;
                  {data.province}
                </p>
                <div className="flex items-center gap-1 mt-2">
              <Link href={`https://www.google.ca/maps/place/${data.address}`} target="_blank" className="text-blue-700 hover:underline">
                Directions
              </Link>
              <span className="text-gray-500">•</span>
              <Link href="#" className="text-blue-700 hover:underline">
                Street View
              </Link>
            </div>
              </div>
              
            </div>
            
          </div>
 
          <h2 className="text-xl font-bold mb-4">Floor Plans</h2>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan1.jpeg"
                alt="Living room with city view"
                width={400}
                height={300}
                className="floor-plan-img"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan2.jpeg"
                alt="Studio apartment layout"
                width={400}
                height={300}
                className="floor-plan-img"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan3.jpeg"
                alt="Bedroom with window view"
                width={400}
                height={300}
                className="floor-plan-img"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan4.jpeg"
                alt="Studio apartment alternate view"
                width={400}
                height={300}
                className="floor-plan-img"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan5.jpeg"
                alt="Living room with city view alternate angle"
                width={400}
                height={300}
                className="floor-plan-img"
              />
            </div>
          </div>

        <SimilarProperties location={data.city} id={id}/>
        </div>
 
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 panel-section">
        <h3 className="text-2xl font-bold">Book Property</h3>
          <Button onClick={()=>{router.push(`/booking/${id}`)}} className="w-full py-6 text-lg bg-blue-700 hover:bg-blue-800">Book now</Button>
          <div className="flex justify-between items-center mb-6">
          
            <h3 className="text-2xl font-bold">Contact Landlord</h3>
            <MoreVertical className="h-5 w-5" />
          </div>
 
          <form className="space-y-4">
            <div className="relative">
              <Input type="text" placeholder="Name" className="pl-3 pr-10 py-6 bg-gray-200 border-0 rounded-md" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <User className="h-5 w-5" />
              </div>
            </div>
 
            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                className="pl-3 pr-10 py-6 bg-gray-200 border-0 rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <Mail className="h-5 w-5" />
              </div>
            </div>
 
            <div className="relative">
              <Input
                type="tel"
                placeholder="Phone number"
                className="pl-3 pr-10 py-6 bg-gray-200 border-0 rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <Phone className="h-5 w-5" />
              </div>
            </div>
 
            <div className="relative">
              <Input
                type="text"
                placeholder="Requested move in date"
                className="pl-3 pr-10 py-6 bg-gray-200 border-0 rounded-md"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            
            <Button className="w-full py-6 text-lg bg-blue-700 hover:bg-blue-800">Contact Landlord</Button>
          </form>
        </div>
      </div>
    </div>
    </Template>
  )
}
 