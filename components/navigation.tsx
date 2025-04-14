'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Navigation() {
  const pn = usePathname()
  return (
    <div className="bg-white rounded-md shadow-sm mb-6">
            <div className="flex border-b">
              <Link href="/manager/inbox" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/inbox" && 'border-b-2 border-[#005377]'}`}>
                Inbox
              </Link>
              <Link href="/manager" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager" && 'border-b-2 border-[#005377]'}`}>
                Active Listings
              </Link>
              <Link href="/manager/active-contracts" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/active-contracts" && 'border-b-2 border-[#005377]'}`}>
                Active Contracts
              </Link>
              <Link href="/manager/expired-contracts" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/expired-contracts" && 'border-b-2 border-[#005377]'}`}>
                Expired Contracts
              </Link>
            </div>
          </div>
  )
}
