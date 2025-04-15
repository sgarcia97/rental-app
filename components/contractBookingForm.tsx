import { addContract, getBooking, getProperties, updateContract} from "@/lib/services"
import { useAuth } from "@/utils/supabase/context"
import { useState, useEffect } from 'react'
import moment from "moment"
import { styles } from "@/styles/styles"
import { Spinner } from "./loader"

type ContractFormType = {
  id?:any;
}

const ContractForm = ({id}:ContractFormType) => {
    const { session } = useAuth()
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
      getBooking(id).then(d => setData(d))
    })
    const handleSubmit = async (e:any) => {
            e.preventDefault()
            const updates:any = {}
            const fd = new FormData(e.target)
            for(const [key, value] of fd.entries())
            {
              updates[key] = value
            }
         
            const data = await addContract(updates)
            e.target.reset()
            }
            
        
if(!data){ return <Spinner/>}
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
      <div className="dashboard-title">Create New Contract for Booking ({id})</div>

      <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className={styles.label}>Listing ID</label>
          <input
            id="listingId"
            name="property_id"
            defaultValue={data && data[0].property_id}
            className={styles.input}
            readOnly
          />
          
        </div>

        <div className="space-y-2">
          <label className={styles.label}>User ID</label>
          <input
            id="listingId"
            name="tenant_id"
            defaultValue={data && data[0].tenant_id}
            className={styles.input}
            readOnly
          />
          
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent Amount</label>
          <input
            type="number"
            name="rent_amount"
            defaultValue={data && data[0].rent}
            placeholder="Rent Amount"
            className={styles.input}
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Deposit</label>
          <input
            type="number"
            name="deposit_amount"
            placeholder="Deposit"
            defaultValue={''}
            className={styles.input}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Late Fee</label>
          <input
            type="number"
            name="late_fee"
            placeholder="Late fee"
            defaultValue={''}
            className={styles.input}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent due date</label>
          <input
            type="date"
            name="rent_due_date"
            placeholder="Rent due date"
            defaultValue={''}
            className={styles.input}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Rent Interval</label>
          <input
            type="number"
            name="rent_interval"
            placeholder="Rent interval"
            defaultValue={''}
            className={styles.input}
            required
          />
        </div>

        <div className="space-y-2">
          <label className={styles.label}>Start Time</label>
          <input
            type="date"
            name="start_time"
            placeholder="Start time"
            defaultValue={data && data[0].start_date}
            className={styles.input}
            required
          />
        </div>
        

        <div className="space-y-2">
          <label className={styles.label}>End Time</label>
          <input
            type="date"
            name="end_time"
            placeholder="End time"
            defaultValue={data && moment(moment(data[0].start_date).add(1,'year').calendar()).format('YYYY-MM-DD')}
            className={styles.input}
            required
          />
          
        </div>
        


        <div className="space-y-2">
          <label className={styles.label}>Status</label>
          <select
            name="status"
            className={styles.input}
          >
            <option value="Pending">Pending</option>
         
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