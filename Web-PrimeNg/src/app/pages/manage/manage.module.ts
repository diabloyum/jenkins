
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import {
    BlockUIModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule, FileUploadModule,
    InputTextModule, PanelModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PagesModule } from '../pages.module';
import { CheckComponent } from './check/check.component';
import { ManageRoutingModule, routedComponents } from './manage-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { OrderComponent } from './order/order.component';
import { UploadComponent } from './upload/upload.component';
import { UserComponent } from './user/user.component';
@NgModule({
    imports: [
        CommonModule,
        CardModule,
        ToastModule,
        BlockUIModule,
        TableModule,
        DialogModule,
        FormsModule,
        DropdownModule,
        ConfirmDialogModule,
        PagesModule,
        InputTextModule,
        ReactiveFormsModule,
        ManageRoutingModule,
        CalendarModule,
        DataViewModule,
        PanelModule,
        FileUploadModule
    ],
    declarations: [
        ...routedComponents,
        UserComponent,
        CheckComponent,
        ManagerComponent,
        OrderComponent,
        UploadComponent
    ],
    providers: []
})
export class ManageModule {
}
