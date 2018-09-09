import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ProfileService } from './profile.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EmitterService } from './emitter.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [],
    declarations: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ProfileService,
                EmitterService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptorService,
                    multi: true
                }
            ]
        };
    }
}
