## React Socket Hook
![GitHub](https://img.shields.io/github/license/leihancn/react-socket-hook)
![David](https://img.shields.io/david/leihancn/react-socket-hook)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/leihancn/react-socket-hook)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/leihancn/react-socket-hook)
![npm type definitions](https://img.shields.io/npm/types/typescript)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/leihancn/react-socket-hook/main)

#### 使用

```shell
# install
yarn add react-socket-hook
```
#### 基础用法
```tsx
import useSocket from 'react-socket-hook'

const { send } = useSocket('wss://echo.websocket.org', {
  onReceived: (data: DataType) => {
    // hanlde data in here.
  },
})

// send some data
send('something')
```

#### 声明
```ts
export declare type DataType = string | ArrayBufferLike | Blob | ArrayBufferView;

export interface UseSocketOptions {
  protocols?: WebSocket['protocol'];
  binaryType?: BinaryType;
  /**
   * 自动连接
   * @default true
   */
  autoConnect?: boolean;
  onConnected?: () => void;
  onClosed?: () => void;
  onReceived?: (data: DataType) => void;
  onError?: (errEvent: Event) => void;
}

export interface UseSocketReturn {
  /**
   * 主动调用来拉起连接。
   * 如果当前已是连接状态，则会保持状态。
   */
  connect: () => void;
  /**
   * 主动断开连接
   */
  close: () => void;
  /**
   * 发送数据
   * @param data
   */
  send: (data: DataType) => Promise<void>;
}

export declare type UseSocket = (url: string, options?: UseSocketOptions) => UseSocketReturn;

```


#### 常用指令

```shell
# 开发
yarn dev
# 打包
yarn build
# 提交代码
yarn cz
```

