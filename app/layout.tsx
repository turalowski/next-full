import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Navbar from './components/navbar'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full NextJS 13 application',
  description: 'This application has been created to show new features of NextJS 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${rubik.className} p-6`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
