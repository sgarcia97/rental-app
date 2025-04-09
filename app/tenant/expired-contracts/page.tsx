import Link from "next/link";
import type { NextPage } from "next";
import TenantNavigation from "@/components/tenant-navigation"


const SecureHomePage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="text-[#005377] text-2xl font-serif italic">
            <span className="text-3xl">S</span>ecure<span className="text-3xl">H</span>ome
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/saved-searches" className="text-gray-600 hover:underline">
              Saved Searches
            </Link>
            <Link href="/list-property" className="text-gray-600 hover:underline">
              List a Property
            </Link>
            <span className="text-gray-600">Username</span>
            <Link href="/" className="bg-[#005377] text-white px-4 py-2 rounded text-sm">
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Tabs (Navigation) */}
          <div className="bg-white rounded-md shadow-sm mb-6">
            <div className="flex border-b">
            <TenantNavigation activeTab="expired-contracts" />
              
            </div>
          </div>

          {/* Form content */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 text-center mb-6">There are no expired contracts.</h2>

            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#005377] text-white py-6">
        <div className="container mx-auto px-4 flex justify-center gap-6 text-sm border-t border-white/20 pt-4">
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SecureHomePage;