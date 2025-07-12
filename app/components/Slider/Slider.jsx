'use client'; 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useTheme } from '../ThemeContext';

// 导入 Swiper 库的 CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 正确导入 CSS 模块为一个 `styles` 对象
import styles from './Slider.module.css';

const gameData = [
  { id: 1, title: 'Dota 2', description: 'A multiplayer online battle arena by Valve.', imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg' },
  { id: 2, title: 'Apex Legends', description: 'A free-to-play battle royale-hero shooter game.', imageUrl: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg' },
  { id: 3, title: 'Elden Ring', description: 'An action role-playing game by FromSoftware.', imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/0J12o1iAAb8b2vjM2d0e0n2Y.png' },
  { id: 4, title: 'Cyberpunk 2077', description: 'An action role-playing video game by CD Projekt.', imageUrl: 'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_02_1920x1080-b8465463a56360562215b36481b7e4cf' },
  { id: 5, 'title': 'Valorant', 'description': 'A team-based first-person hero shooter.', 'imageUrl': 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f07233c45759961/646427357c3d1e11942aef37/Val_Banner_PatchNotes_7-09_RiotClient.jpg' },
];

const Slider = () => {
  const { theme } = useTheme();

  // 根据主题动态拼接从 styles 对象中获取的类名
  const sectionClasses = `${styles['game-section']} ${theme === 'dark' ? styles.dark : ''}`;

  return (
    <section className={sectionClasses}>
      <h2 className={styles['line-title']}>Ongoing Project</h2>
      <Swiper
        // 模块和核心配置保持不变
        modules={[Navigation, Pagination]}
        loop={false} // loop: false 在这种效果下更稳定
        centeredSlides={true}
        grabCursor={true}
        allowTouchMove={true} 
        navigation={true}
        pagination={{ clickable: true }}
        
        // 使用 styles['game-swiper'] 来应用我们最终版的 CSS
        className={styles['game-swiper']}
        
        // ======================= 核心优化点 =======================
        // 默认设置为桌面端的视图
        slidesPerView={3}
        spaceBetween={20} // 稍微减小间距，让卡片更紧凑

        // 响应式断点，仅为移动端提供特殊配置
        breakpoints={{
          // 当屏幕宽度小于 768px (移动端)
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // 当屏幕宽度大于等于 768px (平板和桌面)
          // 它将自动继承上面的 slidesPerView: 3 设置
          // 我们可以为平板调整间距
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // 也可以为更大的桌面调整
          1024: {
            slidesPerView: 3,
            spaceBetween: 30, // 在大屏幕上间距可以大一些
          }
        }}
        // ==========================================================
      >
        {gameData.map((game) => (
          <SwiperSlide
            key={game.id}
            // 使用 CSS 模块来引用 swiper-slide 类，确保所有样式生效
            className={styles['swiper-slide']}
            style={{ backgroundImage: `url(${game.imageUrl})` }}
          >
            <div className={styles['item-desc']}>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
