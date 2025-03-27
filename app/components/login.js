"use client"
import Link from "next/link";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target)
        const userCreds = {
            email: fd.get("email"),
            password: fd.get("password")
        }

        const validate = async () => {
            const res = await fetch("");
        }
        alert(userCreds.email + userCreds.password)
    }

    return(
        <div className="main1">
        <form className="login" onSubmit={handleSubmit}>
            <div className="page-title">Login</div>
            <input type="email" name="email" placeholder="Email address" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <div className="button-wrapper">
                <button className="button-large">Login</button>
            </div>
            <div className="login-footer">Don&apos;t have an account? <Link href="/signup">Sign up</Link></div>
        </form>
        <div className="login-decor"></div>
        <div>

        </div>
        </div>
    )
}



export default Login;