
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstance } from '../../commom/constance';
import { PagesComponent } from '../pages.component';

@Component({
    selector: 'pages-topbar',
    templateUrl: 'pages.topbar.component.html'
})
export class PagesTopBarComponent implements OnInit {

    user: any;
    currentLanguage: string;
    language: string;

    constructor(
        public pagesComponent: PagesComponent,
        public translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.USER_LOCALSTPRAGE));
        this.currentLanguage = 'en';
        this.language = '中文';
        if (this.translateService.currentLang) {
            if (this.translateService.currentLang === 'zh') {
                this.language = 'English';
                this.currentLanguage = 'zh';
            }
        }
    }

    /**
     * Change language
     */
    changeLanguage() {
        if (this.currentLanguage === 'zh') {
            this.translateService.use('en');
            this.language = '中文';
            this.currentLanguage = 'en';
            localStorage.setItem(CommonConstance.LOCALSTORAGE.DEFAULT_LANG, 'en');
        } else {
            this.translateService.use('zh');
            this.language = 'English';
            this.currentLanguage = 'zh';
            localStorage.setItem(CommonConstance.LOCALSTORAGE.DEFAULT_LANG, 'zh');
        }
    }

}
