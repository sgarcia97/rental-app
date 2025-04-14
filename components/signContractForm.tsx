import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/utils/supabase/context";
import { redirect } from 'next/navigation'
import { getContract, caDollar, addRentalTenant } from "@/lib/services";
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
        getContract(rental).then(d => setData(d))
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
            <h2>Contract details for Property {rental}</h2>

          
                <div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Property Details</td>
                            <td>{data[0].property_id}</td>
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
                            <td>{moment(data[0].rent_due_date).format('MMM-D-YYYY')}</td>
                        </tr>
                        <tr>
                            <td>Expiry Date</td>
                            <td>{moment(data[0].rent_due_date).add(1, 'year').calendar()}</td>
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
                <div><input name="property_id" defaultValue={rental} /></div>
                <div><input name="tenant_id" defaultValue={session?.user.id} /></div>
                <Input type="email" name="email" title="Please enter your email address to sign contract" minLength={8} className="max-w-xs"  required/>
              </div>

              <Button type="submit" className="bg-blue-700 hover:bg-blue-800 px-8">Submit</Button>
            </form>
       
    )

}

export default SignContractForm