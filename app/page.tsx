'use client'
import SearchHome from "@/components/searchHome"
import Image from "next/image"
import Placeholder from '@/public/property1.png'
import Template from "@/components/template"
import { useState, useEffect } from "react"
import { getProperties, caDollar, getPropertiesByLocation } from "@/lib/services"
import { useRouter } from 'next/navigation'
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from "@/components/slide"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function HomePage() {
  const [data, setData] = useState<any>(null)
  const [edmonton, setEdmonton] = useState<any>(null)
  const [calgary, setCalgary] = useState<any>(null)
  const router = useRouter()
  useEffect(()=>{
      getProperties().then(d => setData(d))
      getPropertiesByLocation('Edmonton').then(d => setEdmonton(d))
      getPropertiesByLocation('Calgary').then(d => setCalgary(d))
    },[])
  return (
    <Template>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold">
              Find Your next Home now!
            </h1>
          </div>

          <SearchHome/>

          <div className="mb-12">
            <h2 className="text-lg font-medium  mb-4">Recently Listed</h2>
            <div className="relative">
            <Swiper
            className="home-slide-wrapper"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            pagination={{dynamicBullets:true, clickable: true}}
            slidesPerView={'auto'}
            navigation
            loop
            autoplay
            //onSlideChange={() => console.log('slide change')}
            //onSwiper={(swiper) => console.log(swiper)}
    >
                {
                  data && data.map((prop:any)=>(
                  <SwiperSlide key={prop.property_id} className="home-slide">
                    <Slide prop={prop} img={Placeholder}/>
                  </SwiperSlide>
                  ))
              }
                 </Swiper>
              </div>
            </div>


            <div className="mb-12">
            <h2 className="text-lg font-medium  mb-4">Properties in Edmonton</h2>
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
                  edmonton && edmonton.map((prop:any)=>(
                    <SwiperSlide key={prop.property_id} className="home-slide">
                      <Slide prop={prop} img={Placeholder}/>
                    </SwiperSlide>
                  ))
              }
                 </Swiper>
              </div>
            </div>



            <div className="mb-12">
            <h2 className="text-lg font-medium  mb-4">Properties in Calgary</h2>
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
                  calgary && calgary.map((prop:any)=>(
                    <SwiperSlide key={prop.property_id} className="home-slide">
                      <Slide prop={prop} img={Placeholder}/>
                    </SwiperSlide>
                  ))
              }
                 </Swiper>
              </div>
            </div>
          </div>
     </Template>
  )
}
