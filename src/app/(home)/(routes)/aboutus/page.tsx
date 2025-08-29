import React from 'react'
import AboutPage from './AboutPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ABOUT US',
  description: 'About Page'
}

const AboutUs = () => {
  return (
    <div>
      <AboutPage />
    </div>
  )
}

export default AboutUs