import Link from "next/link"

interface TenantNavigationProps {
  activeTab?: string
}

export default function TenantNavigation({ activeTab }: TenantNavigationProps) {
  const tabs = [
    { name: "Inbox", path: "/tenant" },
    { name: "Pay Rent", path: "/tenant/pay-rent" },
    { name: "Active Contracts", path: "/tenant/active-contracts" },
    { name: "Expired Contracts", path: "/tenant/expired-contracts" },
    { name: "Sign new Contract", path: "/tenant/sign-contract" },
    { name: "Digital Wallet", path: "/tenant/digital-wallet" },
  ]

  return (
    <nav className="border-b overflow-x-auto">
      <div className="flex space-x-6">
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.name.toLowerCase().replace(/\s+/g, "-") ||
            (tab.path === "/tenant" && activeTab === "inbox") ||
            (!activeTab && tab.path === "/tenant")

          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`text-sm font-medium whitespace-nowrap py-4 px-1 border-b-2 ${
                isActive
                  ? "border-blue-700 text-blue-700"
                  : "border-transparent text-gray-700 hover:text-blue-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
