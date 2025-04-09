import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="flex space-x-6 border-b pb-4">
      <Link href="/inbox" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Inbox
      </Link>
      <Link href="/listings" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Active Listings
      </Link>
      <Link href="/manager/active-contracts" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Active Contracts
      </Link>
      <Link href="/manager/expired-contracts" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Expired Contracts
      </Link>
      <Link href="/manager/create-contract" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Create new Contract
      </Link>
      <Link href="/manager/add-listing" className="text-sm font-medium text-gray-700 hover:text-blue-700">
        Add new Listing
      </Link>
    </nav>
  )
}
