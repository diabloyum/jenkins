import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/primeng';
import { CommonConstance } from '../../commom/constance';
import { statusOptions } from '../../commom/options';
import { CommonHttpService } from '../../commom/services/common.service';
import {
    emailValidator, isNull,
    showError,
    trimValidator
} from '../../commom/utils/util';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    blockedLoginBtn = false;
    myForm: FormGroup;
    company: any = {};
    add: any = {};
    statusOptions = statusOptions;
    constructor(
        private route: Router,
        private fb: FormBuilder,
        private userHttpService: CommonHttpService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    // tslint:disable-next-line:no-async-without-await
    async onSubmit() {
        this.blockedLoginBtn = true;
        this.userHttpService.regist('/user/regist', this.add).subscribe(
            async res => {
                this.blockedLoginBtn = false;
                localStorage.setItem(CommonConstance.LOCALSTORAGE.TOKEN, String(1));
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_ID, res['uid']);
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_NAME, res['name']);
                localStorage.setItem(CommonConstance.LOCALSTORAGE.USER_INFO, JSON.stringify(res));
                const all = await this.userHttpService.getAllUser('user');
                localStorage.setItem(CommonConstance.LOCALSTORAGE.ALL_USER_INFO, JSON.stringify(all));
                this.route.navigate(['/pages/dashboard']);
            },
            error => {
                this.blockedLoginBtn = false;
                showError(
                    this.messageService,
                    'Fail',
                    error.error.message,
                    3000
                );
            });
    }

    onCancel() {
        this.route.navigate(['/portal/login']);
    }

    valid() {
        if (!this.myForm.valid || this.blockedLoginBtn) {
            return true;
            // tslint:disable-next-line:unnecessary-else
        } else {
            return false;
        }
    }
    initForm() {
        this.myForm = this.fb.group(
            {
                name: ['', Validators.compose([trimValidator, Validators.required])],
                act: ['', Validators.compose([trimValidator, Validators.required])],
                account: ['', Validators.compose([trimValidator, Validators.required])],
                password: ['', Validators.compose([trimValidator, Validators.required])]
            }
        );
    }
}
