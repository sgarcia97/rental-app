import Link from "next/link";
import type { NextPage } from "next";
import TemplateTenant from "@/components/template-tenant";


const SecureHomePage: NextPage = () => {
  return (
    <TemplateTenant>
              
          

          {/* Form content */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 text-center mb-6">There are no expired contracts.</h2>

            
          </div>
    </TemplateTenant>
  );
};

export default SecureHomePage;