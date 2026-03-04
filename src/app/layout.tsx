import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { LoadingScreen } from '@/components/LoadingScreen'
import { CustomCursor } from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'
import { DevAssistantChat } from '@/components/DevAssistantChat'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gopal Ji Dwivedi | Software Developer & AI Engineer',
  description: 'Building scalable software, intelligent systems, and startup products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-charcoal text-warm min-h-screen">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <DevAssistantChat />
      </body>
    </html>
  )
}
