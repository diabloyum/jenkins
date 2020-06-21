import { Component, OnInit } from '@angular/core';
import { LoadingService } from './commom/services/util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    showLoader = false;

    constructor(
        private readonly loaderService: LoadingService
    ) {}

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}
