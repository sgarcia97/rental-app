import TemplateTenant from "@/components/template-tenant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignContractPage() {
  return (
    <TemplateTenant>

          <div className="bg-white rounded-md shadow-sm mt-6 p-6">
            <h2 className="text-lg font-medium mb-6">Contract details for listing ID 56776</h2>

            <div className="max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="font-medium">Property Details:</div>
                    <div>112- SW</div>

                    <div className="font-medium">Monthly Payment:</div>
                    <div>$545</div>

                    <div className="font-medium">Security Deposit:</div>
                    <div>$32</div>

                    <div className="font-medium">Move in date:</div>
                    <div>12/8/25</div>

                    <div className="font-medium">Expiry date:</div>
                    <div>12/8/26</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="font-medium mb-2">Terms and conditions:</div>
                <div className="text-gray-600">
                  Terms and conditions are that .......................................................
                  ...................................................................................
                  ...................................................................................
                  ...................................................................................
                </div>
              </div>

              <div className="mb-8">
                <div className="font-medium mb-2">Your Sign Here</div>
                <Input type="text" className="max-w-xs" />
              </div>

              <Button className="bg-blue-700 hover:bg-blue-800 px-8">Submit</Button>
            </div>
          </div>
      </TemplateTenant>
  )
}
