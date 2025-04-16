import Image from "next/image"
import { caDollar, getFavourite } from "@/lib/services"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { useAuth } from "@/utils/supabase/context";
import Heart from '@/public/heart-filled.svg'
import Directions from '@/public/diamond-turn-right.svg'

type SlideType = {
    prop:any;
    img:any;
}

const Slide = ({prop, img}:SlideType) => {
    const { session } = useAuth()
        const router = useRouter()
        const [fav, setFav] = useState(null)
        useEffect(()=>{
            handleFavourite(prop.property_id)
        },[])
    
        const handleFavourite = async (id:string) => {
             const f = session && await getFavourite(id,session.user.id)
             f && setFav(f.property_id)
    
        }
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
                        <div className="list-button-wrapper">
                       
                    
                       {
                        fav == prop.property_id &&
                        <Image src={Heart} alt="" className="list-fave"/>
                      
                      }
                      </div>
                    </div>
                </div>
            </div>
    )
}

export default Slide