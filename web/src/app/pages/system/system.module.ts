
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/primeng';
import { routedComponents, SystemRoutingModule } from './system-routing.module';
import { ReferenceManagementComponent } from './reference-management/reference-management.component';

@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule,
        CardModule
    ],
    declarations: [
        ...routedComponents,
        ReferenceManagementComponent
    ],
    providers: []
})
export class SystemModule {
}
