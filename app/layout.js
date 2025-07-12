// app/layout.js
import './globals.css'
import { ThemeProvider } from '@/app/components/ThemeContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
