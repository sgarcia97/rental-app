'use client'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    return(
        <div className="confirmation">
            Please check your email to verify your email address
            <button onClick={()=>{router.replace('/login')}} className="button-medium" >Go to Login</button>
        </div>
    )
}

export default Page