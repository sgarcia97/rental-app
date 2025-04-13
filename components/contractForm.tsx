import { addContract, getContract, getProperties, updateContract} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'
import moment from "moment"

type ContractFormType = {
  id?:any;
}

const ContractForm = ({id=null}:ContractFormType) => {
    const { session } = useAuth()
    const [data, setData] = useState<any>(null)
    const [propertyList, setPropertyList] = useState<any>(null)
    useEffect(()=>{
      
        getProperties().then(d => setPropertyList(d))

        if(id){
          getContract(id).then(d => setData(d))
    
        }
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
              propertyList && propertyList.map((property:any, i:number) => {
                let sel:boolean = false
                if(id == property.property_id){
                  sel = true
                }
                return <option key={i} value={property.property_id} selected={sel}>{property.address}</option>
})
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
            defaultValue={data && data[0].rent_amount}
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
            defaultValue={data && data[0].deposit_amount}
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
            defaultValue={data && data[0].late_fee}
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
            defaultValue={data && moment(data[0].rent_due_date).format('YYYY-MM-DD')}
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
            defaultValue={data && data[0].rent_interval}
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