import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import { getRentalProperty, caDollar, addRentalTenant } from "@/lib/services";
import Terms from "@/components/Terms";
import { useState, useEffect } from 'react'
import moment from "moment";

type ContractType = {
    rental:string;
}
const SignContractForm = ({rental}:ContractType) => {
    const [data, setData] = useState<any>(null)
    const { session } = useAuth()
    console.log(session)
    useEffect(()=>{
        getRentalProperty(rental).then(d => setData(d))
    },[])

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        const fd = new FormData(e.target)
        const cdata:any = {}
        for(const [key, value] of fd.entries() ){
            if(key != 'email'){
            cdata[key] = value
            }
        }
        if(fd.get('email') !== session?.user.email){
            alert('Error signing contract. Email doesn\'t match')
        }else{
       await addRentalTenant(cdata)
        }
    }

    if(!data) return <div>Loading</div>
    return(
        <form onSubmit={handleSubmit} className="section">
            <h2>Contract details for Property located at {data[0].address}</h2>

          
                <div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Property ID</td>
                            <td>{rental}</td>
                        </tr>
                        <tr>
                            <td>Property Address</td>
                            <td>{`${data[0].address}, ${data[0].city}, ${data[0].province}`}</td>
                        </tr>
                        <tr>
                            <td>Monthly Payment</td>
                            <td>{caDollar.format(data[0].rent_amount)}</td>
                        </tr>
                        <tr>
                            <td>Security Deposit</td>
                            <td>{caDollar.format(data[0].deposit_amount)}</td>
                        </tr>
                        <tr>
                            <td>Late Fee</td>
                            <td>{caDollar.format(data[0].late_fee)}</td>
                        </tr>
                        <tr>
                            <td>Date rent due</td>
                            <td>{moment(data[0].rent_due_date).format('MMM-D-YYYY')}</td>
                        </tr>
                        <tr>
                            <td>Rent Interval</td>
                            <td>{data[0].rent_interval}</td>
                        </tr>
                        <tr>
                            <td>Move in date</td>
                            <td>{moment(data[0].start_time).format('MMM-D-YYYY')}</td>
                        </tr>
                        <tr>
                            <td>Expiry Date</td>
                            <td>{moment(data[0].end_time).format('MMM-D-YYYY')}</td>
                        </tr>
                        </tbody>
                  </table>
             
              </div>

              <div className="terms-wrapper">
                <Terms/>
              </div>

              <div className="mb-8">
                <div className="toggle-wrapper">
                    I agree to the terms and conditions of this contract
                    <label className="switch">
                        <input type="checkbox" required/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="font-medium mb-2">Your Sign Here</div>
                <div><input type="hidden" name="property_id" defaultValue={rental} /></div>
                <div><input type="hidden" name="tenant_id" defaultValue={session?.user.id} /></div>
                <Input type="email" name="email" title="Please enter your email address to sign contract" minLength={8} className="max-w-xs"  required/>
              </div>

              <Button type="submit" className="bg-blue-700 hover:bg-blue-800 px-8">Submit</Button>
            </form>
       
    )

}

export default SignContractForm