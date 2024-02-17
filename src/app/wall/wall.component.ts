import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VectorLineComponent,VectorControllPointComponent, LineCoordinates, PointCoords} from '../../vector'

@Component({
  selector: 'nx-wall',
  standalone: true,
  imports: [CommonModule, VectorControllPointComponent, VectorLineComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent{

  @Output() selected:EventEmitter<string> = new EventEmitter();
  @Output() resize:EventEmitter<{coords:LineCoordinates,id:string}> = new EventEmitter()
  @Input() id: string = '';
  @Input() set coords(coords:LineCoordinates){
    this._coords = coords;
  };
  
  public souldShowControlPoints:boolean = false;
  public strokeWidth:number = 3;
  public _coords:LineCoordinates | undefined;
  constructor(){}
 
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
  }

  onMouseDown(){
    this.selected.emit(this.id);
  }

  onMouseUp(){
    this.selected.emit('');
  }
}
