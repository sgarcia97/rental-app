"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react'
import { useRouter, usePathname } from "next/navigation";
import Logo from '@/public/logo.svg'
import Profile from '@/public/profile.svg'
import { useAuth } from "@/utils/supabase/context";
interface HeaderProps {
  showUsername?: boolean;
}

export default function Header({ showUsername = false }: HeaderProps) {
  const { logOut, session } = useAuth();
  const [menu, setMenu] = useState<boolean>(false)
  const router = useRouter()
  const pn = usePathname()
  let displayName:any = session?.user.email;

  if (session) {
    if(session.user.user_metadata.fullName != ''){
      displayName = session.user.user_metadata.fullName;
    }
  }

  const handleLogout = async () => {
    await logOut();
  };
  return (
    <header className="bg-white shadow-sm header">
     
          {/* Logo */}
          <div className="main-menu">
            <div onClick={()=>router.push('/')} className="text-[#005377] text-1xl font-serif italic logo-wrapper">
              <Image src={Logo} alt="" className="logo"/>
              <span><span className="text-2xl">S</span>ecure<span className="text-2xl">H</span>ome</span>
            </div>
            <div className="main-menu-links">
              <Link href="/" className={`text-gray-600 hover:underline ${pn == '/' && 'active-link'}`}>Home</Link>
              <Link href="/listings" className={`text-gray-600 hover:underline ${pn == '/listings' && 'active-link'}`}>All listings</Link>
            </div>
          </div>
          {/* Navigation */}
       <div className="profile-wrapper">
            <div className="profile-img" onClick={()=>setMenu(!menu)}>
              <Image src={Profile} alt=""/>
              { menu &&
            <div className="menu-links">
            { session &&
          <><Link href="/manager" className="text-gray-600 hover:underline">
              Landlord
            </Link>
            <Link href="/tenant" className="text-gray-600 hover:underline">
              Tenant
            </Link></>
}
            <Link href="#" className="text-gray-600 hover:underline">
              Saved Searches
            </Link>
            <Link href="#" className="text-gray-600 hover:underline">
              List a Property
            </Link>
            {session?.user.email ? (
                <>
                <div className="text-sm text-gray-700 mr-2">
                  {displayName}
                </div>
           
                  <button
                    onClick={handleLogout}
                    className="button-small"
                  >
                    Log out
                  </button>
                  </>
         
            ) : (
              <button onClick={()=>router.push('/login')} className="button-small">Login</button>
            )}
  </div>
}
  </div>  
     </div>
      </header>

  );
}
