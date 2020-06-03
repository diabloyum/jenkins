import { APP_BASE_HREF, LOCATION_INITIALIZED } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DynamicDialogComponent, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ChatComponent } from './commom/chat/chat.component';
import { CommonConstance } from './commom/constance';
import { BaseInterceptor } from './commom/interceptor';
import { LoadingService, ReferenceHttpService, TranslateDataloader } from './commom/services';
import { CommonHttpService } from './commom/services/common.service';
import { PagesModule } from './pages/pages.module';

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: TranslateDataloader, deps: [HttpClient]}
    }),
    PanelModule,
    DynamicDialogModule
  ],
    bootstrap: [AppComponent],
    providers: [
        ReferenceHttpService,
        LoadingService,
        CommonHttpService,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true
        }],
    entryComponents: [
        ChatComponent,
        DynamicDialogComponent
    ]
})
export class AppModule {
}

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
    return () =>
        new Promise<any>((resolve: any) => {
            const locationInitialized = injector.get(
                LOCATION_INITIALIZED,
                Promise.resolve(null)
            );
            locationInitialized.then(() => {
                translate.addLangs(['en', 'zh']);
                let langToSet;
                if (!localStorage.getItem(CommonConstance.LOCALSTORAGE.DEFAULT_LANG)) {
                    localStorage.setItem(CommonConstance.LOCALSTORAGE.DEFAULT_LANG, 'en');
                }
                langToSet = localStorage.getItem(CommonConstance.LOCALSTORAGE.DEFAULT_LANG);
                translate.setDefaultLang('en');
                translate.use(langToSet).subscribe(() => {/** */}, () => {/** */},
                    () => {
                        resolve(null);
                    }
                );
            });
        });
}
