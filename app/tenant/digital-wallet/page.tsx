'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Repeat, MoreVertical } from "lucide-react"
import TemplateTenant from "@/components/template-tenant"
import { redirect } from 'next/navigation'
import { useEffect } from "react"

export default function DigitalWalletPage() {

 useEffect(()=>{
  if(!sessionStorage.sess){ redirect(`/`)
  }
 },[])
  const transactions = [
    {
      type: "send",
      date: "Aug 30",
      to: "0xfcbd...41fb",
      amount: "-0.001582 ETH",
      usdAmount: "$5.00 USD",
    },
    {
      type: "receive",
      date: "Aug 30",
      from: "0xfcd7...9e99",
      amount: "0.015793 ETH",
      usdAmount: "$49.90 USD",
    },
  ]

  return (
   <TemplateTenant>

          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <div className="font-medium">Account 1</div>
                    <div className="text-xs text-gray-500">0x0000...f1c2</div>
                  </div>
                  <button>
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-8 text-center">
                  <div className="inline-flex justify-center items-center mb-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="#627EEA"
                      />
                      <path d="M12 6.5V9.5L16 12L12 14.5V17.5L19 12L12 6.5Z" fill="#627EEA" />
                      <path d="M12 6.5V17.5L5 12L12 6.5Z" fill="#627EEA" opacity="0.6" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">0.0124 ETH</h2>
                  <p className="text-gray-500 mb-6">$39.14 USD</p>

                  <div className="flex justify-center space-x-4">
                    <button className="button-round">
                      <ArrowDown/>
                      <span>Buy</span>
                    </button>
                    <button className="button-round">
                      <ArrowUp/>
                      <span>Send</span>
                    </button>
                   <button className="button-round">
                      <Repeat/>
                      <span>Swap</span>
                    </button>
                  </div>
                </div>

                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="assets">Assets</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="assets" className="p-4">
                    <div className="text-center text-gray-500 py-4">No other assets found</div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="divide-y">
                      {transactions.map((transaction, index) => (
                        <div key={index} className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                transaction.type === "send" ? "bg-red-100" : "bg-green-100"
                              }`}
                            >
                              {transaction.type === "send" ? (
                                <ArrowUp className="h-4 w-4 text-red-500" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium capitalize">{transaction.type}</div>
                              <div className="text-xs text-gray-500">
                                {transaction.date} • {transaction.type === "send" ? "To" : "From"}{" "}
                                {transaction.type === "send" ? transaction.to : transaction.from}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={transaction.type === "send" ? "text-red-500" : "text-green-500"}>
                              {transaction.amount}
                            </div>
                            <div className="text-xs text-gray-500">{transaction.usdAmount}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          </TemplateTenant>
  )
}
