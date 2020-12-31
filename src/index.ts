import { useCallback, useEffect, useRef, useState } from 'react'

export type DataType = string | ArrayBufferLike | Blob | ArrayBufferView

export interface UseSocketOptions {
  protocols?: WebSocket['protocol']
  binaryType?: BinaryType

  /**
   * 自动连接
   * @default true
   */
  autoConnect?: boolean
  onConnected?: () => void
  onClosed?: () => void
  onReceived?: (data: DataType) => void
  onError?: (errEvent: Event) => void
}

export interface UseSocketReturn {
  /**
   * 主动调用来拉起连接。
   * 如果当前已是连接状态，则会保持状态。
   */
  connect: () => void

  /**
   * 主动断开连接
   */
  close: () => void

  /**
   * 发送数据
   * @param data
   */
  send: (data: DataType) => Promise<void>
}

export type UseSocket = (
  url: string,
  options?: UseSocketOptions
) => UseSocketReturn

const useSocket: UseSocket = (url, options) => {
  const {
    onConnected,
    onClosed,
    onReceived,
    onError,
    autoConnect = true,
    binaryType = 'blob',
    protocols,
  } = options ?? {}
  const wsRef = useRef<InstanceType<typeof WebSocket> | null>(
    url && autoConnect ? new WebSocket(url, protocols) : null
  )
  const [updateKey, setUpdateKey] = useState(Math.random())
  const handleReceived = useCallback(
    (event: MessageEvent) => onReceived?.(event.data),
    [onReceived]
  )

  useEffect(() => {
    if (!wsRef.current) {
      return
    }

    const ws = wsRef.current
    ws.binaryType = binaryType
    onConnected && ws.addEventListener('open', onConnected)
    onClosed && ws.addEventListener('close', onClosed)
    onReceived && ws.addEventListener('message', handleReceived)
    onError && ws?.addEventListener('error', onError)

    return () => {
      ws.close()
      onConnected && ws.removeEventListener('open', onConnected)
      onClosed && ws.removeEventListener('close', onClosed)
      onReceived && ws.removeEventListener('message', handleReceived)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateKey])

  return {
    connect: () => {
      if (!wsRef.current || wsRef.current?.readyState === WebSocket.CLOSED) {
        wsRef.current = new WebSocket(url, protocols)
        setUpdateKey(Math.random())
      }
    },
    close: () => {
      wsRef.current?.close?.()
    },
    send: async (data: DataType) =>
      new Promise((resolve, reject) => {
        try {
          wsRef.current?.send(data)
          wsRef.current?.bufferedAmount === 0 && resolve()
        } catch (e) {
          reject(e)
        }
      }),
  }
}

export default useSocket
