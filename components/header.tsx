"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
          <div className="text-[#005377] text-2xl font-serif italic">
            <span className="text-3xl">S</span>ecure<span className="text-3xl">H</span>ome
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm">
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
              <button onClick={()=>router.push('/login')} className="button-small">Logout</button>
            )}
  
          </div>
     
      </header>

  );
}
