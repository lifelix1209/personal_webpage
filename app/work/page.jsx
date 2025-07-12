'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider/Slider'; // Slider 仍然是独立的
import Image from 'next/image';
import { useTheme } from '../components/ThemeContext'; // 确保 useTheme 被导入
import { motion } from 'framer-motion';
import { assets } from '@/assets/assets';


const PaperCard = ({ cover, title, author, journal }) => {
  const [imgError, setImgError] = React.useState(false);
  const { theme } = useTheme();

  const cardClasses =
    theme === 'dark'
      ? 'bg-slate-800 border-slate-700 text-gray-50 shadow-lg shadow-sky-950/50 ring-1 ring-sky-500/20'
      : 'bg-white border-transparent shadow-md text-gray-900';

  const showImage = cover && !imgError;

  return (
    <div className={`flex items-start gap-4 rounded-lg p-4 min-w-0 max-w-prose transition-all duration-300 ${cardClasses}`}>
      {showImage && (
        <div className="w-16 h-20 flex-shrink-0 relative">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="64px"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="font-normal text-base">{author}</p>
        {journal && <p className="italic text-sm mt-1">{journal}</p>}
      </div>
    </div>
  );
};


const TimelineIcon = () => {
  // 1. 在组件内部使用 useTheme 钩子
  const { theme } = useTheme();

  // 2. 根据主题动态确定颜色类
  const iconColor = theme === 'dark' ? 'text-[#38bdf8]' : 'text-[#e73700]';

  return (
    // 3. 将动态颜色类应用到 SVG
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 ${iconColor}`}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
};


// --- 主要页面组件 ---
export default function Work() {
  const { theme } = useTheme();

  const papers = [
    { year: 2025, month: 3, title: 'Enhanced Immune Cell Nuclei Recovery...', author: 'Hanzhang*', cover: assets.paper_cover, journal: '待发表期刊' },
    { year: 2025, month: 3, title: 'Temporo-spatial single-cell analysis...', author: 'Hanzhang*', cover: assets.paper_cover, journal: '待发表期刊' },
    // 示例：如果某篇论文没有封面，可以不提供 cover 属性或设为 null
    { year: 2024, month: 8, title: 'A Novel Approach to AI Ethics', author: 'Hanzhang*', cover: null, journal: 'Journal of Future Technology' }
  ];

  const hrColor = theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200';
  const pageBgColor = theme === 'dark' ? 'bg-slate-900' : 'bg-white';

  return (
    <div className={`transition-colors duration-300 ${pageBgColor}`}>
      <Navbar />

      <motion.main
        className="max-w-6xl mx-auto pt-32 sm:pt-36 lg:pt-40 pb-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
          My Publications & Work
        </h2>

        <ul className="timeline timeline-vertical lg:timeline-horizontal">
          {papers.map((paper, index) => (
            <li key={`${paper.title}-${index}`}>
              {index !== 0 && <hr className={hrColor} />}
              <div className={index % 2 === 0 ? 'timeline-start' : 'timeline-end'}>
                <time className="font-mono italic text-sm text-gray-500">
                  {paper.year}-{String(paper.month).padStart(2, '0')}
                </time>
              </div>
              <div className="timeline-middle">
                {/* TimelineIcon 现在可以自己管理颜色，无需传递 props */}
                <TimelineIcon />
              </div>
              <div className={`timeline-box ${index % 2 === 0 ? 'timeline-end' : 'timeline-start'}`}>
                <PaperCard {...paper} />
              </div>
              {index !== papers.length - 1 && <hr className={hrColor} />}
            </li>
          ))}
        </ul>
      </motion.main>

      {/* Slider 仍然放在 main 外部，以保持其全宽布局。它的高度由其自身的 CSS 文件控制。*/}
      <Slider />
    </div>
  );
}
