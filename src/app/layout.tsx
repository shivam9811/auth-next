import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Authentication',
  description: 'authentication portal created with nextJS also verify email when signup for the first time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div><Toaster position='top-right'/>
      
      </div>
        {children}
        
        </body>
    </html>
  )
}
