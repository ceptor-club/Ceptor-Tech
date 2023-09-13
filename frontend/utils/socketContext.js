import React, { useEffect } from "react"
import { useState, useContext } from "react"
import { io } from "socket.io-client"

// const socket = socketio.connect(process.env.NEXT_PUBLIC_API_BASE_URL);
export const SocketContext = React.createContext()
// export function useSocketContext() {
//   return useContext(socket)
// }

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      auth: {
        token: process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
