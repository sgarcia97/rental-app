"use client"
import Link from "next/link";
import { useState, useEffect } from "react"

const SignUp = () => {

    const [password, setPassword] = useState("")
    const [rpassword, setRPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const user = {
            name:formData.get("name"),
            email:formData.get("email"),
            password:formData.get("password"),
            rpassword:formData.get("password"),
        }
        alert(user.name)
        event.target.reset()
        setMessage("")
    }

    const createUser = async () => {
        const res = await fetch()
    }

    const handlePasswords = (e) => {
        password != e.target.value ? setMessage("Password does not match") : setMessage("");
    }


    return(
        <div className="main1">
        <form className="login" onSubmit={handleSubmit}>
            <div className="page-title">Sign Up</div>
            <input type="text" name="name" placeholder="First Name" required/>
            <input type="email" name="email" placeholder="Email address" required/>
            <input type="password" name="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" name="password" placeholder="Repeat Password" required onChange={(e)=>{setRPassword(e.target.value); handlePasswords(e)}}/>
            {message}
            <div className="button-wrapper">
                <button className="button-large" type="submit">Sign Up</button>
            </div>
            <div className="login-footer">Already a member? <Link href="/login">Login</Link></div>
        </form>
        <div className="login-decor"></div>
        <div>

        </div>
        </div>
    )
}



export default SignUp;