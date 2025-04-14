'use client'
import TemplateTenant from "@/components/template-tenant"
import Image from "next/image"
import Visa from '@/public/visa.svg'
import Paypal from '@/public/paypal.svg'
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import { useEffect } from "react"

export default function PayRentPage() {
  const { session } = useAuth()
  
  useEffect(()=>{
    if(!sessionStorage.sess){ redirect(`/`)
    }
  })
  return (
    <TemplateTenant>

          <div className="bg-white rounded-md shadow-sm mt-6 p-6">
            <h2 className="text-lg font-medium mb-6">Pay Rent (June 2023)</h2>

            <div className="space-y-4 max-w-md">
              <div className="flex justify-between">
                <span className="text-gray-600">Rent Due:</span>
                <span className="font-medium">$1500</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Late Payment Fine:</span>
                <span className="font-medium">$0</span>
              </div>

              <div className="flex justify-between border-t pt-4">
                <span className="text-gray-600 font-medium">Total payable:</span>
                <span className="font-medium">$1500</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4">How would you like to Pay?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border rounded-md p-3 flex items-center justify-center">
                  <Image src={Visa} alt="Visa" width={40} height={40} />
                </div>
                <div className="border rounded-md p-3 flex items-center justify-center">
                  <Image src={Paypal} alt="PayPal" width={40} height={40} />
                </div>
                <div className="border rounded-md p-3 flex items-center justify-center">
                  <Image src="/mastercard-icon.svg" alt="Mastercard" width={40} height={40} />
                </div>
                <div className="border rounded-md p-3 flex items-center justify-center">
                  <Image src="/interac-icon.svg" alt="Interac" width={40} height={25} />
                </div>
              </div>
            </div>
          </div>
    </TemplateTenant>
  )
}
