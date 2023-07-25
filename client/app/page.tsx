'use client'
import { FC, useEffect, useState, useContext } from 'react'
import { SocketContext } from '@/providers/SocketProvider'

interface IHome { }

const Home: FC<IHome> = ({ }) => {
  const [message, setMessage] = useState<string>('')
  const socket = useContext(SocketContext)?.socket
  
  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        console.log('Received message:', message)
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  const sendMessage = () => {
    socket && socket.emit('send-message-test', message)
  }

  return (
    <main>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </main>
  )
}

export default Home