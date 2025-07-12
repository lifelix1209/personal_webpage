import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Header = () => {
  return (
    <header className="w-11/12 max-w-3xl mx-auto text-center h-screen flex flex-col items-center justify-center gap-4">
      {/* 1. 头像 */}
      <div className="mb-6">
        <Image
          src={assets.profile_img}
          alt="Hanzhang Li Profile"
          width={128}
          height={128}
          className="rounded-full"
        />
      </div>

      {/* 2. 打招呼 + 表情 */}
      <h3 className="flex items-center gap-2 text-lg md:text-xl font-Ovo mb-4">
        Hi, I’m Hanzhang Li
        <Image
          src={assets.hand_icon}
          alt="Wave Hand"
          width={24}
          height={24}
        />
      </h3>

      {/* 3. 主标题 */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-Ovo font-semibold mb-6 max-w-2xl">
        A student, a bioinformatician and a science explorer
      </h1>

      {/* 4. 描述文字 */}
      <p className="max-w-xl text-base md:text-lg text-gray-700 dark:text-gray-300 font-Outfit mb-8">
        I am passionate about using data to understand biological systems and improve human health. With a background in computer science and biology, I am skilled in programming, data analysis, and machine learning.
      </p>

      {/* 5. 按钮组 */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="/contact"
          className="flex items-center gap-3 px-8 py-4 bg-gray-700 text-white border border-gray-700 rounded-full text-lg font-medium shadow-lg transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 dark:bg-black dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Contact me
          <Image
            src={assets.right_arrow_white}
            alt="Arrow Right"
            width={16}
            height={16}
          />
        </a>

        <a
          href="/sample-resume.pdf"
          download
          className="flex items-center gap-3 px-8 py-4 bg-gray-700 text-white border border-gray-700 rounded-full text-lg font-medium shadow-lg transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 dark:bg-black dark:border-gray-600 dark:hover:bg-gray-800"
        >
          My Resume
        </a>
      </div>
    </header>
  )
}

export default Header
