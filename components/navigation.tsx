'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Navigation() {
  const pn = usePathname()
  return (
    <div className="bg-white rounded-md shadow-sm mb-6">
            <div className="flex border-b">
              <Link href="/manager/inbox" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/inbox" && 'tab-active'}`}>
                Inbox
              </Link>
              <Link href="/manager" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager" && 'tab-active'}`}>
                Active Listings
              </Link>
              <Link href="/manager/bookings" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/bookings" && 'tab-active'}`}>
                Bookings
              </Link>
              <Link href="/manager/active-contracts" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/active-contracts" && 'tab-active'}`}>
                Active Contracts
              </Link>
              <Link href="/manager/expired-contracts" className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == "/manager/expired-contracts" && 'tab-active'}`}>
                Expired Contracts
              </Link>
            </div>
          </div>
  )
}
