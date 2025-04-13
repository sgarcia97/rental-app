import { addProperty, getProperties} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'

const ListingForm = () => {
  
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const data = await addProperty(fd)
        e.target.reset()
    }

    return (
  

      <div className="bg-white rounded-md shadow-sm p-6">
            <div className="dashboard-title">New Listing</div>

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

    )
}

export default ListingForm