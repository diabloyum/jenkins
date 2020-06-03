import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app-guard';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/pages',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        redirectTo: '/portal/login',
        pathMatch: 'full'
    },
    {
        path: 'portal',
        loadChildren: './portal/portal.module#PortalModule'
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
        // canActivate: [AppGuard]
    },
    {
        path: '**',
        redirectTo: '/portal/login'
    }
];

const config: ExtraOptions = {
    useHash: true
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [AppGuard]
})
export class AppRoutingModule {
}
