// components/Navbar.jsx
'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { assets } from '@/assets/assets'
import { useTheme } from './ThemeContext'
import Link from 'next/link'


export default function Navbar() {
  const sideMenuRef = useRef(null)
  const pathname = usePathname()
  const { isDarkMode, toggleTheme } = useTheme()

  const openMenu  = () => sideMenuRef.current?.style.setProperty('transform', 'translateX(0)')
  const closeMenu = () => sideMenuRef.current?.style.setProperty('transform', 'translateX(100%)')

  const menuItems = [
    { label: 'Home',    href: '/' },
    { label: 'About',   href: '/about' },
    { label: 'Work',    href: '/work' },
    { label: 'News',    href: '/news' },
    { label: 'Contact', href: '/contact' }
  ]

  const linkClass = href =>
    `font-Ovo transition-colors ${
      pathname === href
        ? 'font-bold text-lg'
        : 'font-normal text-base hover:font-semibold'
    }`

  return (
    <nav
      className="
        fixed inset-x-0 top-0 z-50
        flex items-center justify-between
        px-5 lg:px-8 xl:px-[8%] py-4
        bg-[var(--bg)]/80
        backdrop-blur-sm shadow-md transition-all duration-300
        dark:bg-[#1f2937]/80                                    /* [修改] 暗色模式背景色 */
        dark:ring-1 dark:ring-white/10                          /* [新增] 暗色模式下添加白色细边框 */
        dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]          /* [新增] 暗色模式下添加白色光晕 */
      "
    >
      {/* ─── Logo ─────────────────────────────────────────── */}
      <Link href="/" className="mr-12">
        <Image src={assets.felix_logo} alt="Logo" className="w-28 cursor-pointer" priority />
      </Link>

      {/* ─── 桌面导航 ─────────────────────────────────────── */}
      <ul
        className="
          hidden md:flex items-center gap-6 lg:gap-8
          rounded-full px-12 py-3
          bg-[var(--bg)]/50
          backdrop-blur-sm shadow-md transition-all duration-300
          dark:bg-[rgba(0,0,0,0.25)]                             /* 暗色模式容器背景 */
          dark:ring-1 dark:ring-white/10                          /* [新增] 暗色模式下添加白色细边框 */
          dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]          /* [新增] 暗色模式下添加白色光晕 */
        "
      >
        {menuItems.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={linkClass(href)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* ─── 右侧控件 ─────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* 主题切换 */}
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="toggle theme-controller"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
        </label>

        {/* 联系按钮（≥ lg 显示） */}
        <Link href="/contact" passHref>
          <button className="btn hidden lg:flex items-center gap-3 px-10 py-2.5
                      border border-gray-500 rounded-full font-Ovo
                      text-[var(--fg)] hover:bg-gray-100 dark:hover:bg-gray-800
                      transition-colors">
                      Contact
          </button>
        </Link>
        {/* 汉堡菜单（< md 显示） */}
        <button className="block md:hidden ml-3" onClick={openMenu}>
          <Image src={assets.menu_black} alt="menu" className="w-6" />
        </button>
      </div>

      {/* ─── 移动端抽屉 ───────────────────────────────────── */}
      <ul
        ref={sideMenuRef}
        style={{ transform: 'translateX(100%)' }}
        className="
          fixed right-0 top-0 bottom-0 h-screen w-64 z-50
          flex md:hidden flex-col gap-4 py-20 px-10
          bg-[var(--bg)] transition-transform duration-500 ease-in-out
          dark:bg-[#1f2937] /* [修改] 确保抽屉菜单背景色一致 */
        "
      >
        <div className="absolute top-6 right-6">
          <Image
            src={assets.close_black}
            alt="Close"
            className="w-5 cursor-pointer"
            onClick={closeMenu}
          />
        </div>

        {menuItems.map(({ label, href }) => (
          <li key={href} onClick={closeMenu}>
            <Link href={href} className={linkClass(href)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
