// src/app/news/page.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { useTheme } from '../components/ThemeContext'; // Assuming this hook returns { theme }
import { motion } from 'framer-motion';
import styles from './News.module.css'; // Import the CSS module

// --- 1. Corrected & Standardized Sample Data ---
const timelineData = [
  {
    id: 1,
    date: '2023-12-09',
    pics: null,
    content: 'I will go to the Cambridge University for a PhD in Biochemistry',
    link: null, // Standardized property (was 'links')
    tag: 'Personal Update'
  },
  {
    id: 2,
    date: '2022-01-01',
    pics: [
      'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_02_1920x1080-b8465463a56360562215b36481b7e4cf',
    ],
    content: 'Cyberpunk 2077: A Case Study in Cybernetics',
    link: null,
    tag: 'Game Review'
  },
  {
    id: 3,
    date: '2021-08-20',
    pics: ['https://images.unsplash.com/photo-1518770660439-4636190af475'],
    content: 'Building a Neural Network from Scratch',
    link: 'https://www.baidu.com', // Example link
    tag: 'Technical Article'
  }
];

// --- 2. PaperCard Sub-component (Now handles links) ---
const PaperCard = ({ cover, title, tag, link }) => {
  const [imgError, setImgError] = React.useState(false);
  const showImage = cover && !imgError;

  // Choose the component type: 'a' for links, 'div' for others
  const Component = link ? 'a' : 'div';
  const componentProps = {
    className: styles.paperCard,
    ...(link && { href: link, target: '_blank', rel: 'noopener noreferrer' })
  };

  return (
    <Component {...componentProps}>
      {showImage && (
        <div className={styles.cardImageWrapper}>
          <Image
            src={cover}
            alt={title}
            fill
            className={styles.cardImage}
            sizes="64px"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className={styles.cardContent}>
        {tag && <p className={styles.cardTag}>{tag}</p>}
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
    </Component>
  );
};

// --- 3. News Page Main Component ---
export default function News() {
  const { theme } = useTheme();

  return (
    // data-theme attribute allows CSS to react to theme changes
    <div data-theme={theme}>
      <Navbar />

      <motion.main
        className={styles.newsSection} // This class handles padding to avoid the Navbar
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>News & Updates</h1>
          <p className={styles.subTitle}>Stay updated with our latest updates and progress.</p>

          <ul className="timeline timeline-compact timeline-vertical">
            {timelineData.map((item, index) => (
              <li key={item.id}>
                <div className="timeline-start md:text-right">
                  <span className={styles.year}>{new Date(item.date).getFullYear()}</span>
                </div>

                <div className="timeline-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.timelineIcon}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="timeline-end pb-8">
                  {/* Pass the new `link` prop to the PaperCard component */}
                  <PaperCard
                    cover={item.pics ? item.pics[0] : null}
                    title={item.content}
                    tag={item.tag}
                    link={item.link}
                  />
                </div>

                {index < timelineData.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        </div>
      </motion.main>
    </div>
  );
}
