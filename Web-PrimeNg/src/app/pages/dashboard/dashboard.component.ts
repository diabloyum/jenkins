import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from 'leaflet';
import { ConfirmationService, DialogService, MessageService } from 'primeng/api';
import { ChatComponent } from '../../commom/chat/chat.component';
import { CommonConstance } from '../../commom/constance';
import { RecordModel, UserModel } from '../../commom/model/webpage/UserModel';
import { activeOptions, format, parseStatus } from '../../commom/options';
import { CommonHttpService } from '../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../commom/utils/util';
import win = Browser.win;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, DoCheck {
    select: Array<string> = [];
    user: any;
    events: any;
    userCount: number;
    // tslint:disable-next-line:variable-name
    allUserInfo: Array<UserModel> = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO));
    myUserInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    // tslint:disable-next-line:variable-name
    chat_list: any = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_CHAT_LOCALSTPRAGE));
    userId: any = localStorage.getItem('bm-userId');
    chatMessage = [];
    messageForSend: any;
    task: any = {};
    webSocket: WebSocket;
    to: any;
    search;
    showUser = [];
    isDashboard = true;
    uploadedFiles: Array<any> = [];
    dicom: Array<any> = [];
    patient;
    showPatient: Array<any> = [];
    constructor(private service: CommonHttpService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                public dialogService: DialogService,
                private route: Router
    ) {
    }

    ngOnInit() {
        this.webSocketServe('');
        this.showUser = this.allUserInfo;
        if (this.chat_list) {
            for (const i of this.chat_list) {
                this.chatMessage.push(i);
            }
        }
        this.userCount = this.allUserInfo.length;
        this.getDicomList();
    }

    getKey(event) {
        if (event.code == 'Enter' || event.key == 'Enter') {
            if (this.messageForSend) {
                if (this.messageForSend) {
                    // this.userHttpService.send.emit(this.messageForSend);
                    const message = {
                        name: this.myUserInfo.name,
                        fromOwn: 'own',
                        message: this.messageForSend
                    };
                    this.webSocket.send(JSON.stringify(message));
                    this.chatMessage.push(message);
                    this.messageForSend = '';
                }
            }
        }
    }
    searchPatient() {
        this.showPatient = [];
        if (isNull(this.patient)) {
            this.showPatient = this.dicom;
        } else {
            for (const i of this.dicom) {
                const name: string = i['patientModelList'][0].name;
                if (name.includes(this.patient)) {
                    this.showPatient.push(i);
                }
            }
        }
    }
    searchUser() {
        this.showUser = [];
        if (isNull(this.search)) {
            this.showUser = this.allUserInfo;
        } else {
            for (const i of this.allUserInfo) {
                const name: string = i.name;
                if (name.includes(this.search)) {
                    this.showUser.push(i);
                }
            }
        }
    }
    ngDoCheck(): void {
        if (window.event) {
            if (window.event.type == 'message') {
                const message = JSON.parse(window.event['data']);
                if (this.isDashboard && message['message'] != 'joinSocket' && message['message'] != 'closeSocket') {
                    const text: string = message['message'];
                    if (text.includes('toUser')) {
                        const finalMessage = JSON.parse(message['message']);
                        if (finalMessage['message'] == 'call' && finalMessage['toUser'] == this.userId) {
                            this.confirmationService.confirm({
                                // tslint:disable-next-line:prefer-template
                                message: '是否与' + finalMessage['name'] + '视频?',
                                icon: 'pi pi-exclamation-triangle',
                                accept: () => {
                                    this.route.navigate(['/pages/video'], {
                                        queryParams: {
                                            name: finalMessage['name'],
                                            id: finalMessage['from'],
                                            own: 0
                                        }
                                    });
                                },
                                // tslint:disable-next-line:no-empty
                                reject: () => {
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    getDicomList() {
        this.service.get('/dicom/all').subscribe(
            (res: Array<any>) => {
                this.dicom = res;
                this.showPatient = res;
            },
            error => {
                this.showError(error);
            }
        );
    }
    onOpenPhoto(item) {
        this.route.navigate(['/pages/photo'], {
            queryParams: {
                value: JSON.stringify(item)
            }
        });
    }
    onOpenChat(user) {
        const ref = this.dialogService.open(ChatComponent, {
            // tslint:disable-next-line:prefer-template
            header: '正在和' + user.name + '聊天',
            width: '60%',
            contentStyle: {'max-height': '350px', overflow: 'auto'},
            style: { top: '200px'},
            data: user
        });
    }
    showSuccess() {
        showSuccess(
            this.messageService,
            '成功',
            '',
            3000
        );
    }
    showError(error) {
        showError(
            this.messageService,
            '失败',
            error.error.message,
            3000
        );
    }
    webSocketServe(uid) {
        const webSocket = this.webSocket;
        const chatMessage = [];
        if ('WebSocket' in window) {
            // tslint:disable-next-line:prefer-template
            this.webSocket = new WebSocket('ws://localhost:8081/socket/' + this.myUserInfo.uid + '/'
                + this.myUserInfo.name + '/own/' + null);
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
    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.getDicomList();
    }
    ngOnDestroy() {
        if (this.webSocket) {
            this.webSocket.close(1000, 'closeSocket');
        }
    }
}
