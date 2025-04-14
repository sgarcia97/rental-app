import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchHome from "@/components/searchHome"
import { Search } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold">
              Find Your next
          
              Home now!
            </h1>
          </div>

          <SearchHome/>

          <div className="mb-12">
            <h2 className="text-lg font-medium  mb-4">Recently Listed</h2>
            <div className="relative">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                <div className="min-w-[250px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/house1.jpeg"
                    alt="House"
                    width={250}
                    height={180}
                    className="w-full h-[180px] object-cover"
                  />
                </div>
                <div className="min-w-[250px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/house2.jpeg"
                    alt="House"
                    width={250}
                    height={180}
                    className="w-full h-[180px] object-cover"
                  />
                </div>
                <div className="min-w-[250px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/house3.jpg"
                    alt="House"
                    width={250}
                    height={180}
                    className="w-full h-[180px] object-cover"
                  />
                </div>
              </div>
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                &lt;
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
