import { addProperty, getProperties, getProperty, updateProperty} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'
import { styles } from "@/styles/styles"
import { Spinner } from "./loader"

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
        }else{
          setData(null)
        }
    },[])
    if(id && !data){ return <Spinner/>}
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
            <div className="dashboard-title">{id ? 'Update' : 'New'} Listing<div style={{color:'#999', fontSize:'var(--normal'}}>{id}</div></div>

            <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className="space-y-2">
                <label className={styles.label}>Description</label>
                {data && data.description}
                <input
                  type="text"
                  name="description"
                  defaultValue={data ? data.description : ""}
                  placeholder="Enter Description"
                  className={styles.input}
                />
              </div>

              <div className="space-y-2">
                <label className={styles.label}>Address</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={data ? data.address : ""}
                  placeholder="Enter Address"
                  className={styles.input}
                />
              </div>

              <div className="space-y-2">
                <label className={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={data ? data.city : ""}
                  placeholder="Enter Address"
                  className={styles.input}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className={styles.label}>Province</label>
                <input
                  type="text"
                  name="province"
                  defaultValue={data ? data.province : ""}
                  placeholder="Enter Address"
                  className={styles.input}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className={styles.label}>Rent</label>
                <input
                  type="number"
                  name="rent"
                  defaultValue={data ? data.rent : ""}
                  placeholder="Enter Rent "
                  className={styles.input}
                />
              </div>

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