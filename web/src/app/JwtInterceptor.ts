
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const jwtToken = localStorage.getItem('jwtToken');

        if (jwtToken) {
            const clonedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            return next.handle(clonedRequest);
        } else {
            return next.handle(request);
        }
    }
}
