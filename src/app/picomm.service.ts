import { Injectable } from '@angular/core';
import  { HttpHeaders } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpRequest,HttpHandler,HttpClientJsonpModule} from '@angular/common/http';
import {delay, finalize, Observable} from "rxjs";
import {LoaderService} from "./loader.service"



//const beaconUrlAlive = '192.168.0.101:49160/alive'
//const beaconUrlData = '192.168.0.101:49160/random'
const beaconUrlAlive = '192.168.0.101:3000/alive'
const beaconUrlData = '192.168.0.101:3000/random'
const headers= new HttpHeaders().set('content-type', 'application/json')




@Injectable({
  providedIn: 'root'
})
export class NullInterceptor implements HttpInterceptor {
  constructor( private spinner:LoaderService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler ):
    Observable <HttpEvent<any>> {
    this.spinner._spinnerStatus$.next(true)
    return next.handle(req).pipe(
      delay(1000),finalize(() => this.spinner._spinnerStatus$.next(false) )
    )

  }

}

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler ):
    Observable <HttpEvent<any>> {
    const API_KEY = '123456';
    return next.handle(req.clone({ setHeaders: { API_KEY } }));

  }

}



@Injectable({
  providedIn: 'root'
})
export class PicommService {

  constructor(private http: HttpClient) {}


  get alivetest() {
    return this.http.get('http://192.168.0.101:49160/alive') }

  get random() {
    return this.http.get('http://192.168.0.101:49160/random')
  }



}
