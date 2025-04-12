'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/utils/supabase/context"
interface HeaderProps {
  showUsername?: boolean
}

export default function Header({ showUsername = false }: HeaderProps) {
  const { logOut, session } = useAuth()
  const handleLogout = async () => {
    await logOut()
  }
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-script text-blue-700">
              SecureHome
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/saved-searches" className="text-sm text-gray-700 hover:text-blue-700">
              Saved Searches
            </Link>
            <Link href="/list-property" className="text-sm text-gray-700 hover:text-blue-700">
              List a property
            </Link>
            {session?.user.email ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">Username</span>
                <Link href="/">
                  <button onClick={handleLogout}
                  className="h-8 bg-blue-700 text-white hover:bg-blue-800 border-blue-700"
                  >
                  Log out
                  </button>
                </Link>
              </div>
            ) : (
                <Link href="/login">
                <Button size="sm" className="h-8 bg-blue-700 hover:bg-blue-800">
                  Login
                </Button>
                </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
