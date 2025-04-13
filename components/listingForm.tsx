import { addProperty, getProperties, getProperty, updateProperty} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'

type ListingFormType = {
  id?:any;
}

const ListingForm = ({id=null}:ListingFormType) => {
  
    const [data, setData] = useState<any>(null)

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const updates:any = {}
        const fd = new FormData(e.target)
        for(const [key, value] of fd.entries())
        {
          updates[key] = value
        }
     
        if(id){
          const update = await updateProperty(updates,id)
        }else{
        const data = await addProperty(updates)
        e.target.reset()
        }
        
    }

    useEffect(()=>{
        if(id){
          getProperty(id).then(d => {setData(d); })
        }
    },[])

    return (
      <div className="bg-white rounded-md shadow-sm p-6">
            <div className="dashboard-title">{id ? 'Update' : 'New'} Listing - {id}</div>

            <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={data ? data[0].address : ""}
                  placeholder="Enter Address"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#005377] focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                {data && data.description}
                <input
                  type="text"
                  name="description"
                  defaultValue={data ? data[0].description : ""}
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