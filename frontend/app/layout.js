import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Cart from '@/components/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CloudScale Commerce',
  description: 'A production grade cloud native store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Cart />
      </body>
    </html>
  )
}