'use client'

import { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeCtx = createContext({
  theme: 'light',
  isDarkMode: false,
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  /* ========== 把主题写进 DOM（首帧 + 每次变化） ========== */
  const applyToRoot = t => {
    ;[document.documentElement, document.body].forEach(el => {
      el.setAttribute('data-theme', t)          // DaisyUI / 自定义 var
      el.classList.toggle('dark', t === 'dark') // Tailwind dark:
    })
  }

  /* 1. 首次挂载：localStorage / 系统偏好 → 直写 DOM，防闪烁 */
  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const init = saved ?? (prefersDark ? 'dark' : 'light')
    applyToRoot(init)
    setTheme(init)
  }, [])

  /* 2. theme 变化：同步 DOM + 持久化 */
  useLayoutEffect(() => {
    applyToRoot(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /* 3. 切换函数（基于上一次状态） */
  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeCtx.Provider
      value={{ theme, isDarkMode: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
