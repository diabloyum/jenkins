import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrderComponent } from './order/order.component';
import { PagesComponent } from './pages.component';
import { ProductDescComponent } from './product-desc/product-desc.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // {
            //     path: 'dashboard',
            //     component: DashboardComponent
            // },
            {
                path: 'system',
                loadChildren: './system/system.module#SystemModule'
            },
            {
                path: 'manage',
                loadChildren: './manage/manage.module#ManageModule'
            },
            {
                path: 'dashboard',
                component: MapComponent
            },
            {
                path: 'myprofile',
                component: MyprofileComponent
            },
            {
                path: 'product_desc',
                component: ProductDescComponent
            },
            {
                path: 'product_list',
                component: ProductListComponent
            },
            {
                path: 'order',
                component: OrderComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutesModule {
}
