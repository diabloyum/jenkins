import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from 'leaflet';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CommonConstance } from '../constance';
import { CommonHttpService } from '../services/common.service';
import { isNull } from '../utils/util';
import win = Browser.win;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, DoCheck, OnDestroy {
    select: Array<string> = [];
    events: Array<any>;
    options: any;
    // chat_list: any = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_CHAT_LOCALSTPRAGE));
    myInfo: any = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    userId: any = localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_ID);
    chatMessage = [];
    socket: any = localStorage.getItem('bm-socket');
    subscription: Subscription;
    messageForSend: any;
    webSocket: WebSocket;
    logType: any = 'any';
    to: any;
    constructor(private router: Router,
                private service: CommonHttpService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig
    ) {}

    ngOnInit() {
        this.to = this.config.data.uid;
        if (this.to) {
            this.webSocketServe();
        }
    }

    getKey(event) {
        if (event.code == 'Enter' || event.key == 'Enter') {
            if (this.messageForSend) {
                const message = {
                    name: this.myInfo.name,
                    fromOwn: 'own',
                    message: this.messageForSend
                };
                this.webSocket.send(JSON.stringify(message));
                this.chatMessage.push(message);
                this.messageForSend = '';
            }
        }
    }

    ngDoCheck(): void {
        if (window.event) {
            if (window.event.type == 'message') {
                const message = JSON.parse(window.event['data']);
                if (message['message'] != 'joinSocket' && message['message'] != 'closeSocket') {
                    const data = message;
                    data.fromOwn = 'other';
                    this.chatMessage.push(data);
                    localStorage.setItem(
                        // tslint:disable-next-line:prefer-template
                        'chat-message' + this.to,
                        JSON.stringify(this.chatMessage)
                    );
                }
            }
        }
        if (!isNull(document.getElementById('chat'))) {
            document.getElementById('chat').scrollTop =
                document.getElementById('chat').scrollHeight;
        }
    }

    webSocketServe() {
        const webSocket = this.webSocket;
        const chatMessage = [];
        if ('WebSocket' in window) {
            // tslint:disable-next-line:prefer-template
            this.webSocket = new WebSocket('ws://localhost:8081/socket/' + this.myInfo.uid + '/'
                + this.myInfo.name + '/' + this.logType + '/' + this.to);
            // tslint:disable-next-line:only-arrow-functions
            this.webSocket.onopen = function(event) {
                console.log('建立连接');
            };
            // tslint:disable-next-line:only-arrow-functions
            this.webSocket.onclose = function(event) {
                console.log('连接关闭');
            };
            // tslint:disable-next-line:only-arrow-functions
            this.webSocket.onmessage = function(event) {
                return event.data;
            };
            // tslint:disable-next-line:only-arrow-functions
            this.webSocket.onerror = function() {
                alert('websocket通信发生错误！');
            };
        } else {
            alert('该浏览器不支持websocket!');
        }
        if (this.webSocket) {
            // tslint:disable-next-line:only-arrow-functions
            window.onbeforeunload = function() {
                webSocket.close(1000, 'closeSocket');
            };
        }
    }

    ngOnDestroy(): void {
        if (this.webSocket) {
            this.webSocket.close(1000, 'closeSocket');
        }
    }
}
