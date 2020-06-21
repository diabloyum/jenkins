import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonConstance } from '../../commom/constance';
import { UserModel } from '../../commom/model/webpage/UserModel';
import { CommonHttpService } from '../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../commom/utils/util';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
    add: UserModel = new UserModel();
    button = false;
    userInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    money;
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private service: CommonHttpService,
        private route: Router
    ) {
    }

    ngOnInit() {
        this.add.uid = this.userInfo.uid;
        this.add.name = this.userInfo.name;
        this.add.account = this.userInfo.account;
        this.add.cid = this.userInfo.cid;
        this.add.car = this.userInfo.car;
        this.add.address = this.userInfo.address;
    }

    onSubmit() {
        this.button = true;
        this.insert();
    }

    insert() {
        if (!this.add.password) {
            this.add.password = this.userInfo.password;
        }
        this.service.update('user', this.add).subscribe(
            res => {
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_INFO, JSON.stringify(res));
                this.userInfo = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
                showSuccess(
                    this.messageService,
                    '修改成功',
                    '',
                    3000
                );
                this.add.password = '';
                this.button = false;
            },
            error => {
                this.add.name = this.userInfo.name;
                this.add.account = this.userInfo.account;
                this.showError(error);
            }
        );
    }
    onDelete() {
        const submit: any = {
            uid: this.userInfo.uid,
            active: false
        };
        this.service.update('user', submit).subscribe(
            res => {
                localStorage.removeItem(CommonConstance.LOCALSTORAGE.USER_INFO);
                localStorage.removeItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO);
                // tslint:disable-next-line:ban-ts-ignore
                // @ts-ignore
                this.route.navigate('');
            },
            error => {
                this.showError(error);
            }
        );
    }
    onSubmitMoney() {
        this.money = this.money.toString().replace(/[^0-9]/gi, '');
        if (!isNull(this.money)) {
            const submit: any = {
                uid: this.userInfo.uid,
                money: Number(this.money) + Number(this.userInfo.money)
            };
            this.service.update('user', submit).subscribe(
                res => {
                    localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_INFO, JSON.stringify(res));
                    this.userInfo = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
                    showSuccess(
                        this.messageService,
                        '充值成功',
                        '',
                        3000
                    );
                },
                error => {
                    this.showError(error);
                }
            );
        }
    }
    showError(error) {
        this.button = false;
        showError(
            this.messageService,
            '添加失败',
            error.error.message,
            3000
        );
    }
    validateMoney() {
        return isNull(this.money);
    }
    validate() {
        if (!this.add.account || this.button || !this.add.name) {
            return true;
            // tslint:disable-next-line:unnecessary-else
        } else {
            return false;
        }
    }

}
