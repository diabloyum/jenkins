
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { CommonConstance } from '../../constance';

@Injectable()
export class TranslateDataloader implements TranslateLoader {

    constructor(private readonly http: HttpClient) {
    }

    getTranslation(lang: string): Observable<any> {
        if (localStorage.getItem(CommonConstance.LOCALSTORAGE.OAUTH_TOKEN)) {
            const apiAddress = '/internationalization';
            const params = new HttpParams().set('lang', lang);
            const internationalizationMap = new Map<string, string>();

            return Observable.create(observer => {
                this.http.get(apiAddress, {params}).subscribe((res: any) => {
                        res.forEach(item => {
                            internationalizationMap[item.key] = item.value;
                        });
                        observer.next(internationalizationMap);
                        observer.complete();
                    },
                    error => {
                        //  failed to retrieve from api, switch to local
                        this.http.get('/assets/i18n/en.json').subscribe((res: Response) => {
                            observer.next(res);
                            observer.complete();
                        });
                    }
                );
            });
        }

        return Observable.of(null);
    }
}
