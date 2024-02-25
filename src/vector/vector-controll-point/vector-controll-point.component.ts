import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorService } from '../vector-service/vector-service.service';
import { PointCoords } from '../vector-model/interfaces';
import * as d3 from 'd3'

export interface ControlPointCoords{
  x:number,
  y:number
}

@Component({
  selector: 'nx-vector-controll-point',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vector-controll-point.component.html',
  styleUrl: './vector-controll-point.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class VectorControllPointComponent implements OnInit, OnDestroy {

  @ViewChild('point',{static:true}) point:any;

  @Input() set coords(coords:ControlPointCoords){
    this._coords = coords!;
    if(this.controlPoint && coords){
      this.controlPoint.x = this._coords.x
      this.controlPoint.y = this._coords.y
    }
  }
  @Input() set visible(visible:boolean){
    this._visible = visible;
    this.setVisible();
  };

  @Input() outerRadius: number = 10;

  @Input() color:string = "black"

  @Input() innerRadius:number = 5;

  @Output() onReleased: EventEmitter<ControlPointCoords> = new EventEmitter()

  @Output() onChange: EventEmitter<ControlPointCoords> = new EventEmitter();
  
  private drag = d3.drag();
  public hovered = false;
  public el: SVGAElement | undefined;
  private controlPoint: any;
  private _visible = false;
  public _coords: PointCoords = {x:0,y:0};
  constructor(private vectorService: VectorService, private ref: ViewContainerRef) { }
  
  
  ngOnDestroy(): void {
      d3.select(this.el as any).on("drag",null);
  }

  
  ngOnInit(){
    this.el = this.ref.createEmbeddedView(this.point).rootNodes[0];
    this.setVisible();
    d3.select(this.el as any).call(this.drag.on('drag',(ev=>{
      let {x,y} = this._coords;
      this.coords = {x:x+ev.dx,y:y+ev.dy};
      this.onChange.emit(this._coords as ControlPointCoords);
    })))
    d3.select(this.el as any).call(this.drag.on('end',(ev)=>{
       this.onReleased.emit(this._coords as ControlPointCoords)
    }))
  }

  setVisible(){
   
    d3.select(this.el as any).style('display',this._visible ? "block" : "none");
  }

  onMouseover(ev:any){
    this.hovered = true;
  }

  onMouseout(ev:any){
    this.hovered = false;
  }

  omMouseUp(ev:any){
  
    this.onReleased.emit(this._coords as ControlPointCoords);
  }
}
