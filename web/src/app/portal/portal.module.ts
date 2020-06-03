import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {
    BlockUIModule,
    ButtonModule, CheckboxModule,
    DialogService,
    DropdownModule,
    InputTextModule,
    MessageService,
    PasswordModule,
    StepsModule
} from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { CommonHttpService } from '../commom/services/common.service';
import { ReferenceHttpService, TranslateDataloader } from '../commom/services/http';
import { PortalRoutingModule, routedComponents } from './portal-routing.module';

@NgModule({
    declarations: [
        ...routedComponents
    ],
    imports: [
        CommonModule,
        PortalRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        TranslateModule.forChild({
            loader: {provide: TranslateLoader, useClass: TranslateDataloader, deps: [HttpClient]}
        }),
        DropdownModule,
        ToastModule,
        BlockUIModule,
        StepsModule,
        DynamicDialogModule,
        PasswordModule,
        CheckboxModule,
        FormsModule
    ],
    providers: [
        MessageService,
        ReferenceHttpService,
        CommonHttpService,
        DialogService
    ]
})
export class PortalModule {
}
