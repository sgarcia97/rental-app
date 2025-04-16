import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Placeholder from '@/public/property1.png'
import Image from 'next/image';
import { caDollar } from '@/lib/services';
import { useState, useEffect} from 'react'
import { getSimilarProperties } from '@/lib/services'
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type SimilarType = {
    location:string;
    id:string;
}

const SimilarProperties = ({location, id}:SimilarType) => {
    const [data, setData] = useState<any>(null)
    const [similar, setSimilar] = useState<any>(null)
    const router = useRouter()

    useEffect(()=>{
        getSimilarProperties(location, id).then(d => setSimilar(d))
    },[])

    return(
        <div className="mb-12">
        <h2 className="text-lg font-medium  mb-4">Similar properties in {location}</h2>
        <div className="relative">
        <Swiper
        className="home-slide-wrapper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        pagination={{dynamicBullets:true, clickable: true}}
        slidesPerView={'auto'}
        navigation
        >
            {
              similar && similar.map((prop:any)=>(

             
            <SwiperSlide className="home-slide"><div key={prop.property_id} className="rounded-lg overflow-hidden shadow-md home-list" onClick={()=> router.push(`/property/${prop.property_id}`)}>
              <Image
                src={Placeholder}
                alt="House"
                
                className="w-full h-[180px] object-cover"
              />
              <div className="home-list-content">
              <div className="home-list-subtitle">{prop.description}</div>
              <div className="home-list-title">{caDollar.format(prop.rent)}</div>
              <div className="home-list-desc">{prop.address}</div>
              </div>
            </div>
            </SwiperSlide>
              ))
          }
             </Swiper>
          </div>
        </div>
    )
}

export default SimilarProperties