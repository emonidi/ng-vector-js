import { Injectable } from '@angular/core';
import { distance, featureCollection, nearestPoint, point } from '@turf/turf';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {

  }

  snapPoints(p: any, walls: any) {
    const releasedPoint = point([p.point.x, p.point.y], { id: p.id });
    const points = walls
      .map((wall: any) => {
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

    const nearestWallPoint = nearestPoint(releasedPoint, featureCollection(points));
    const distanceToPoint = distance(releasedPoint, nearestWallPoint, { units: "degrees" });
    console.log(distanceToPoint)
    if (distanceToPoint < 10) {

      const wall = walls.find(wall => wall.id === p.id);
      if (p.pointIndex === 0) {
        wall.coords.x1 = nearestWallPoint.geometry.coordinates[0]
        wall.coords.y1 = nearestWallPoint.geometry.coordinates[1]
      } else if (p.pointIndex === 1) {
        wall.coords.x2 = nearestWallPoint.geometry.coordinates[0]
        wall.coords.y2 = nearestWallPoint.geometry.coordinates[1]
      }
    }

    return walls
  }
}
