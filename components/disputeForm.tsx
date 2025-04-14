import { addDispute, getProperties} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'

type DisputeFormType = {
    id?:string;
  }

const DisputeForm = ({id=""}:DisputeFormType) => {
    const { session } = useAuth()
    const [propertyList, setPropertyList] = useState<any>(null)
    useEffect(()=>{
        getProperties().then(d => setPropertyList(d))
    },[])
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const data = await addDispute(fd)
    }

    return (
        <div className="bg-white rounded-md shadow-sm p-6">
            <div className="dashboard-title">New Dispute</div>

            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
                <input value={session?.user.id} readOnly name="raised_by"/>
              <div className="space-y-2">
                <label htmlFor="" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <select
               
                  name="property"
               
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                >
                {
                    propertyList && propertyList.map((p:any,i:number)=>(
                        <option key={i} value={p.id}>{p.address}</option>
                    ))
                }
                    </select>

              </div>

              <div className="space-y-2">
                <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                 
               
                  name="description"
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                ></textarea>
              </div>
        
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#005377] text-white px-6 py-2 rounded-md text-sm hover:bg-[#004466] transition-colors"
                >
                  Submit Dispute
                </button>
              </div>
            </form>
          </div>
    )
}

export default DisputeForm