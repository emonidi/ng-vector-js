import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorService } from '../vector-service/vector-service.service';

export interface LineCoordinates{
  x1:number,
  x2:number,
  y1:number,
  y2:number
}

@Component({
  selector: 'nx-vector-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vector-line.component.html',
  styleUrl: './vector-line.component.css',
 
})
export class VectorLineComponent implements AfterViewChecked {

  @Output() mouseover: EventEmitter<Event> = new EventEmitter();
  @Output() mouseout: EventEmitter<Event> = new EventEmitter();
  @Output() click: EventEmitter<Event> = new EventEmitter();
  @Output() mousedown: EventEmitter<Event> = new EventEmitter();
  @Output() mouseup: EventEmitter<Event> = new EventEmitter();
  

  @Input() class:string  = '';
  @Input() set visible(visible:boolean){
      this.visible = visible;
  }

  @Input() stroke:string | undefined;
  @Input() set strokeWidth(strokeWidth:number){
    this._strokeWidth = strokeWidth;
    if(this.line){
      this.setStrokeWidth();
    }
  };
  @Input() set coords(coords:LineCoordinates | undefined){
    this._coords = coords!;
    if(this.line && coords){
      this.line.x1 = this._coords.x1,
      this.line.x2 = this._coords.x2,
      this.line.y1 = this._coords.y1,
      this.line.y2 = this._coords.y2
    }
  }
  private _visible = false;
  private _strokeWidth:number = 1;
  private _coords:LineCoordinates = {x1:0,x2:0,y1:0,y2:0};
  private line:any;
 
  constructor(private vectorSerice:VectorService){
    
  }
  ngAfterViewChecked(): void {
   if(!this.vectorSerice.interactive ) return 
    
   if(!this.line){
    this.createLine();
   }
  }

  createLine(){
    let {x1,x2,y1,y2} = this._coords!;
    this.line = this.vectorSerice.interactive.line(x1 || 0, y1 || 0, x2 || 0, y2 || 0 )
    this.line.stroke = this.stroke || '';
    this.setStrokeWidth();
    this.line.root.addEventListener("mouseover",(ev:Event)=>{
      this.mouseover.emit(ev);
    })
    this.line.root.addEventListener("mouseout",(ev:Event)=>{
      this.mouseout.emit(ev);
    })
    this.line.root.addEventListener("click",(ev:Event)=>{
      this.click.emit(ev);
    })
    this.line.root.addEventListener("mousedown",(ev:Event)=>{
      this.mousedown.emit(ev);
    })
    this.line.root.addEventListener("mouseup",(ev:Event)=>{
      this.mouseup.emit(ev);
    })
    this.setClass();
  }
  
  setClass(){

    this.line.root.setAttribute("class",[...this.line.classList,...this.class.split(" ")].join(" "))
    
  }

  setStrokeWidth(){
    this.line.style.strokeWidth = this._strokeWidth || 1;
  }

  setVisible(){
    if(this.line){
      this.line.style.display = this._visible ? "block" : "none";
    }
  }
}
