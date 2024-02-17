import { Injectable, Input, ViewChild } from '@angular/core';
import {Interactive } from "@vector-js/library/dist";

@Injectable({
  providedIn: 'root'
})
export class VectorService{

  public interactive: any
 
  constructor() {
    
  }

  public createInteractive(element:any){
    this.interactive = new Interactive(element.nativeElement);  
   
  }
}
