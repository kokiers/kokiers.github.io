---
title: Websocket的使用
lang: js
abbrlink: f51f3d5
date: 2023-04-07 13:16:28
tags:
---


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

import { useSocketStore } from '@/stores/socket'
const socketStore = useSocketStore();

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
	chatType = chatTypes.doctor // 1 问诊 2 客服 
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
			socketStore.setSatus(4,this.chatType == chatTypes.doctor)
			return;
		}
		let url = this.getUrl();
		this.websock = new WebSocket(url);
		this.websock.onmessage = (val: any) => {
			socketStore.setSatus(1,this.chatType == chatTypes.doctor)
			this.wsReset();
		};
		this.websock.onopen = (val: any) => {
			socketStore.setSatus(1,this.chatType == chatTypes.doctor)
			this.wsHeartbeat();
		};
		this.websock.onerror = (e: any) => {
			socketStore.setSatus(4,this.chatType == chatTypes.doctor)
			this.wsReconnect();
		};
		this.websock.onclose = (e: any) => {
			socketStore.setSatus(3,this.chatType == chatTypes.doctor)
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
