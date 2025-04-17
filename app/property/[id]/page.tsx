"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Heart,
  Calendar,
  User,
  Mail,
  Phone,
  MoreVertical,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getProperty } from "@/lib/services";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import Template from "@/components/template";
import { expressInterest, activateRental } from "@/lib/tenantServices";
import { useAuth } from "@/utils/supabase/context";

export default function PropertyPage() {
  const [data, setData] = useState<any>(null);
  const { session } = useAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const refresh = () => {
    getProperty(id).then((d) => setData(d));
  };

  useEffect(() => {
    refresh();
  }, [id]);

  const handleInterest = async () => {
    if (!session?.user.id) {
      alert("You must be logged in to express interest.");
      return;
    }
    await expressInterest(id, session.user.id);
    refresh(); // refresh data to reflect updated prospective_tenant_id
  };

  const handleActivateRental = async () => {
    try {
      await activateRental(id); // assumes property ID is passed
      alert("Rental activated!");
      refresh();
    } catch (err) {
      console.error("Activation error:", err);
      alert("Failed to activate rental");
    }
  };

  if (!data) return <Loader />;
  const property = data;
  const alreadyExpressed =
    session && property?.prospective_tenant_id === session.user.id;
  const canActivate = property.status === "pending" && alreadyExpressed;
  const disabled = !session || alreadyExpressed === true;

  return (
    <Template>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{property.description}</h1>
              <Button variant="outline" className="border-2 gap-2">
                Add to My faves <Heart className="h-5 w-5 fill-black" />
              </Button>
            </div>

            <div className="border-t border-b py-4 mb-6">
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{property.address}</p>
                  <p>
                    <Link
                      href="/neighborhoods/beltline"
                      className="text-blue-700 hover:underline"
                    >
                      {property.city}
                    </Link>
                    &nbsp;
                    {property.province}
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Floor Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <div className="overflow-hidden rounded-md" key={n}>
                  <Image
                    src={`/floorPlan${n}.jpeg`}
                    alt={`Floor plan ${n}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Tenant Options</h3>

              {canActivate ? (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white text-sm"
                  onClick={handleActivateRental}
                >
                  Activate Rental
                </Button>
              ) : (
                <Button
                  onClick={handleInterest}
                  disabled={disabled}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {alreadyExpressed
                    ? "Interest Submitted"
                    : session
                    ? "Express Interest"
                    : "Login to Express Interest"}
                </Button>
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Contact: {property.owner?.name ?? "No Owner"}
            </h3>

            <form className="space-y-4">
              {[
                { placeholder: "Name", icon: <User className="h-5 w-5" /> },
                {
                  placeholder: "Email Address",
                  icon: <Mail className="h-5 w-5" />,
                },
                {
                  placeholder: "Phone number",
                  icon: <Phone className="h-5 w-5" />,
                },
                {
                  placeholder: "Requested move in date",
                  icon: <Calendar className="h-5 w-5" />,
                },
              ].map(({ placeholder, icon }, i) => (
                <div className="relative" key={i}>
                  <Input
                    type="text"
                    placeholder={placeholder}
                    className="pl-3 pr-10 py-6 bg-gray-200 border-0 rounded-md"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                    {icon}
                  </div>
                </div>
              ))}

              <Button
                type="submit"
                className="w-full py-6 text-lg bg-blue-700 hover:bg-blue-800"
              >
                Submit Contact Info
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Template>
  );
}
