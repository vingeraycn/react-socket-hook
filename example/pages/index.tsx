import React, { useState } from 'react'
import useSocket, { DataType } from '../../src'

const Index = (): JSX.Element => {
  const [content, setContent] = useState<string>('Rock it with HTML5 WebSocket')
  const [message, setMessage] = useState<string>('')
  const { send, close, connect } = useSocket('wss://echo.websocket.org', {
    onConnected: () => {
      setMessage((prev: string) => `${prev} \n\n connected!`)
    },
    onClosed: () => {
      setMessage((prev: string) => `${prev} \n\n closed!`)
    },
    onReceived: (data: DataType) => {
      setMessage((prev: string) => `${prev} \n\n received: ${data}`)
    },
  })

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e: any) => {
          setContent(e.target.value)
        }}
      />
      <button
        type="button"
        onClick={() => {
          connect()
        }}
      >
        connect
      </button>

      <button
        type="button"
        onClick={() => {
          close()
        }}
      >
        close
      </button>
      <button
        type="button"
        onClick={() => {
          setMessage((prev: string) => `${prev} \n\n send: ${content}`)

          send(content)
        }}
      >
        send
      </button>
      <textarea rows={10} value={message} readOnly />
    </div>
  )
}

export default Index
