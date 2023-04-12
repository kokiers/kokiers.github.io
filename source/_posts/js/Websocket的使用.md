---
title: Websocket的使用
lang: js
abbrlink: f51f3d5
date: 2023-04-07 13:16:28
tags:
---

### WebSocket
`WebSocket `对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。
使用 WebSocket() 构造函数来构造一个 WebSocket。
<!-- more -->
websocket的常量与状态值：

<!-- | Align `left`   | center align |   Align right |
| :------------- | :----------: | ------------: |
| `left`-aligned |   centered   | right-aligned |
| `左`对齐        |    中对齐     |         右对齐 | -->

| websocket的常量   |  状态值 |
| :------------- |  ------------: |
| WebSocket.CONNECTING | 0|
| WebSocket.OPEN	| 1 |
| WebSocket.CLOSING	| 2 |
| WebSocket.CLOSED	| 3 |

### 方法
关闭当前链接:`WebSocket.close([code[, reason]])` 
发送消息：`WebSocket.send(data)`

### 事件
使用 `addEventListener()` 或将一个事件监听器赋值给本接口的 `oneventname` 属性，来监听下面的事件。
+ `close `: 连接被关闭时触发 ||  通过 `onclose` 属性
+ `error` : 连接因错误而关闭时触发 || 通过 `onerror` 属性来设置。
+ `message` :  WebSocket 收到数据时触发 ||  通过 `onmessage `属性来设置
+ `open` : 连接成功触发 || 通过 `onopen `属性来设置

### 实战完整例子
```javaScript
enum chatTypes {
	doctor = 1,
	customer
}

enum chatAction {
	received = 1,
	send,
	read,
	heart
}

enum messageType {
	text = 1,
	img
}

enum wsState {
	CONNECTING = 0,
	OPEN, //可以通信
	CLOSING,
	CLOSED
}

interface Message {
	id: string
	content: string
	senderId: string
	sendTime: number
	[propName: string]: any
}
interface Messages {
	[x: string]: any;
	[index: number]: Message
}

class wsManager {
	lockReconnect = false;
	heartMsg = JSON.stringify({
		'action': chatAction.heart,
	})
	timeHeart = 30000
	overTime = 100000
	settimeHeart = 0
	reconectTimeTO = 0
	reconectTime = 2000
	setoverTime = 0
	reconnectNum = 10

	socketServer = window.location.host
	protocols = window.location.protocol == 'http:' ? 'ws' : 'wss'
	userId = sessionStorage.getItem('uid')
	chatType = chatTypes.doctor 
	token = sessionStorage.getItem('token')
	websock!: WebSocket;

	constructor(type?: chatTypes) {
		this.chatType = type ? type : this.chatType;
		this.init();
	}
	getUrl() {
		return `${this.protocols}://${this.socketServer}/ws/${this.userId}?mode=${this.chatType}&token=${this.token}`;
	}

	init() {
		if (!sessionStorage.getItem('token') || !sessionStorage.getItem('uid')) {
			this.lockReconnect = true;
			return;
		}
		let url = this.getUrl();
		this.websock = new WebSocket(url);
		this.websock.onmessage = (val: any) => {
			this.wsReset();
		};
		this.websock.onopen = (val: any) => {
			this.wsHeartbeat();
		};
		this.websock.onerror = (e: any) => {
			this.wsReconnect();
		};
		this.websock.onclose = (e: any) => {
			if (this.lockReconnect) {
				return
			}
			setTimeout(() => {
				this.wsReconnect();
				this.lockReconnect = false;
			}, 3000)
		};
	}
	wsSend(data: any) {
		if (this.websock && this.websock.readyState == wsState.OPEN) {
			this.websock.send(data);
		}
	}

	wsClose() {
		if (this.websock && this.websock.readyState != wsState.CLOSED) {
			this.websock.close()
		}
	}

	wsReconnect() {
		if (this.lockReconnect || this.reconnectNum <= 0) {
			return
		}
		this.reconnectNum--;
		this.reconectTimeTO = window.setTimeout(() => {
			this.init();
			this.lockReconnect = false;
		}, this.reconectTime)
	}
	wsReset() {
		clearTimeout(this.settimeHeart);
		clearTimeout(this.setoverTime);
		clearTimeout(this.reconectTimeTO);
		this.wsHeartbeat();
	}
	wsHeartbeat() {
		this.settimeHeart = window.setTimeout(() => {
			if (this.websock.readyState == wsState.OPEN) {
				this.wsSend(this.heartMsg);
				this.wsHeartbeat();
			}
		}, this.timeHeart)
	}
	// 客户端主动关闭
	wsHeartOverTime() {
		this.setoverTime = window.setTimeout(() => {
			this.wsClose();
		}, this.overTime)
	}
}

const doctorImg = new URL('../assets/images/doctor.png', import.meta.url).href
const chatImg = new URL('../assets/images/chat_img.png', import.meta.url).href

export default wsManager;
export {
	chatTypes,
	chatAction,
	wsState,
	messageType,
	doctorImg,
	chatImg
}
export type {
	Message,
	Messages
}

```
