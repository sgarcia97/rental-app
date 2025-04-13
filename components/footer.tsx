import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center space-x-6">
          <Link href="#" className="text-sm hover:underline">
            About Us
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Contact Us
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Privacy
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
