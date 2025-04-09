import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function BookingConfirmPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex-shrink-0">
            <Link href="/home" className="text-2xl font-script text-blue-700">
              SecureHome
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Link href="/home" className="inline-flex items-center text-blue-700">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Request to Book
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="font-medium mb-4">Your trip</h2>

                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">Dates</h3>
                    <p className="text-sm text-gray-600">Nov 17-20</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-700">
                    Edit
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Guests</h3>
                    <p className="text-sm text-gray-600">1 guest</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-700">
                    Edit
                  </Button>
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
                  <span>$1,014.73 CAD x 5 nights</span>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
