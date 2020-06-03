import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget/forget-password.component';
import { LocalLoginComponent } from './local-login/local-login.component';
import { RegisterComponent } from './registration/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LocalLoginComponent
    },
    {
        path: 'registration',
        component: RegisterComponent
    },
    {
        path: 'forget',
        component: ForgetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule {
}
// Routed Components
export const routedComponents = [
    LocalLoginComponent,
    ForgetPasswordComponent,
    RegisterComponent
];
