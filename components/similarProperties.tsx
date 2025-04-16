import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Placeholder from '@/public/property1.png'
import { useState, useEffect} from 'react'
import { getSimilarProperties } from '@/lib/services'
import Slide from './slide';

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
              similar && (similar.length == 0 ? <div>There are no similar properties at this time</div> : similar.map((prop:any)=>(
            <SwiperSlide className="home-slide">
                <Slide prop={prop} img={Placeholder}/>
            </SwiperSlide>
              )))
          }
             </Swiper>
          </div>
        </div>
    )
}

export default SimilarProperties