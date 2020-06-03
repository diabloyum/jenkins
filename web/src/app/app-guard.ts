import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate, Router,
    RouterStateSnapshot
} from '@angular/router';
import 'rxjs-compat/add/observable/of';
import { CommonConstance } from './commom/constance';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(
        private readonly router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const OAUTH_TOKEN = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.OAUTH_TOKEN));
        if (!OAUTH_TOKEN) {
            this.router.navigateByUrl('/portal/login');
        }

        return !!OAUTH_TOKEN;
    }
}
