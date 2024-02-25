import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VectorInteractiveComponent } from '../vector/vector-interactive/vector-interactive.component';
import { LineCoordinates } from '../vector/vector-line/vector-line.component';
import { VectorButtonComponent } from 'src/vector/vector-button/vector-button.component';
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall/wall.component';
import { v4 } from 'uuid';
import { PointCoords, ZoomableDirective } from 'src/vector';
import { distance, featureCollection, nearestPoint, point } from '@turf/turf';

@Component({
  standalone: true,
  imports: [
    VectorInteractiveComponent,
    RouterModule,
    CommonModule,
    VectorButtonComponent,
    WallComponent,
    ZoomableDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nx-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx';
  public lineCoords: LineCoordinates = { x1: 0, x2: 0, y1: 0, y2: 200 };
  public walls: Array<any> = [];
  private index: number = 0;
  private selectedWall: string | null = null;

  addWall() {
    this.walls.push({
      id: v4(),
      coords: { x1: 100, x2: 300, y1: 100, y2: 100 },
    });
  }

  ngOnChange(change: any) {}

  onMouseMove(event: Event) {
    // if (this.selectedWall) {
    //   this.walls = this.walls.map((wall) => {
    //     if (wall.id === this.selectedWall) {
    //         console.log(event)
    //         const {movementX, movementY} = event as any;
    //         const {x1,x2,y1,y2} = wall.coords as LineCoordinates
    //         wall.coords = {x1:x1+movementX, x2:x2+movementX, y1:y1+movementY,y2:y2+movementY};
    //     }
    //     return wall;
    //   })
    // }
  }

  onPointReleased(p: any) {
    let releasedPoint = point([p.point.x, p.point.y], { id: p.id });
    let points = this.walls
      .map((wall) => {
        return [
          { x: wall.coords.x1, y: wall.coords.y1, id: wall.id },
          { x: wall.coords.x2, y: wall.coords.y2, id: wall.id },
        ];
      })
      .flat()
      .map((wall) => point([wall.x, wall.y], { id: wall.id }))
      .filter((point) => {
        return point.properties.id !== releasedPoint.properties.id;
      });

      const nearestWallPoint = nearestPoint(releasedPoint,featureCollection(points));
      const distanceToPoint = distance(releasedPoint,nearestWallPoint,{units:"degrees"});
      console.log(distanceToPoint)
      if(distanceToPoint < 10){
      
        let wall = this.walls.find(wall=>wall.id === p.id);
        if(p.pointIndex === 0){
          wall.coords.x1 = nearestWallPoint.geometry.coordinates[0]
          wall.coords.y1 = nearestWallPoint.geometry.coordinates[1]
        }else if(p.pointIndex === 1){
          wall.coords.x2 = nearestWallPoint.geometry.coordinates[0]
          wall.coords.y2 = nearestWallPoint.geometry.coordinates[1]
        }
      }
  }

  onWallSelected(wallId: string) {
    if (wallId === '') {
      this.selectedWall = null;
      return;
    }
    this.selectedWall = wallId;
  }

  onResize(resizedWall: any) {
    let wall = this.walls.find((wall) => wall.id === resizedWall.id);
    wall.coords = resizedWall.coords;
    // let resizedPointsX = point([wall.coords.x1,wall.coords.y1],{id:wall.id});
    // let resizedPointsY = point([wall.coords.x2,wall.coords.y2],{id:wall.id});
    // let points = this.walls.map(wall=>{
    //   return [{x:wall.coords.x1,y:wall.coords.y1,id:wall.id},{x:wall.coords.x2,y:wall.coords.y2,id:wall.id}];
    // }).flat().map(wall=>point([wall.x,wall.y],{id:wall.id})).filter(point=>{
    //  return point.properties.id !== (resizedPointsX.properties.id || resizedPointsY.properties.id)
    // })
    // const nearestXPoint = nearestPoint(resizedPointsX,featureCollection(points));
    // const distanceXPoint = distance(resizedPointsX,nearestXPoint,{units:"degrees"});

    // const nearestYPoint = nearestPoint(resizedPointsY,featureCollection(points));
    // const distanceYPoint = distance(resizedPointsY,nearestYPoint,{units:"degrees"});
    // console.log(distanceXPoint,distanceYPoint);
    // this.walls.forEach(wall=>{
    //   if(wall.id === resizedWall.id){
    //     wall.coords = {...resizedWall.coords}
    //   }
    // })
  }
}
