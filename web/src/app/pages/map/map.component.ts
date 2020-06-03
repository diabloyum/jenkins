import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonConstance } from '../../commom/constance';
import { OrderModel, UserModel } from '../../commom/model/webpage/UserModel';
import { CommonHttpService } from '../../commom/services/common.service';
import { isNull, showError, showSuccess } from '../../commom/utils/util';
declare const AMap: any;
declare const google: any;
declare const AMapUI: any;
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
let map: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    options: any;

    overlays: Array<any>;
    start;
    end;
    isStart = false;
    isEnd = false;
    address = [];
    addressEnd = [];
    add: any = {
        address: '',
        addressEnd: ''
    };
    newData: boolean;
    displayDialog = false;
    data: OrderModel = new OrderModel();
    autocomplete;
    placeSearch;
    driving;
    route;
    userInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    submit: OrderModel = new OrderModel();
    lastStart;
    lastEnd;
    lastRoute;
    constructor(private confirmationService: ConfirmationService,
                private messageService: MessageService,
                private service: CommonHttpService,
                private activeRoute: ActivatedRoute
    ) {}
    ngOnInit() {
        this.submit.uid = this.userInfo.uid;
        this.submit.finish = false;
        map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 11
        });
        map.addControl(new AMap.ToolBar());
        const autoOptions = {
            // 城市，默认全国
            city: '',
            // 使用联想输入的input的id
            input: 'input'
        };
        this.autocomplete = new AMap.Autocomplete(autoOptions);
        this.placeSearch = new AMap.PlaceSearch({
            city: '',
            map
        });
        // tslint:disable-next-line:no-this-assignment
        const that = this;
        AMap.event.addListener(this.autocomplete, 'complete', function(e) {
            if (that.isStart) {
                that.address = [];
                for (const address of e['tips']) {
                    // tslint:disable-next-line:prefer-template
                    that.address = [...that.address, {value: JSON.stringify(address['location']), label: address['district'] + ' ' + address['name']}];
                }
                that.isStart = false;
            }
            if (that.isEnd) {
                that.addressEnd = [];
                for (const address of e['tips']) {
                    // tslint:disable-next-line:prefer-template
                    that.addressEnd = [...that.addressEnd, {value: JSON.stringify(address['location']), label: address['district'] + ' ' + address['name']}];
                }
                that.isEnd = false;
            }
        });
        AMap.event.addListener(this.placeSearch, 'complete', function(e) {
        });
        this.driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
        });
        this.activeRoute.queryParams.subscribe(params => {
            if (!isNull(params)) {
                if (!isNull(params.start) && !isNull(params.end)) {
                    const marker = new AMap.Marker({
                        position: new AMap.LngLat(JSON.parse(params.start).lng, JSON.parse(params.start).lat),
                        title: '起点'
                    });
                    // that.placeSearch.search(address.name);
                    map.add(marker);
                    this.lastStart = marker;
                    const markerEnd = new AMap.Marker({
                        position: new AMap.LngLat(JSON.parse(params.end).lng, JSON.parse(params.end).lat),
                        title: '终点'
                    });
                    // that.placeSearch.search(address.name);
                    map.add(markerEnd);
                    this.lastEnd = markerEnd;
                    const path = [];
                    path.push([JSON.parse(params.start).lng, JSON.parse(params.start).lat]);
                    path.push([JSON.parse(params.end).lng, JSON.parse(params.end).lat]);
                    this.route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE);
                    this.route.search();
                }
                if (!isNull(params.id)) {
                    this.submit.oid = params.id;
                }
            }
        });
    }
    call() {
        if (!isNull(this.add.address.value) && !isNull(this.add.addressEnd.value)) {
            if (isNull(this.submit.oid)) {
                this.service.add('order', this.submit).subscribe(
                    res => {
                        showSuccess(
                            this.messageService,
                            '下单成功',
                            '等待接单',
                            3000
                        );
                    },
                    error => {
                        showError(
                            this.messageService,
                            '失败',
                            error.error.message,
                            3000
                        );
                    }
                );
            } else {
                this.service.update('order', this.submit).subscribe(
                    res => {
                        showSuccess(
                            this.messageService,
                            '修改成功',
                            '',
                            3000
                        );
                    },
                    error => {
                        showError(
                            this.messageService,
                            '失败',
                            error.error.message,
                            3000
                        );
                    }
                );
            }
        }
    }
    showDialogToAdd() {
        if (!isNull(this.add.address.value) && !isNull(this.add.addressEnd.value)) {
            this.submit.start = this.add.address.value;
            this.submit.end = this.add.addressEnd.value;
            this.submit.startname = this.add.address.label;
            this.submit.endname = this.add.addressEnd.label;
            this.newData = true;
            this.data = this.clone(this.submit);
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
    startLocation() {
        // tslint:disable-next-line:no-this-assignment
        const that = this;
        if (isNull(this.add.address.value)) {

        } else {
            if (JSON.parse(this.add.address.value).lng && JSON.parse(this.add.address.value).lat) {
                if (!isNull(that.lastStart)) {
                    map.remove(that.lastStart);
                }
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(JSON.parse(this.add.address.value).lng, JSON.parse(this.add.address.value).lat),
                    title: '起点'
                });
                // that.placeSearch.search(address.name);
                map.add(marker);
                that.lastStart = marker;
                if (!isNull(this.add.address.value) && !isNull(this.add.addressEnd.value)) {
                    this.driving.search([JSON.parse(this.add.address.value).lng, JSON.parse(this.add.address.value).lat],
                        [JSON.parse(this.add.addressEnd.value).lng, JSON.parse(this.add.addressEnd.value).lat], function(status, result) {
                            const path = [];
                            path.push([JSON.parse(that.add.address.value).lng, JSON.parse(that.add.address.value).lat]);
                            path.push([JSON.parse(that.add.addressEnd.value).lng, JSON.parse(that.add.addressEnd.value).lat]);
                            if (!isNull(that.route)) {
                                that.route.destroy();
                            }
                            that.route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE);
                            that.route.search();
                            that.submit.cost = that.countMoney(result.routes[0]['distance']);
                        // 未出错时，result即是对应的路线规划方案
                    });
                }
            }
        }
    }
    endLocation() {
        // tslint:disable-next-line:no-this-assignment
        const that = this;
        if (isNull(this.add.addressEnd.value)) {

        } else {
            if (JSON.parse(this.add.addressEnd.value).lng && JSON.parse(this.add.addressEnd.value).lat) {
                if (!isNull(that.lastEnd)) {
                    map.remove(that.lastEnd);
                }
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(JSON.parse(this.add.addressEnd.value).lng, JSON.parse(this.add.addressEnd.value).lat),
                    title: '终点'
                });
                // that.placeSearch.search(address.name);
                map.add(marker);
                that.lastEnd = marker;
                if (!isNull(this.add.address.value) && !isNull(this.add.addressEnd.value)) {
                    this.driving.search([JSON.parse(this.add.address.value).lng, JSON.parse(this.add.address.value).lat],
                        [JSON.parse(this.add.addressEnd.value).lng, JSON.parse(this.add.addressEnd.value).lat], function(status, result) {
                            const path = [];
                            path.push([JSON.parse(that.add.address.value).lng, JSON.parse(that.add.address.value).lat]);
                            path.push([JSON.parse(that.add.addressEnd.value).lng, JSON.parse(that.add.addressEnd.value).lat]);
                            if (!isNull(that.route)) {
                                that.route.destroy();
                            }
                            that.route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE);
                            that.route.search();
                            that.submit.cost = that.countMoney(result.routes[0]['distance']);
                        // 未出错时，result即是对应的路线规划方案
                    });
                }
            }
        }
    }
    searchCity() {
        if (isNull(this.start)) {
            this.address = [];
        } else {
            this.isStart = true;
            this.autocomplete.search(this.start);
        }
    }
    searchCityEnd() {
        if (isNull(this.end)) {
            this.addressEnd = [];
        } else {
            this.isEnd = true;
            this.autocomplete.search(this.end);
        }
    }
    countMoney(distance) {
        if (Number(distance) <= 2000) {
            return 10;
            // tslint:disable-next-line:unnecessary-else
        }
        const other: number = (Number(distance) - 2000) / 1000 * 3 + 10;

        return Math.floor(other);
    }
}
