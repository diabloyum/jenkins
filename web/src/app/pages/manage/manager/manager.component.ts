import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonConstance } from '../../../commom/constance';
import { OrderModel, UserModel } from '../../../commom/model/webpage/UserModel';
import { CommonHttpService } from '../../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../../commom/utils/util';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
    loading: boolean;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:prefer-inline-decorator
    @ViewChild('dt1')
    table: Table;
    filter: any = {};
    blockedDocument = false;
    datas: Array<OrderModel>;
    data: OrderModel = new OrderModel();
    cols: Array<any>;
    displayDialog = false;
    selectedData: OrderModel;
    newData: boolean;
    userInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    allUserInfo: Array<UserModel> = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO));
    constructor(private route: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private service: CommonHttpService
    ) {
    }
    initCols() {
        this.cols = [
            {field: 'showUser', header: '评价人'},
            {field: 'showDriver', header: '司机'},
            {field: 'comment', header: '详情'}
        ];
    }

    ngOnInit() {
        this.initCols();
        this.search();
    }

    search() {
        this.service.get('/order/').subscribe(
            (res: Array<OrderModel>) => {
                this.datas = [];
                for (const i of res) {
                    for (const j of this.allUserInfo) {
                        if (i.uid == j.uid) {
                            i.showUser = j.name;
                        }
                        if (i.driver == j.uid) {
                            i.showDriver = j.name;
                        }
                    }
                    if (!isNull(i.comment) && !isNull(i.driver)) {
                        this.datas.push(i);
                    }
                }
            },
            error => {
                this.showError(error);
            }
        );
    }

    delete() {
        // tslint:disable-next-line:prefer-template
        this.service.put('/order/comment?id=' + this.selectedData.oid, '').subscribe(
            res => {
                this.showSuccess();
                this.search();
            },
            error => {
                this.showError(error);
            }
        );
    }
    onRowSelect(event) {
        if (this.userInfo.act == 0) {
            this.newData = false;
            this.data = this.clone(event.data);
            this.displayDialog = true;
        }
    }

    clone(c: OrderModel): OrderModel {
        const data = new OrderModel();
        for (const prop in c) {
            data[prop] = c[prop];
        }

        return data;
    }
    showDialogToAdd() {
        this.newData = true;
        this.data = new OrderModel();
        this.displayDialog = true;
    }
    // tslint:disable-next-line:no-empty
    upload() {}
    showSuccess() {
        showSuccess(
            this.messageService,
            '成功',
            '',
            3000
        );
        this.data = new OrderModel();
        this.displayDialog = false;
    }
    showError(error) {
        showError(
            this.messageService,
            '失败',
            error.error.message,
            3000
        );
        this.data = new OrderModel();
        this.displayDialog = false;
    }
}
