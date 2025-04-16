import { Navigation, Pagination, Autoplay, EffectFade} from 'swiper/modules';
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

const PhotoGallery = () => {
    const [data, setData] = useState<any>(null)
    const [similar, setSimilar] = useState<any>(null)

    useEffect(()=>{
        //getSimilarProperties(location, id).then(d => setSimilar(d))
    },[])

    return(
      
        <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper gallery-slide"
      >
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/623563/12993945.v.8a1abe208c819caa71c3b44c0c35f1fe.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/622468/12927088.v.733a86a14394944a4b6efd6f1372af8b.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/620412/12848611.v.28c36fe24198dd01acb432d353e70f6a.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/621548/12887933.v.ef1ead906237571923589bc15f6643ae.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/624949/13004711.v.a8dc0f376c399bbbefa5e4c3c1e24b1b.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/92972/1220884.v.3b3723e91bd3d04c3b079a8c7732288e.jpg" className="gallery-image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images-prod.r2.rentfaster.ca/118054/1485280.v.9e4b44546f6b44b0ca8150c0f6eae622.jpg" className="gallery-image" />
        </SwiperSlide>
      </Swiper>
    )
}

export default PhotoGallery