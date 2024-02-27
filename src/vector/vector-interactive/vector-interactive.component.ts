import { AfterViewInit, Component, Input, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-vector-interactive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vector-interactive.component.html',
  styleUrl: './vector-interactive.component.css',
  
})
export class VectorInteractiveComponent{

  @Input() style:string | undefined;
  @ViewChild("interactive") interactive: any | undefined;
  @ViewChildren("content") children: any;
  @Input() width:number | undefined;
  @Input() height:number | undefined;

  constructor(private ref: ViewContainerRef){
       
  }

  ngOnInit(){
   
  }

 
}
