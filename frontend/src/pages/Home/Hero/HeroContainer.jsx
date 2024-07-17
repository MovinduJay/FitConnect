// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Hero from './Hero';
import 'swiper/css';
import Hero2 from './Hero2';
import {EffectCreative} from 'swiper'

const HeroContainer = () => {
  return (
    <section>
        <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
            prev:{
                shadow:true,
                translate:["-120%,0,-500"]
            },
            next:{
                shadow:true,
                translate:["120%",0,-500]
            }
            
        }}
        modules={[EffectCreative]}
        className='mySwiper5'
        loop={true}
        autoplay={
            {
                delay:250,
                disableOnInteraction:false,
            }
        }
        >
            <SwiperSlide>
                <Hero/>
            </SwiperSlide>
            <SwiperSlide>
                <Hero2/>
            </SwiperSlide>
        </Swiper>
    </section>
  )
}

export default HeroContainer
