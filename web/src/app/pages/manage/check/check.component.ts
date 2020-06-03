import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonConstance } from '../../../commom/constance';
import { OrderModel, UserModel } from '../../../commom/model/webpage/UserModel';
import { parseStatus, useOptions } from '../../../commom/options';
import { CommonHttpService } from '../../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../../commom/utils/util';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
    loading: boolean;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:prefer-inline-decorator
    @ViewChild('dt1')
    table: Table;
    filter: any = {};
    blockedDocument = false;
    datas: Array<UserModel>;
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
            {field: 'name', header: '车主'},
            {field: 'car', header: '车牌号'},
            {field: 'showFinish', header: '是否占用'}
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
                for (const i of this.allUserInfo) {
                    for (const j of res) {
                        if (j.driver == i.uid) {
                            if (isNull(i.showFinish) || i.showFinish == '可用') {
                                i.showFinish = parseStatus(j.finish, useOptions);
                            }
                        }
                    }
                    if (i.act == 1) {
                        if (isNull(i.showFinish)) {
                            i.showFinish = '可用';
                        }
                        this.datas.push(i);
                    }
                }
            },
            error => {
                this.showError(error);
            }
        );
    }

    onRowSelect(event) {
        this.newData = false;
        this.data = this.clone(event.data);
        this.displayDialog = true;
    }

    clone(c: OrderModel): OrderModel {
        const data = new OrderModel();
        for (const prop in c) {
            data[prop] = c[prop];
        }

        return data;
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
