'use client'
import Link from "next/link";
import TemplateManager from "@/components/template-manager";
import { getProperties, addContract } from "@/lib/services";
import type { NextPage } from "next";
import { useState, useEffect } from 'react'

const SecureHomePage: NextPage = () => {
  const [propertyList, setPropertyList] = useState<any>(null)

  useEffect(()=>{
    getProperties().then(d => setPropertyList(d))
  },[])

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const data = await addContract(e.target)
  }
  return (
   <TemplateManager>
          {/* Form content */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="dashboard-title">New Contract</div>

            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="listingId" className="block text-sm font-medium text-gray-700">
                  Listing ID
                </label>
                <select
                  id="listingId"
                  name="listingId"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                >
                  {
                    propertyList && propertyList.map((property:any, i:number) => (
                      <option key={i} value={property.id}>{property.address}</option>
                    ))
                  }
                  </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700">
                  Landlord Name
                </label>
                <input
                  type="text"
                  id="landlordName"
                  name="landlordName"
                  placeholder="Enter Landlord Name"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tenantDetails" className="block text-sm font-medium text-gray-700">
                  Tenant Details (Name/ID)
                </label>
                <input
                  type="text"
                  id="tenantDetails"
                  name="tenantDetails"
                  placeholder="Enter Tenant Name/ID"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#005377] text-white px-6 py-2 rounded-md text-sm hover:bg-[#004466] transition-colors"
                >
                  Create Contract
                </button>
              </div>
            </form>
          </div>
          </TemplateManager>
  );
};

export default SecureHomePage;