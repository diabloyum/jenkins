
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemReferenceComponent } from './reference/system-reference.component';
import { SystemComponent } from './system.component';

const routes: Routes = [
    {
        path: '',
        component: SystemComponent,
        children: [{
            path: 'reference',
            component: SystemReferenceComponent
        }]
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
export class SystemRoutingModule {
}
// Routed Components
export const routedComponents = [
    SystemComponent,
    SystemReferenceComponent
];
