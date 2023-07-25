import { ReactNode, FC } from 'react'
import { Inter } from 'next/font/google'
import '@/styles/globals.sass'

import { SocketProvider } from '@/providers/SocketProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat Realtime Application',
  description: 'Generated by create next app',
}

interface IRootLayout {
  children: ReactNode
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  return (
    <html lang="en">
        <body className={inter.className}>
          <SocketProvider>
            {children}
          </SocketProvider>
        </body>
    </html>
  )
}

export default RootLayout