'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from "@/utils/supabase/context"

export default function BookingPage() {
  const router = useRouter()
  const { id } = useParams<{id:string}>()
  const { login } = useAuth()
  const [form, setForm] = useState(false)
  const handleLogin = async (e:any) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    await login(fd,`/booking/${id}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">
          <h1 className="mb-6 text-xl font-medium">Log in or sign up to book</h1>

          <div className="space-y-4">
            <div className="relative">
              <Select>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Country/Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input type="tel" placeholder="Phone Number" className="w-full bg-white" />

            <Button className="w-full bg-blue-700 hover:bg-blue-800">Continue</Button>

            <div className="flex items-center justify-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 flex-shrink text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex items-center justify-center">
                <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <Image src="/facebook-icon.svg" alt="Facebook" width={20} height={20} />
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <Image src="/apple-icon.svg" alt="Apple" width={20} height={20} />
              </Button>
            </div>

            <Button onClick={()=>setForm(!form)} variant="outline" className="w-full">
              <Image src="/email-icon.svg" alt="Email" width={20} height={20} className="mr-2" />
              Continue with email
            </Button>
            {
              form && 
              <form onSubmit={handleLogin}>
                 <div>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        required
                        className="pl-3 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        className="pl-3 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Lock className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button type="submit" className="button-medium">Login</button>
                    </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
