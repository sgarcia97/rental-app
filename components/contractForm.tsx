import { addContract, getContract, getProperties, updateContract} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'
import moment from "moment"
import { styles } from "@/styles/styles"
import { Spinner } from "./loader"

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
        if(id && !data){ return <Spinner/>}
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
      <div className="dashboard-title">New Contract</div>

      <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className={styles.label}>Listing ID</label>
          <select
            id="listingId"
            name="property_id"
            className={styles.input}
            defaultValue={data && data.property_id}
          >
            {
              propertyList && propertyList.map((property:any, i:number) => {
                let sel:boolean = false
                if(id == property.property_id){
                  sel = true
                }
                return <option key={i} >{property.address}</option>
            })
            }
            </select>
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent Amount</label>
          <input
            type="number"
            name="rent_amount"
            defaultValue={data && data[0].rent_amount}
            placeholder="Rent Amount"
            className={styles.input}
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Deposit</label>
          <input
            type="number"
            name="deposit_amount"
            placeholder="Deposit"
            defaultValue={data && data[0].deposit_amount}
            className={styles.input}
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Late Fee</label>
          <input
            type="number"
            name="late_fee"
            placeholder="Late fee"
            defaultValue={data && data[0].late_fee}
            className={styles.input}
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent due date</label>
          <input
            type="date"
            name="rent_due_date"
            placeholder="Rent due date"
            defaultValue={data && moment(data[0].rent_due_date).format('YYYY-MM-DD')}
            className={styles.input}
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent Interval</label>
          <input
            type="number"
            name="rent_interval"
            placeholder="Rent interval"
            defaultValue={data && data[0].rent_interval}
            className={styles.input}
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Status</label>
          <select
            name="status"
            className={styles.input}
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={styles.button}
          >
            Create Contract
          </button>
        </div>
      </form>
    </div>
    )
}

export default ContractForm