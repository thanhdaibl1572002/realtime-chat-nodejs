'use client'
import { FC, ReactNode, createContext, useEffect, useMemo } from 'react'
import io, { Socket } from 'socket.io-client'

interface ISocketContext {
    socket: Socket
}

export const SocketContext = createContext<ISocketContext | null>(null)

interface ISocketProvider {
    children: ReactNode
}

export const SocketProvider: FC<ISocketProvider> = ({ children }) => {
    const socket = useMemo(() => io('http://localhost:8080'), [])
    useEffect(() => {
        return () => { socket.disconnect() }
    }, [socket])

    return (
        <SocketContext.Provider value={{ socket }}>
          {children}
        </SocketContext.Provider>
    )
}