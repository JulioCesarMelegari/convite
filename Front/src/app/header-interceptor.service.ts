import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError'


@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  public apiUrl: string = 'http://localhost:8080/convites/'
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //constructor(private loginService:LoginService){}

    /*intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.obterTokenUsuario;
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = this.apiUrl.split('/');
        
        if (token && requestUrl[2] === apiUrl[2]) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    token: `${token}`
                }
            });
            return next.handle(request).pipe(error => {
                if (error instanceof HttpErrorResponse && error.status === 401)
                  this.loginService.deslogar();
                else
                  return throwError(error.message);
            });
        }
        else {
            return next.handle(request);
        }
    }

  }
}*/


  
    if(localStorage.getItem('token') !==null){
      const token = 'Bearer '+ localStorage.getItem('token');
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });
      return next.handle(tokenRequest);
    }else{
      return next.handle(req);
    }
    
  }

  constructor() { }

}
@NgModule({
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass:HeaderInterceptorService,
    multi:true,
  },],
})

export class HttpInterceptorModule{

}