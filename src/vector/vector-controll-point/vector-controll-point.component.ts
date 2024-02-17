import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorService } from '../vector-service/vector-service.service';
import { PointCoords } from '../vector-model/interfaces';

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
})
export class VectorControllPointComponent implements AfterViewChecked {

  @Input() set coords(coords:PointCoords | undefined){
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

  @Output() onChange: EventEmitter<ControlPointCoords> = new EventEmitter();
  
  private controlPoint: any;
  private _visible = false;
  private _coords: PointCoords = {x:0,y:0};
  constructor(private vectorService: VectorService) { }

  ngAfterViewChecked(): void {
    if (!this.vectorService.interactive) return
    if (!this.controlPoint) {
      
      this.controlPoint = this.vectorService.interactive.control(this._coords?.x, this._coords?.y)
      this.controlPoint._onchange = (ev:any)=>{
        let {x,y} = this.controlPoint;
        this.onChange.emit({x,y})
      };
      this.setVisible()
    }
  }

  setVisible(){
    if(this.controlPoint){
      this.controlPoint.style.display = this._visible ? "block" : "none"
    }
  }
}
