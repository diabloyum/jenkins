import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonConstance } from '../../commom/constance';
import { parseStatus, statusOptions } from '../../commom/options';

import { CommonHttpService } from '../../commom/services/common.service';


import { Table } from 'primeng/table';
import { ProductInfo } from '../../commom/model/webpage/UserModel';
// tslint:disable-next-line:no-duplicate-imports
import { showError, showSuccess } from '../../commom/utils/util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    loading: boolean;
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore
    // tslint:disable-next-line:prefer-inline-decorator
    @ViewChild('dt1')
    table: Table;
    filter: any = {};
    blockedDocument = false;
    datas: Array<ProductInfo>;
    data: ProductInfo = new ProductInfo();
    cols: Array<any>;
    displayDialog = false;
    selectedData: ProductInfo;
    newData: boolean;
    statusOptions = statusOptions;
    prodectInfo: ProductInfo = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.PRODUCT_INFO));
    constructor(
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private service: CommonHttpService,
      private route: Router
  ) { }
    initCols() {
        this.cols = [
            {field: 'price', header: '姓名'},
            {field: 'product_Id', header: '账户'},
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
        this.service.get('/product_info/').subscribe(
            (res: Array<ProductInfo>) => {
                this.datas = res;
            },
            error => {
                this.showError(error);
            }
        );
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
