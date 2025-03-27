"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Footer = () => {
    const router = useRouter()
    return(
        <header className="header">
            
            <div className="header-links">
            <div className="logo-wrapper">Secure Home</div>
                <Link  href="test">Saved searches</Link>
                <Link href="test">List a property</Link>
            </div>
            <div className="header-login">
                <button className="button button-small" onClick={()=>router.push("/login")}>Login</button>
            </div>
        </header>
    )
}

export default Footer