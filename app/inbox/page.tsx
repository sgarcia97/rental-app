import Header from "@/components/header"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function InboxPage() {
  const messages = [
    { name: "Michael Katsap", date: "11/05/2025", message: "Hi, I have an inquiry about....." },
    { name: "Jane Doe", date: "11/04/2025", message: "Hi, I have an inquiry about....." },
    { name: "Stuart Little", date: "2/01/2025", message: "Hi, I have an inquiry about....." },
    { name: "Elsa Shane", date: "20/12/2024", message: "Hi, I have an inquiry about....." },
    { name: "Ellen Dutch", date: "10/12/2024", message: "Hi, I have an inquiry about....." },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header showUsername={true} />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Navigation />

          <div className="bg-white rounded-md shadow-sm mt-6">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Inbox (4 messages)</h2>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date ▼
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
