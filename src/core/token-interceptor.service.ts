import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from './profile.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor(
        public profile: ProfileService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.profile.idToken}`
            }
        });
        return next.handle(request);
    }
}