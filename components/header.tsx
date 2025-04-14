"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from '@/public/logo.svg'
import { useAuth } from "@/utils/supabase/context";
interface HeaderProps {
  showUsername?: boolean;
}

export default function Header({ showUsername = false }: HeaderProps) {
  const { logOut, session } = useAuth();
  const router = useRouter()
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
          
          <div onClick={()=>router.push('/')} className="text-[#005377] text-1xl font-serif italic logo-wrapper">
          
            <Image src={Logo} alt="" className="logo"/>
            <span><span className="text-2xl">S</span>ecure<span className="text-2xl">H</span>ome</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm">
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
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">
                  {displayName}
                </span>
                <Link href="/">
                  <button
                    onClick={handleLogout}
                    className="button-small"
                  >
                    Log out
                  </button>
                </Link>
              </div>
            ) : (
              <button onClick={()=>router.push('/login')} className="button-small">Login</button>
            )}
  
          </div>
     
      </header>

  );
}
