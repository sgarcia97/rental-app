'use client'
import Link from "next/link";
import Header from "@/components/header";
import type { NextPage } from "next";
import { addProperty } from "@/lib/services";
const SecureHomePage: NextPage = () => {

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    try{
    const data = await addProperty(fd)
    console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header showUsername={true} />

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Tabs (Navigation) */}
          <div className="bg-white rounded-md shadow-sm mb-6">
            <div className="flex border-b">
              <Link href="/inbox" className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Inbox
              </Link>
              <Link href="/active-listings" className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Active Listings
              </Link>
              <Link href="/manager/active-contracts" className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Active Contracts
              </Link>
              <Link href="/manager/expired-contracts" className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Expired Contracts
              </Link>
              <Link href="/manager/create-contract" className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Create New Contract
              </Link>
              <Link
                href="/manager/add-listing"
                className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-[#005377]"
              >
                Add New Listing
              </Link>
            </div>
          </div>

          {/* Form content */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 text-center mb-6">New Listing</h2>

            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="squareFootage"
                  name="description"
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>
             {/*
              <div className="space-y-2">
                <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
                  Monthly Rent
                </label>
                <input
                  type="text"
                  id="monthlyRent"
                  name="monthlyRent"
                  placeholder="Enter Monthly Rent"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>
*/}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#005377] text-white px-6 py-2 rounded-md text-sm hover:bg-[#004466] transition-colors"
                >
                  Submit Listing
                </button>
              </div>
            </form>
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