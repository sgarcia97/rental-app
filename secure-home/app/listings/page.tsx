import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Home, MapPin, Building } from "lucide-react"
 
export default function SearchResultsPage() {
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
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-script text-blue-700">
                SecureHome
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/saved-searches" className="text-sm text-gray-700 hover:text-blue-700">
                Saved Searches
              </Link>
              <Link href="/list-property" className="text-sm text-gray-700 hover:text-blue-700">
                List a property
              </Link>
              <Button size="sm" className="h-8 bg-blue-700 hover:bg-blue-800">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>
 
      <div className="bg-blue-700 h-1 w-full"></div>
 
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Search Results</h1>
 
          <div className="space-y-6">
            {properties.map((property) => (
              <div key={property.id} className="border rounded-md overflow-hidden shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/4">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 left-2 bg-white p-1 rounded-full">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </button>
                    {property.promotion && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold">
                        {property.promotion}
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:w-3/4 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{property.price}</h2>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm">
                          <Home className="h-4 w-4 mr-1" />
                          <span>{property.type}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{property.address}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-1" />
                          <span>
                            {property.neighborhood}, {property.city}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="text-sm">{property.beds}</span>
                        <span className="text-sm">{property.baths}</span>
                        <span className="text-sm">{property.sqft}</span>
                        <span className="text-sm">{property.pets ? "Pets Ok" : "No Pets"}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{property.availability}</p>
                        <p>ID {property.id}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                      <Link href={`/property/${property.id}`} passHref>
                        <Button className="w-full bg-blue-700 hover:bg-bl</Link>ue-800">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
 
      <footer className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-6">
            <Link href="/about" className="text-sm hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
 