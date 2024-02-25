import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VectorLineComponent,VectorControllPointComponent, LineCoordinates, VectorService, PointCoords} from '../../vector'
import * as d3 from 'd3';


@Component({
  selector: 'nx-wall',
  standalone: true,
  imports: [CommonModule, VectorControllPointComponent, VectorLineComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent implements OnInit, OnDestroy{

  @ViewChild('wall',{static:true}) wall:SVGAElement | undefined;

  @Output() pointReleased = new EventEmitter();
  @Output() selected:EventEmitter<string> = new EventEmitter();
  @Output() resize:EventEmitter<{coords:LineCoordinates,id:string}> = new EventEmitter()
  @Input() id: string = '';
  @Input() set coords(coords:LineCoordinates){
    this._coords = coords;
  };
  
  public el: SVGAElement | undefined;
  private drag: any;
  public souldShowControlPoints:boolean = false;
  public strokeWidth:number = 3;
  public _coords:LineCoordinates = {x1:0,x2:0,y1:0,y2:0};
  constructor(private vectorService:VectorService,private containerRef : ViewContainerRef){
     this.drag = d3.drag();
  }

  ngOnInit(){
    this.el = this.containerRef.createEmbeddedView(this.wall as any).rootNodes[0];
    d3.select(this.el as any).call(this.drag.on('drag',(ev:any)=>{
      let {x1,x2,y1,y2} = this._coords
      this._coords = {
        x1:x1+ev.dx!,
        x2:x2+ev.dx!,
        y1:y1+ev.dy!,
        y2:y2+ev.dy!
      }
      this.resize.emit({coords:this._coords,id:this.id})
    }))
  }

  ngOnDestroy(): void {
      d3.select(this.el as any).on('drag',null);
  }

  onPointReleased(point:PointCoords,pointIndex:number){
    this.pointReleased.emit({point,id:this.id,pointIndex})
  }

  changeCoordsOnZoom(zoom:number){
  
    let {x1,x2,y1,y2} = this._coords;
    return {
      x1:x1*zoom,
      x2:x2*zoom,
      y1:y1*zoom,
      y2:y2*zoom
    }
  }
 
  onPointChange(event:any, pointIndex:number){
  
    switch(pointIndex){
        case 0:
          this._coords = {
            ...this._coords!,
            x1:event.x!,
            y1:event.y!
          }
        break;
        case 1:
          this._coords = {
            ...this._coords!,
            x2:event.x!,
            y2:event.y!
          }
    }
   
    this.resize.emit({coords:this._coords!, id:this.id});
  }

  onHoverIn(event:any){
    this.strokeWidth = 10
  }

  onHoverOut(event:any){
    this.strokeWidth = 3
  }

  onLineClick(event:Event){

    this.souldShowControlPoints = !this.souldShowControlPoints;    
    this.selected.emit(this.id)
  }

  onMouseDown(){
   
    this.selected.emit(this.id);
  }

  onMouseUp(){
    this.selected.emit('');
  }
}
