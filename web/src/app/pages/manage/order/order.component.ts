import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonConstance } from '../../../commom/constance';
import { OrderModel, UserModel } from '../../../commom/model/webpage/UserModel';
import { finishOptions, parseStatus } from '../../../commom/options';
import { CommonHttpService } from '../../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../../commom/utils/util';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
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
    finishOptions = finishOptions;
    driver = [];
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
            {field: 'showUser', header: '姓名'},
            {field: 'showDriver', header: '司机'},
            {field: 'startname', header: '起始位置'},
            {field: 'endname', header: '到达地点'},
            {field: 'cost', header: '花费'},
            {field: 'comment', header: '评价'},
            {field: 'showFinish', header: '是否完成'}
        ];
    }

    ngOnInit() {
        for (const i of this.allUserInfo) {
            if (this.userInfo.act == 1 && i.uid == this.userInfo.uid) {
                this.driver = [...this.driver, {value: i.uid, label: i.name}];
            }
            if (this.userInfo.act == 0 && i.act == 1) {
                this.driver = [...this.driver, {value: i.uid, label: i.name}];
            }

        }
        this.initCols();
        this.search();
    }

    search() {
        this.service.get('/order/').subscribe(
            (res: Array<OrderModel>) => {
                this.datas = [];
                for (const i of res) {
                    if (this.userInfo.act != 2 || i.uid == this.userInfo.uid) {

                        for (const j of this.allUserInfo) {
                            if (i.uid == j.uid) {
                                i.showUser = j.name;
                            }
                            if (i.driver == j.uid) {
                                i.showDriver = j.name;
                            }
                        }
                        i.showFinish = parseStatus(i.finish, finishOptions);
                        this.datas.push(i);
                    }
                }
            },
            error => {
                this.showError(error);
            }
        );
    }
    edit() {
        this.route.navigate(['/pages/dashboard'], {
            queryParams: {
                id: this.data.oid
            }
        });
    }
    save() {
        if (isNull(this.data.uid)) {
            this.data.uid = this.userInfo.uid;
        }
        if (this.newData) {
            this.service.add('order', this.data).subscribe(
                res => {
                    this.showSuccess();
                    this.search();
                },
                error => {
                    this.showError(error);
                }
            );
        } else {this.service.update('order', this.data).subscribe(
            res => {
                this.showSuccess();
                this.search();
            },
            error => {
                this.showError(error);
            }
        ); }
    }
    detail() {
        this.route.navigate(['/pages/dashboard'], {
            queryParams: {
                start: this.data.start,
                end: this.data.end
            }
        });
    }
    delete() {
        this.service.delete('order', this.selectedData.oid).subscribe(
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
        this.displayDialog = false;
        this.data = new OrderModel();
    }
    showError(error) {
        showError(
            this.messageService,
            '失败',
            error.error.message,
            3000
        );
        this.displayDialog = false;
        this.data = new OrderModel();
    }
}
