import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public _spinnerStatus$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  get spinnerStatus$() { return this._spinnerStatus$.asObservable(); }

}



