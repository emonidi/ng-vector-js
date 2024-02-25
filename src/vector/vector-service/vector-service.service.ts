import { Injectable, Input, ViewChild } from '@angular/core';
import {Interactive } from "@vector-js/library/dist";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VectorService{

  public interactive: any
  public zoom$:BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() {
    
  }

  public createInteractive(element:any){
    this.interactive = new Interactive(element.nativeElement);  
    this.zoom$.next(this.zoom$.getValue());
  }

  public setZoom(zoom:number){
    
    this.zoom$.next(zoom)
  }
}
