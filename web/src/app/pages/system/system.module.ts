
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/primeng';
import { routedComponents, SystemRoutingModule } from './system-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule,
        CardModule
    ],
    declarations: [
        ...routedComponents
    ],
    providers: []
})
export class SystemModule {
}
