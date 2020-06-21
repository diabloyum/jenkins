import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    BlockUIModule,
    ButtonModule,
    CardModule, CheckboxModule,
    ConfirmationService,
    ConfirmDialogModule,
    DialogModule,
    DialogService,
    DropdownModule, FileUploadModule, GMapModule,
    InputTextModule,
    MessageService, PanelModule,
    ScrollPanelModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenuHttpService } from '../commom/services/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesMenuComponent, PagesSubMenuComponent } from './layout/pages.menu.component';
import { PagesTopBarComponent } from './layout/pages.topbar.component';
import { MapComponent } from './map/map.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrderComponent } from './order/order.component';
import { PagesRoutesModule } from './pages-routes';
import { PagesComponent } from './pages.component';
import { ProductDescComponent } from './product-desc/product-desc.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
    declarations: [
        PagesComponent,
        // DashboardComponent,
        PagesTopBarComponent,
        PagesMenuComponent,
        PagesSubMenuComponent,
        MyprofileComponent,
        DashboardComponent,
        MapComponent,
        ProductListComponent,
        ProductDescComponent,
        OrderComponent
    ],
    imports: [
        CommonModule,
        PagesRoutesModule,
        TranslateModule,
        ScrollPanelModule,
        ButtonModule,
        CardModule,
        ToastModule,
        BlockUIModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        FormsModule,
        InputTextModule,
        DropdownModule,
        PanelModule,
        FileUploadModule,
        GMapModule,
        CheckboxModule,
    ],
    exports: [

    ],
    providers: [
        MenuHttpService,
        DialogService,
        ConfirmationService,
        MessageService
    ]
})
export class PagesModule {
}
