import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonConstance } from '../../../commom/constance';
import { UserModel } from '../../../commom/model/webpage/UserModel';
import { parseStatus, statusOptions } from '../../../commom/options';
import { CommonHttpService } from '../../../commom/services/common.service';
import { showError, showSuccess } from '../../../commom/utils/util';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    loading: boolean;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:prefer-inline-decorator
    @ViewChild('dt1')
    table: Table;
    filter: any = {};
    blockedDocument = false;
    datas: Array<UserModel>;
    data: UserModel = new UserModel();
    cols: Array<any>;
    displayDialog = false;
    selectedData: UserModel;
    newData: boolean;
    userInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    statusOptions = statusOptions;
    constructor(private route: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private service: CommonHttpService
    ) {
    }
    initCols() {
        this.cols = [
            {field: 'name', header: '姓名'},
            {field: 'account', header: '账户'},
            {field: 'showAct', header: '角色'},
            {field: 'car', header: '车牌'},
            {field: 'address', header: '地址'}
        ];
    }

    ngOnInit() {
        this.initCols();
        this.search();
    }

    search() {
        this.service.get('/user/').subscribe(
            (res: Array<UserModel>) => {
                for (const i of res) {
                    i.showAct = parseStatus(i.act, statusOptions);
                    i.password = '';
                }
                this.datas = res;
            },
            error => {
                this.showError(error);
            }
        );
    }
    save() {
        if (this.newData) {
            if (!this.data.act) {
                this.data.act = 1;
            }
            this.service.add('user', this.data).subscribe(
                res => {
                    this.showSuccess();
                    this.search();
                },
                error => {
                    this.showError(error);
                }
            );
        } else {this.service.update('user', this.data).subscribe(
            res => {
                this.showSuccess();
                this.search();
            },
            error => {
                this.showError(error);
            }
        ); }
    }

    delete() {
        const submit: any = {
            uid: this.userInfo.uid,
            active: false
        };
        this.service.update('user', submit).subscribe(
            res => {
                this.showSuccess();
                this.search();
            },
            error => {
                this.showError(error);
            }
        );
        // this.service.delete('user', this.selectedData.uid).subscribe(
        //     res => {
        //         this.showSuccess();
        //         this.search();
        //     },
        //     error => {
        //         this.showError(error);
        //     }
        // );
    }
    onRowSelect(event) {
        this.newData = false;
        this.data = this.clone(event.data);
        this.displayDialog = true;
    }

    clone(c: UserModel): UserModel {
        const data = new UserModel();
        for (const prop in c) {
            data[prop] = c[prop];
        }

        return data;
    }
    showDialogToAdd() {
        this.newData = true;
        this.data = new UserModel();
        this.displayDialog = true;
    }
    showSuccess() {
        showSuccess(
            this.messageService,
            '成功',
            '',
            3000
        );
        this.data = null;
        this.displayDialog = false;
    }
    showError(error) {
        showError(
            this.messageService,
            '失败',
            error.error.message,
            3000
        );
        this.data = null;
        this.displayDialog = false;
    }
}
