import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, mergeMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationFacade } from './state/authentication.facade';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationFacade: AuthenticationFacade, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationFacade.getCurrentUser().pipe(
        first(),
        mergeMap(currentUser => {
            const authReq = !!currentUser ? req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token)
            }) : req;

            return next.handle(authReq)
                .pipe(
                    tap(evt => {},
                        (error: any) => {
                            if (error instanceof HttpErrorResponse) {
                                if (error.status === 401 || error.status === 403) {
                                    this.router.navigate(['/login']);
                                }
                            }
                        }
                    )
                );
        })
    );
  }
}
