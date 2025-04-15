'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useParams, useRouter, redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { addBooking } from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"

const BookingConfirmPage = () => {
  const { session } = useAuth()
  const { confirm } = useParams<{confirm:string}>()
  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/booking/login/${confirm}`)
    }
  },[])
  

  const handleBooking = async (e:any) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const booking:any = {}
    for(const [key, value] of fd.entries()){
      booking[key] = value
    }
    console.log(booking)
    const data = await addBooking(booking)
  }
  
  return (
    <div className="flex min-h-screen flex-col">
    <Header/>
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Link href={`/property/${confirm}`} className="inline-flex items-center text-blue-700">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Request to Book
            </Link>
          </div>

          <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="font-medium mb-4">Your trip</h2>

                <div className="book-input-wrapper">
                  <h3 className="font-medium">Dates</h3>
                  <input type="date" className="book-input" name="start_date" required/>
                  <input type="hidden" name="tenant_id" defaultValue={session?.user.id}/>
                  <input type="hidden" name="property_id" defaultValue={confirm}/>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Guests</h3>
                    <p className="text-sm text-gray-600">1 guest</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium mb-4">How would you like to Pay?</h2>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border rounded-md p-3 flex items-center justify-center">
                    <Image src="/visa-icon.svg" alt="Visa" width={40} height={25} />
                  </div>
                  <div className="border rounded-md p-3 flex items-center justify-center">
                    <Image src="/paypal-icon.svg" alt="PayPal" width={40} height={25} />
                  </div>
                  <div className="border rounded-md p-3 flex items-center justify-center">
                    <Image src="/mastercard-icon.svg" alt="Mastercard" width={40} height={25} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start mb-6">
                <Image
                  src="/paradise-homes.jpg"
                  alt="Paradise Homes"
                  width={100}
                  height={80}
                  className="rounded-md object-cover mr-4"
                />
                <div>
                  <h2 className="font-medium">Paradise Homes</h2>
                  <p className="text-sm text-gray-600">Vacationville</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm">★ 4.9</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Price Details</h3>
                <div className="flex justify-between mb-2">
                  <span>$1,014.73 CAD per month for 1 year lease</span>
                  <span>$1,520.14 CAD</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>$231.81 CAD</span>
                </div>
                <div className="flex justify-between font-medium border-t mt-4 pt-4">
                  <span>Total (CAD)</span>
                  <span>$1,751.95 CAD</span>
                </div>
                <button type="submit" className="button-medium">Book</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default BookingConfirmPage
