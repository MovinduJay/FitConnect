import React from 'react'
import Hero from './Hero/Hero'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'

const Home = () => {
  return (
    <section>
      <HeroContainer/>
      <div className='max-w-screen-x1 mx-auto'>
        <Gallery/>
        <PopularClasses/>
      </div>
    </section>
  )
}

export default Home
