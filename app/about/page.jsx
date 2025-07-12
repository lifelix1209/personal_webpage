'use client'

import React from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useTheme } from '../components/ThemeContext'
import { assets } from '@/assets/assets'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import '../styles/about-cards.scss'

/* ---------------- 分割线组件 ---------------- */
const Divider = ({ title }) => {
  const { theme } = useTheme()
  const lineColor = theme === 'dark' ? 'via-gray-600' : 'via-gray-300'
  return (
    <div className="flex items-center">
      <span className={`flex-1 h-px bg-gradient-to-r from-transparent ${lineColor} to-transparent`} />
      <span className="shrink-0 px-4 text-lg font-semibold">{title}</span>
      <span className={`flex-1 h-px bg-gradient-to-l from-transparent ${lineColor} to-transparent`} />
    </div>
  )
}

/* ---------------- 毛玻璃卡片组件 ---------------- */
function GlassCard ({ title, desc, img, category }) {
  return (
    <a href="#" className="glass-card group relative block overflow-hidden bg-black">
      {/* 背景图 */}
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width:768px) 100vw, 25vw"
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40"
      />

      {/* 文字层 */}
      <div className="card-content relative flex flex-col h-full p-4 sm:p-6 lg:p-8">
        {category && (
          <p className="meta text-sm tracking-widest uppercase">{category}</p>
        )}
        <p className="title text-xl sm:text-2xl">{title}</p>

        {/* 描述直接放到底部，便于滑入 */}
        <p className="description mt-auto text-sm">{desc}</p>
      </div>
    </a>
  )
}

export default function About () {
  useTheme()
  const pathname = usePathname()

  /* ---------- 技能 ---------- */
  const skills = [
    { name: 'R: Using R to analyse Omics data…', percent: 80, logo: assets.r_logo },
    { name: 'Python: Using Python for Omics…',   percent: 85, logo: assets.python_logo },
    { name: 'React + Next.js + Tailwind CSS…',  percent: 60, logo: assets.react_logo },
    { name: 'Matlab: Bioinformatics pipeline…', percent: 60, logo: assets.matlab_logo }
  ]

  /* ---------- 研究兴趣卡片 ---------- */
  const interestCards = [
    {
      title: 'Stem Cell Fate Determination',
      category: 'Developmental Biology',
      desc : 'Using multi omics data to decode stem cell fate decisions in early development.',
      img  : assets.bioinformatics_second
    },
    {
      title: 'Bioinformatic Tool Development',
      category: 'Software Engineering',
      desc : 'Building reproducible pipelines and interactive visualisation tools for omics studies.',
      img  : assets.bioinformatics
    },
    {
      title: 'Neural Crest Cells',
      category: 'Morphogenesis',
      desc : 'Exploring cranio facial patterning driven by migratory neural crest populations.',
      img  : assets.bioinformatics_third
    },
    {
      title: 'AI for Science',
      category: 'Machine Learning',
      desc : 'Designing foundationmodels that accelerate hypothesis generation and validation.',
      img  : assets.bioinformatics_forth
    }
  ]

  const { theme } = useTheme()
  const liBg     = theme === 'dark' ? 'bg-slate-800' : 'bg-white'
  const liBorder = theme === 'dark' ? 'border-slate-700' : 'border-transparent'
  const liShadow = theme === 'dark' ? 'shadow-slate-950/50' : 'shadow-sm'
  const fg       = theme === 'dark' ? 'text-gray-50' : 'text-gray-900'

  return (
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <main
          data-view-transition-name={pathname}
          className="mx-auto max-w-5xl pt-32 pb-20 px-6 md:px-8 lg:px-10 space-y-24"
        >
          {/* 个人信息 */}
          <section className="flex flex-col items-center gap-4">
            <div className="relative h-28 w-28">
              <Image
                src={assets.profile_img}
                alt="Profile"
                fill
                className={`object-cover rounded-full ring-4 ring-offset-4 ring-offset-[var(--bg)]
                            ${theme === 'dark' ? 'ring-gray-700' : 'ring-gray-200'}`}
              />
            </div>
            <p className={`text-lg font-medium ${fg}`}>Hanzhang Li</p>
          </section>

          {/* 教育经历 */}
          <section>
            <Divider title="Education Background" />
            <ul className="mt-10 list-disc pl-5 space-y-3">
              <li className={fg}><strong>2021 ‑ 2025</strong> ‧ B.S. in Biomedical Informatics ‧ <em>Zhejiang University</em></li>
              <li className={fg}><strong>2021 ‑ 2025</strong> ‧ B.S.(Hons) in Biomedical Informatics ‧ <em>University of Edinburgh</em></li>
              <li className={fg}><strong>2025 ‑ …</strong> ‧ Prospective PhD Student ‧ <em>University of Cambridge</em></li>
            </ul>
          </section>

          {/* 研究兴趣 */}
          <section>
            <Divider title="Research Interests" />
            <div className="mt-10 page-content">
              {interestCards.map(card => (
                <GlassCard key={card.title} {...card} />
              ))}
            </div>
          </section>

          {/* 技能 */}
          <section>
            <Divider title="Skills" />
            <ul className="mt-10 rounded-lg overflow-hidden">
              <li className={`p-4 text-sm font-medium tracking-wide ${liBg}/80`}>Dry Lab Skills</li>
              {skills.map(({ name, percent, logo }) => (
                <li
                  key={name}
                  className={`
                    flex items-center gap-4 px-4 py-3 border rounded-lg
                    ${liBg}/60 ${liBorder} shadow ${liShadow}
                  `}
                >
                  <div
                    className="radial-progress"
                    style={{ '--value': percent, '--thickness': '6px' }}
                    role="progressbar"
                  >
                    <span className={fg}>{percent}%</span>
                  </div>
                  <span className={`flex-1 font-medium ${fg}`}>{name}</span>
                  <Image src={logo} alt={`${name} logo`} width={32} height={32} />
                </li>
              ))}
            </ul>


            
          </section>
        </main>
      </motion.main>
    </>
  )
}
