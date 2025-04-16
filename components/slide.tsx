import Image from "next/image"
import { caDollar } from "@/lib/services"
import { useRouter } from "next/navigation"

type SlideType = {
    prop:any;
    img:any;
}

const Slide = ({prop, img}:SlideType) => {
    const router = useRouter()
    return(
                <div
                className="rounded-lg overflow-hidden shadow-md home-list" 
                onClick={()=> router.push(`/property/${prop.property_id}`)}
                >
                <Image
                  src={img}
                  alt="House"
                  className="w-full h-[180px] object-cover"
                />
                <div className="home-list-content">
                    <div>
                        <div className="home-list-subtitle">{prop.description}</div>
                        <div className="home-list-title">{caDollar.format(prop.rent)}</div>
                    </div>
                    <div>
                        <div className="home-list-desc">{prop.address}</div>
                        <div className="home-list-desc">{prop.city}, {prop.province}</div>
                    </div>
                </div>
            </div>
    )
}

export default Slide