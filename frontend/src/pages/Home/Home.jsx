import React from 'react'
import Hero from './Hero/Hero'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'

const Home = () => {
  return (
    <section>
      <HeroContainer/>
      <div className='max-w-screen-x1 mx-auto'>
        <Gallery/>
        <PopularClasses/>
        <PopularTeacher/>
      </div>
    </section>
  )
}

export default Home
