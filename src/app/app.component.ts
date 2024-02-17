import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VectorInteractiveComponent } from '../vector/vector-interactive/vector-interactive.component'
import { LineCoordinates } from '../vector/vector-line/vector-line.component'
import { VectorButtonComponent } from 'src/vector/vector-button/vector-button.component'
import { CommonModule } from '@angular/common'
import { WallComponent } from './wall/wall.component';
import { v4 } from 'uuid'

@Component({
  standalone: true,
  imports: [
    VectorInteractiveComponent,
    RouterModule,
    CommonModule,
    VectorButtonComponent,
    WallComponent
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: 'nx-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx';
  public lineCoords: LineCoordinates = { x1: 0, x2: 0, y1: 0, y2: 200 }
  public walls: Array<any> = [];
  private index: number = 0;
  private selectedWall: string | null = null;

  addWall() {
    this.walls.push(
      {
        id: v4(),
        coords: { x1: 100, x2: 300, y1: 100, y2: 100 }
      }
    )
  }

  ngOnChange(change:any){
    console.log(change)
  }

  onMouseMove(event: Event) {
    if (this.selectedWall) {
      this.walls = this.walls.map((wall) => {
        if (wall.id === this.selectedWall) {
            const {movementX, movementY} = event as any;
            const {x1,x2,y1,y2} = wall.coords as LineCoordinates
            wall.coords = {x1:x1+movementX, x2:x2+movementX, y1:y1+movementY,y2:y2+movementY};
        }
        return wall;
      })
    }
  }
  onWallSelected(wallId: string) {
    console.log(wallId)
    if (wallId === '') {
      this.selectedWall = null;
      return;
    }
    this.selectedWall = wallId;
  }

  onResize(resizedWall:any){
    this.walls.forEach(wall=>{
      if(wall.id === resizedWall.id){
        wall.coords = {...resizedWall.coords}
      }
    })
  }

}
