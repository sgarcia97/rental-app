import Link from "next/link";
import TemplateManager from "@/components/template-manager";
import type { NextPage } from "next";


const SecureHomePage: NextPage = () => {
  return (
    <TemplateManager>

          {/* Form content */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <p>There are no expired contracts.</p>

            
          </div>
      </TemplateManager>
  );
};

export default SecureHomePage;