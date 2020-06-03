import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef, MenuItem, MessageService } from 'primeng/primeng';
import { CommonHttpService } from '../../commom/services/common.service';
import { numberValidator, showError, trimValidator } from '../../commom/utils/util';

@Component({
    selector: 'forget-password-component',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ForgetPasswordComponent implements OnInit {
    items: Array<MenuItem>;
    activeIndex = 0;

    add: any = {
        account: '',
        password: ''
    };
    myGroup: FormGroup;
    blockUI = false;
    disableNext = false;
    userId: any;
    constructor(
        private route: Router,
        private fb: FormBuilder,
        private userHttpService: CommonHttpService,
        private messageService: MessageService,
        public ref: DynamicDialogRef
    ) {
    }

    ngOnInit() {
        this.initStep();
        this.initForm(0);
    }

    initStep() {
        this.items = [{
            label: '填写账户信息',
            command: (event: any) => {
                this.activeIndex = 0;
                this.messageService.add({severity: 'info', summary: 'First Step', detail: event.item.label});
            }
        },
                      {
                label: '填写验证码及新密码',
                command: (event: any) => {
                    this.activeIndex = 1;
                    this.messageService.add({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
                }
            },
                      {
                label: '修改成功',
                command: (event: any) => {
                    this.activeIndex = 2;
                    this.messageService.add({severity: 'info', summary: 'Pay with CC', detail: event.item.label});
                }
            }
        ];
    }

    stepWorkFlow() {
        if (this.activeIndex < 2) {
            if (!this.myGroup.valid || this.disableNext) {
                return true;
                // tslint:disable-next-line:unnecessary-else
            } else {
                return false;
            }
        }

        return false;
    }

    step() {
        switch (this.activeIndex) {
            case 0:
                this.stepOne();
                break;
            case 1:
                this.stepTwo();
                break;
            case 2:
                this.BlockUI();
                this.route.navigate(['/pages/dashboard']);
                this.ref.close();
                break;
            default: break;
        }
    }

    initForm(stepIndex) {
        switch (stepIndex) {
            case 0:
                this.myGroup = this.fb.group(
                    {
                        account: ['', Validators.compose([trimValidator, Validators.required])]
                    }
                );
                break;
            case 1:
                this.myGroup = this.fb.group(
                    {
                        password: ['', Validators.compose([trimValidator, Validators.required])]
                    }
                );
                break;
            default:
                break;
        }
    }

    stepOne() {
        this.BlockUI();
        // tslint:disable-next-line:prefer-template
        this.userHttpService.regist('/user/user', this.add).subscribe(
            res => {
                this.activeIndex = 1;
                this.initForm(1);
                this.add['uid'] = res['uid'];
                this.add['name'] = res['name'];
                this.unBlockUI();
            },
            error => {
                this.add.account = '';
                this.showError(error);
            }
        );
    }

    stepTwo() {
        this.BlockUI();
        this.userHttpService.put('/user/', this.add).subscribe(
            res => {
                localStorage.setItem('bm-userId', res['userId']);
                localStorage.setItem('bm-realName', res['name']);
                localStorage.setItem('bm-userInfo', JSON.stringify(res));
                this.unBlockUI();
                this.activeIndex = 2;
            },
            error => {
                this.showError(error);
            }
        );
    }

    showError(error) {
        this.unBlockUI();
        showError(
            this.messageService,
            'Fail',
            error.error.message,
            3000
        );
    }

    BlockUI() {
        this.blockUI = true;
        this.disableNext = true;
    }

    unBlockUI() {
        this.blockUI = false;
        this.disableNext = false;
    }
}
