import { addContract, getProperties, updateContract} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'

type ContractFormType = {
  id?:string;
}

const ContractForm = ({id=""}:ContractFormType) => {
    const { session } = useAuth()
    const [propertyList, setPropertyList] = useState<any>(null)
    useEffect(()=>{
        getProperties().then(d => setPropertyList(d))
    },[])

    const handleSubmit = async (e:any) => {
            e.preventDefault()
            const updates:any = {}
            const fd = new FormData(e.target)
            for(const [key, value] of fd.entries())
            {
              updates[key] = value
            }
         
            if(id){
              const update = await updateContract(updates,id)
            }else{
            const data = await addContract(updates)
            e.target.reset()
            }
            
        }

    return (
      <div className="bg-white rounded-md shadow-sm p-6">
      <div className="dashboard-title">New Contract</div>

      <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="listingId" className="block text-sm font-medium text-gray-700">
            Listing ID
          </label>
          <select
            id="listingId"
            name="property_id"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          >
            {
              propertyList && propertyList.map((property:any, i:number) => (
                <option key={i} value={property.property_id}>{property.address}</option>
              ))
            }
            </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="landlordName" className="block text-sm font-medium text-gray-700">
            Rent Amount
          </label>
          <input
            type="number"
            name="rent_amount"
            placeholder="Rent Amount"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Deposit
          </label>
          <input
            type="number"
            name="deposit_amount"
            placeholder="Deposit"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Late Fee
          </label>
          <input
            type="number"
            name="late_fee"
            placeholder="Late fee"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rent due date
          </label>
          <input
            type="date"
   
            name="rent_due_date"
            placeholder="Rent due date"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rent Interval
          </label>
          <input
            type="number"
            name="rent_interval"
            placeholder="Rent interval"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            </select>
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
    )
}

export default ContractForm