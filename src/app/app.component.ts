import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { VectorInteractiveComponent } from '../vector/vector-interactive/vector-interactive.component';
import { LineCoordinates } from '../vector/vector-line/vector-line.component';
import { CommonModule } from '@angular/common';
import { WallComponent } from './wall/wall.component';
import { v4 } from 'uuid';
import { PointCoords } from 'src/vector';
import { UtilsService } from './utils.service';

@Component({
  standalone: true,
  imports: [
    VectorInteractiveComponent,
    RouterModule,
    CommonModule,
    WallComponent
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
  private index = 0;
  private selectedWall: string | null = null;
  private isCtrlOn = false;

  @HostListener('window:keydown.Alt', ['$event'])
  onKeyDown() {
    this.isCtrlOn = true;
  }

  @HostListener('window:keyup.Alt', ['$event'])
  onKeyUp() {
    this.isCtrlOn = false;
  }

  constructor(private utilsService: UtilsService) {}

  addWall() {
    this.walls.push({
      id: v4(),
      coords: { x1: 100, x2: 300, y1: 100, y2: 100 },
    });
  }

  onPointReleased(p: any) {
    console.log(p);
    this.walls = this.utilsService.snapPoints(p, this.walls);
  }

  onWallSelected(wallId: string) {
    if (wallId === '') {
      this.selectedWall = null;
      return;
    }
    this.selectedWall = wallId;
  }

  onResize(resizedWall: any) {
    const wall = this.walls.find((wall) => wall.id === resizedWall.id);
    wall.coords = resizedWall.coords;
    if (this.isCtrlOn) {
      const { x1, x2, y1, y2 } = wall.coords;
      const points = [
        { point: { x: x1, y: y1 }, id: wall.id, pointIndex: 0 },
        { point: { x: x2, y: y2 }, id: wall.id, pointIndex: 1 },
      ];
      points.forEach((point) => {
        this.walls = this.utilsService.snapPoints(point, this.walls);
      });
    }
  }
}
