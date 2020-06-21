import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { CommonConstance } from '../../commom/constance';
import { UserModel } from '../../commom/model/webpage/UserModel';
import { PagesComponent } from '../pages.component';

@Component({
    selector: 'pages-menu',
    // tslint:disable-next-line:component-max-inline-declarations
    template: `
        <ul
            pages-submenu
            [item]="model"
            root="true"
            class="layout-menu layout-main-menu clearfix"
            [reset]="reset"
            visible="true"
            parentActive="true"
        ></ul>
    `
})
export class PagesMenuComponent implements OnInit, OnDestroy {
    @Input() reset: boolean;

    @Input() menu: any;

    model: Array<any>;

    theme = 'blue';

    layout = 'Dark Grey';

    version = 'v3';
    userManagerMenu: any = [
        {
            label: '仪表盘',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '首页', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/dashboard']}
            ]
        },
        {
            label: '目录样式', icon: 'fa fa-fw fa-bars', badge: '8',
            items: [
                {label: '静态目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToStaticMenu()},
                {label: '隐藏目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToOverlayMenu()},
                {label: '缩小目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToSlimMenu()},
                {label: '水平目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToHorizontalMenu()},
                {label: 'Inline Profile', icon: 'fa fa-sun-o fa-fw', command: () => this.app.profileMode = 'inline'},
                {label: 'Top Profile', icon: 'fa fa-moon-o fa-fw', command: () => this.app.profileMode = 'top'},
                {label: '白天模式', icon: 'fa fa-sun-o fa-fw', command: () => this.app.darkMenu = false},
                {label: '黑夜模式', icon: 'fa fa-moon-o fa-fw', command: () => this.app.darkMenu = true}
            ]
        },
        {
            label: '上传商品',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '上传商品', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/upload']}
            ]
        },
        {
            label: '订单管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '订单详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/order']}
            ]
        },
        {
            label: '评价管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '评价详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/manager']}
            ]
        },
        {
            label: '车辆管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '车辆详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/check']}
            ]
        },
        {
            label: '个人信息管理',
            icon: 'fa fa-fw fa-home',
            routerLink: ['/pages/myprofile']
        },
        {
            label: '后台管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '用户管理', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/user']}
            ]
        }
    ];
    userMenu: any = [
        {
            label: '仪表盘',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '首页', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/dashboard']}
            ]
        },
        {
            label: '目录样式', icon: 'fa fa-fw fa-bars', badge: '8',
            items: [
                {label: '静态目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToStaticMenu()},
                {label: '隐藏目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToOverlayMenu()},
                {label: '缩小目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToSlimMenu()},
                {label: '水平目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToHorizontalMenu()},
                {label: 'Inline Profile', icon: 'fa fa-sun-o fa-fw', command: () => this.app.profileMode = 'inline'},
                {label: 'Top Profile', icon: 'fa fa-moon-o fa-fw', command: () => this.app.profileMode = 'top'},
                {label: '白天模式', icon: 'fa fa-sun-o fa-fw', command: () => this.app.darkMenu = false},
                {label: '黑夜模式', icon: 'fa fa-moon-o fa-fw', command: () => this.app.darkMenu = true}
            ]
        },
        {
            label: '订单管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '订单详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/order']}
            ]
        },
        {
            label: '上传商品',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '上传商品', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/upload']}
            ]
        },
        {
            label: '个人信息管理',
            icon: 'fa fa-fw fa-home',
            routerLink: ['/pages/myprofile']
        }
    ];
    driverMenu: any = [
        {
            label: '仪表盘',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '首页', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/dashboard']}
            ]
        },
        {
            label: '目录样式', icon: 'fa fa-fw fa-bars', badge: '8',
            items: [
                {label: '静态目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToStaticMenu()},
                {label: '隐藏目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToOverlayMenu()},
                {label: '缩小目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToSlimMenu()},
                {label: '水平目录', icon: 'fa fa-fw fa-bars', command: () => this.app.changeToHorizontalMenu()},
                {label: 'Inline Profile', icon: 'fa fa-sun-o fa-fw', command: () => this.app.profileMode = 'inline'},
                {label: 'Top Profile', icon: 'fa fa-moon-o fa-fw', command: () => this.app.profileMode = 'top'},
                {label: '白天模式', icon: 'fa fa-sun-o fa-fw', command: () => this.app.darkMenu = false},
                {label: '黑夜模式', icon: 'fa fa-moon-o fa-fw', command: () => this.app.darkMenu = true}
            ]
        },
        {
            label: '上传商品',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '上传商品', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/upload']}
            ]
        },
        {
            label: '订单管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '订单详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/order']}
            ]
        },
        {
            label: '评价管理',
            icon: 'fa fa-fw fa-home',
            items: [
                {label: '评价详情', icon: 'fa fa-fw fa-bars', routerLink: ['/pages/manage/manager']}
            ]
        },
        {
            label: '个人信息管理',
            icon: 'fa fa-fw fa-home',
            routerLink: ['/pages/myprofile']
        }
    ];
    user: any;
    manager: any;
    userInfo: UserModel = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_INFO));
    constructor(
        public pagesComponent: PagesComponent,
        // private userHttpService: UserHttpService,
        public app: PagesComponent
        // private userInfoHttpService: UserInfoHttpService
    ) {}

    ngOnInit() {
        this.changeLayout('darkgrey');
        if (this.userInfo.act == 0) {
            this.model = this.userManagerMenu;
        } else if (this.userInfo.act == 1) {
            this.model = this.driverMenu;
        } else {
            this.model = this.userMenu;
        }
    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;

        if (this.version === 'v3') {
            // tslint:disable-next-line:prefer-template
            layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
        } else {
            // tslint:disable-next-line:prefer-template
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = false;
        }
    }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;

        if (this.version === 'v3') {
            // tslint:disable-next-line:prefer-template
            themeLink.href = 'assets/theme/theme-' + theme + '.css';
        } else {
            // tslint:disable-next-line:prefer-template
            themeLink.href = 'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }
}

@Component({
    // tslint:disable-next-line:comment-type
    /* tslint:disable:component-selector */
    selector: '[pages-submenu]',
    // tslint:disable-next-line:comment-type
    /* tslint:enable:component-selector */
    templateUrl: 'pages.sub-menu.component.html',
    animations: [
        trigger('children', [
            state(
                'hiddenAnimated',
                style({
                    height: '0px'
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*'
                })
            ),
            state(
                'visible',
                style({
                    display: 'block'
                })
            ),
            state(
                'hidden',
                style({
                    display: 'none'
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            )
        ])
    ]
})
export class PagesSubMenuComponent {

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (
            this._reset &&
            (this.pagesComponent.isHorizontal() || this.pagesComponent.isSlim())
        ) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;
    activeIndex: number;

    _reset: boolean;

    _parentActive: boolean;

    constructor(public pagesComponent: PagesComponent) {
    }

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.pagesComponent.menuHoverActive = !this.pagesComponent
                .menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();

            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = this.activeIndex === index ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                this.pagesComponent.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (
                this.pagesComponent.isHorizontal() ||
                this.pagesComponent.isSlim()
            ) {
                this.pagesComponent.resetMenu = true;
            } else {
                this.pagesComponent.resetMenu = false;
            }

            this.pagesComponent.overlayMenuActive = false;
            this.pagesComponent.staticMenuMobileActive = false;
            this.pagesComponent.menuHoverActive = !this.pagesComponent
                .menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (
            this.root &&
            this.pagesComponent.menuHoverActive &&
            (this.pagesComponent.isHorizontal() ||
                this.pagesComponent.isSlim()) &&
            !this.pagesComponent.isMobile() &&
            !this.pagesComponent.isTablet()
        ) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }
}
