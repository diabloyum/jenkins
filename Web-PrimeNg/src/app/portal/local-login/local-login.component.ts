
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { DialogService, MessageService } from 'primeng/api';
import { CommonConstance } from '../../commom/constance';
import { ReferenceHttpService } from '../../commom/services';
import { CommonHttpService } from '../../commom/services/common.service';
import { isNull, showError } from '../../commom/utils/util';
import { ForgetPasswordComponent } from '../forget/forget-password.component';


@Component({
    selector: 'local-login-component',
    styleUrls: ['./local-login.component.scss'],
    templateUrl: './local-login.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class LocalLoginComponent implements OnInit {

    user: any = {};
    loginForm: FormGroup;
    showErrorMessage = false;
    source: Array<any> = [];
    param = '';
    blockedLoginBtn = false;
    loginOptions: any = {
        account: '',
        passwowd: '',
        uid: ''
    };
    userOption: any = {
        //uid: '',
        account: '',
        password: ''
    };
    companyId;
    // convenience getter for easy access to form fields
    get loginUser() {
        return this.loginForm.controls;
    }
    constructor(private readonly router: Router,
                private readonly fb: FormBuilder,
                private readonly referenceHttpService: ReferenceHttpService,
                private readonly activeRoute: ActivatedRoute,
                private readonly translateService: TranslateService,
                private _messageService: MessageService,
                public dialogService: DialogService,
                private readonly service: CommonHttpService
    ) { }

    ngOnInit() {
        // this.activeRoute.queryParams.subscribe(params => {
        //     if (params.company) {
        //         this.companyId = params.company;
        //     }
        // });
        this.loginForm = this.fb.group({
            account: ['', Validators.required],
            password: ['', Validators.required]
        });
        // if (localStorage.getItem('bm-username')) {
        //     this.loginForm.controls.account.patchValue(localStorage.getItem('bm-username'));
        // }
        this.activeRoute.queryParams.subscribe((params: Params) => {
            // get param direct value
            this.param = params['direct'];
            // set direct value into localstorage
            this.param ? localStorage.setItem('direct', this.param) : this.param = 'none';
            // set source value into localstorage
            params['source'] ? localStorage.setItem('source', params['source']) : localStorage.setItem('source', 'web');
        });
    }

    onLoginClick() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        // localStorage.removeItem("bm-oauth-token");
        localStorage.removeItem('bm-username');
        localStorage.setItem('bm-username', this.loginUser['account'].value);
        this.blockedLoginBtn = true;
        this.userOption.account = this.loginForm.controls.account.value;
        this.userOption.password = this.loginForm.controls.password.value;
        // get the token by username and password
        this.service.regist('/user/login', this.userOption).subscribe(async token => {
                localStorage.setItem(CommonConstance.LOCALSTORAGE.TOKEN, String(1));
                this.loginOptions.userId = token['uid'];
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_ID, this.loginOptions.userId);
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_NAME, token['name']);
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_INFO, JSON.stringify(token));
                const all = await this.service.getAllUser('user');
                localStorage.setItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO, JSON.stringify(all));
                this.router.navigate(['/pages/dashboard']);
            },
            error => {
                this.showError(error);
            });
    }

    showError(error) {
        showError(
            this._messageService,
            'Fail',
            error.error.message,
            3000
        );
        this.blockedLoginBtn = false;
    }

    onRegistration() {
        this.router.navigate(['/portal/registration']);
    }

    openForgetPasswordModal() {
        const ref = this.dialogService.open(ForgetPasswordComponent, {
            header: '重置密码',
            width: '60%',
            contentStyle: {'max-height': '350px', overflow: 'auto'},
            style: {top: '200px'}
        });
    }
}
