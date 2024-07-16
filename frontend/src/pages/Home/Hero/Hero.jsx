import React from 'react'
import bgImg from '../../../assets/home/banner-1.jpg'

const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
      <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
        <div>
          <div className='space-y-4'>
            <p className='md:text-4xl text-2xl'>We provide </p>
            <h1 className='md:text-7xl text-4xl font-bold'>Best Fitness Course Online</h1>
            <div className='md:w-1/2'>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam alias tempora quis necessitatibus corrupti aut. Blanditiis id dolor laudantium voluptatem perferendis ut, autem, officiis magnam iure ipsam, a sapiente deleniti.</p>
            </div>
            <div className='flex flex-wrap items-center gap-5'>
              <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today </button>
              <button  className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
