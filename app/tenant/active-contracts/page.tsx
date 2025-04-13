import Link from "next/link";
import type { NextPage } from "next";
import TemplateTenant from "@/components/template-tenant";


interface Listing {
  address: string;
  dateListed: string;
  description: string;
}

const ActiveListingsPage: NextPage = () => {
  // Sample data for the listings
  const listings: Listing[] = [
    {
      address: "33 19 Ave SW",
      dateListed: "11/05/2025",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "56 8 Ave NW",
      dateListed: "11/04/2025",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "112 Marlbrough rd NE",
      dateListed: "2/01/2025",
      description: "Newly built Condo with 2 bedr...",
    },
    {
      address: "50 Rocky Ridge NW",
      dateListed: "20/12/2024",
      description: "Beautiful 2 story townhouse....",
    },
    {
      address: "26 Evanston Drive SE",
      dateListed: "10/12/2024",
      description: "Newly built Condo with 2 bedr...",
    },
  ];

  return (
   <TemplateTenant>

          {/* Listings content */}
          <div className="bg-white rounded-md shadow-sm">
            <div className="p-4 border-b">
              <h2 className="text-sm font-medium">Active Listings ({listings.length} Listings)</h2>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Listed
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 inline"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {listing.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.dateListed}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{listing.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-[#005377]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </TemplateTenant>
  );
};

export default ActiveListingsPage;