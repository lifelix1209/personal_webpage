'use client'

import React from 'react';
import Navbar  from './components/Navbar';
import Header from './components/Header';
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'



export default function Home() {

  const pathname = usePathname()

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <main>
          <Header />
        </main>
      </motion.main>
    </>
  );
}