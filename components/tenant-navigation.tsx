'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
interface TenantNavigationProps {
  activeTab?: string
}

export default function TenantNavigation({ activeTab }: TenantNavigationProps) {
  const pn = usePathname()
  const tabs = [
    { name: "Inbox", path: "/tenant" },
    { name: "Pay Rent", path: "/tenant/pay-rent" },
    { name: "Active Contracts", path: "/tenant/active-contracts" },
    { name: "Expired Contracts", path: "/tenant/expired-contracts" },
    { name: "Sign new Contract", path: "/tenant/sign-contract" },
    { name: "Digital Wallet", path: "/tenant/digital-wallet" },
  ]

  return (
    <nav className="bg-white rounded-md shadow-sm mb-6 nav">
            <div className="flex border-b">
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.name.toLowerCase().replace(/\s+/g, "-") ||
            (tab.path === "/tenant" && activeTab === "inbox") ||
            (!activeTab && tab.path === "/tenant")

          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900  ${pn == tab.path && 'tab-active'}`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
