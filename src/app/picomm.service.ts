import { Injectable } from '@angular/core';
import  { HttpHeaders } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import {HttpEvent, HttpInterceptor, HttpRequest,HttpHandler,HttpClientJsonpModule} from '@angular/common/http';
import {delay, finalize, Observable, Subscriber} from "rxjs";
import {LoaderService} from "./loader.service"
import {beacondatatype} from "./beacon.interface";


//const beaconUrlAlive = '192.168.0.101:49160/alive'
//const beaconUrlData = '192.168.0.101:49160/random'
const beaconUrlAlive = '192.168.0.101:3000/alive'
const beaconUrlData = '192.168.0.101:3000/random'
const beaconUrlThermo = '192.168.0.101:3000/thermo'
const headers= new HttpHeaders().set('content-type', 'application/json')
let mObservable = new Observable()
let connectStatus:boolean=false



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
      delay(500),finalize(() => this.spinner._spinnerStatus$.next(false) )
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
  private subscriber: any;

  constructor(private http: HttpClient) {
  }


  get alivetest() {
    return this.http.get('https://192.168.0.101:49160/alive')
  }

  get random() {
    return new Observable((subscriber) => {
      subscriber.next(this.http.get('https://192.168.0.101:49160/random'))
    })

  }

  get thermo() {
    return this.http.get<beacondatatype>('https://192.168.0.101:49160/thermo')
  }

  get isConnected() {
    return new Observable(res =>{ res.next(connectStatus)})
  }

  set setstatus(mstat:boolean) {
    connectStatus=mstat
  }
}
