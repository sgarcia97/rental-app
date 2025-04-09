import Image from "next/image"
import Header from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Heart, Calendar, User, Mail, Phone, MoreVertical } from "lucide-react"
 
export default function PropertyPage() {
  return (
       <div className="flex min-h-screen flex-col">
          <Header />
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">BLVD Beltline</h1>
            <Button variant="outline" className="border-2 gap-2">
              Add to My faves <Heart className="h-5 w-5 fill-black" />
            </Button>
          </div>
 
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">1229 Macleod Trail SE</p>
                <p>
                  <Link href="/neighborhoods/beltline" className="text-blue-700 hover:underline">
                    Beltline
                  </Link>
                  , Calgary, AB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Link href="/directions" className="text-blue-700 hover:underline font-medium">
                Directions
              </Link>
              <span className="text-gray-500">•</span>
              <Link href="/street-view" className="text-blue-700 hover:underline font-medium">
                Street View
              </Link>
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
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan2.jpeg"
                alt="Studio apartment layout"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan3.jpeg"
                alt="Bedroom with window view"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan4.jpeg"
                alt="Studio apartment alternate view"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-md">
              <Image
                src="/floorPlan5.jpeg"
                alt="Living room with city view alternate angle"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="flex items-center justify-center  h-64">
              <div className="bg-gray-200 rounded-full p-4">
                <MoreVertical className="h-8 w-8 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
 
        <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact Landlord</h2>
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
  </div>
  )
}
 