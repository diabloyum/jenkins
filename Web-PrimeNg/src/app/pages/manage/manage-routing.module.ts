import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckComponent } from './check/check.component';
import { ManageComponent } from './manage.component';
import { ManagerComponent } from './manager/manager.component';
import { OrderComponent } from './order/order.component';
import { UploadComponent } from './upload/upload.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        component: ManageComponent,
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'check',
                component: CheckComponent
            },
            {
                path: 'manager',
                component: ManagerComponent
            },
            {
                path: 'upload',
                component: UploadComponent
            },
            {
                path: 'order',
                component: OrderComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManageRoutingModule {
}

// Routed Components
export const routedComponents = [
    ManageComponent
];
