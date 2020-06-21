
import { AfterViewInit, Component, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, ScrollPanel } from 'primeng/primeng';
import { ChatComponent } from '../commom/chat/chat.component';
import { CommonConstance } from '../commom/constance';
import { LoadingService } from '../commom/services/util';
import {CommonHttpService} from "../commom/services/common.service";

enum MenuOrientation {
    STATIC,
    OVERLAY,
    SLIM,
    HORIZONTAL
}

@Component({

    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    encapsulation: ViewEncapsulation.Emulated

})
export class PagesComponent implements AfterViewInit {

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu = true;

    profileMode = 'top';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    @ViewChild('layoutMenuScroller', {static: false}) layoutMenuScrollerViewChild: ScrollPanel;
    allUserInfo = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO));
    myId = localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_ID);
    constructor(
        public renderer: Renderer2,
        private dialogService: DialogService,
        private readonly loaderService: LoadingService,
        private readonly service: CommonHttpService,
        private readonly router: Router) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 100);
        // this.loaderService.display(false);
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                this.layoutMenuScrollerViewChild.moveBar();
            }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;
        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }
        event.preventDefault();
    }
    onOpenUserState(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }
    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;

        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }

    /**
     * Top bar item click
     *
     * @param event click event
     * @param action the action content
     */
    onTopbarSubItemClick(event, action) {
        event.preventDefault();
        if (action === 'navigateToProfile') {
            this.router.navigate(['/pages/myprofile']);
        }
    }

    /**
     * Logout user
     *
     * @param $event
     */
    onLogoutClick($event: MouseEvent) {
        localStorage.removeItem(CommonConstance.LOCALSTORAGE.TOKEN);
        this.router.navigate(['']);
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
}
