
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonConstance } from '../../../commom/constance';
import { CommonHttpService } from '../../../commom/services/common.service';
import { showError, trimValidator } from '../../../commom/utils/util';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    product_name: string;
    price: string;
    myForm: FormGroup;
    company: any = {};
    add: any = {};

    prodectDesc: string;

    constructor(private route: Router,
                private fb: FormBuilder,
                private userHttpService: CommonHttpService,
                private messageService: MessageService) { }

    ngOnInit() {
      this.initForm();
  }
    // tslint:disable-next-line:no-async-without-await
    async onSubmit() {
        this.userHttpService.regist('/product_info/', this.add).subscribe(
            async res => {
                const all = await this.userHttpService.getAll('product_info');
               // this.route.navigate(['/pages/dashboard']);
            },
            error => {
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
        if (!this.myForm.valid) {
            return true;
            // tslint:disable-next-line:unnecessary-else
        } else {
            return false;
        }
    }
    initForm() {
        this.myForm = this.fb.group(
            {
                productName: ['', Validators.compose([trimValidator, Validators.required])],
                price: ['', Validators.compose([trimValidator, Validators.required])],
                prodectDesc: ['', Validators.compose([trimValidator, Validators.required])]
            }
        );
    }
}
