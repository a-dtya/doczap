import React from 'react'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import Features from '@/components/features'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
    
  );
}
