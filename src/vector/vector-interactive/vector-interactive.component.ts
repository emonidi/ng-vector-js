import { AfterViewInit, Component, Input, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorService } from '../vector-service/vector-service.service';

@Component({
  selector: 'nx-vector-interactive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vector-interactive.component.html',
  styleUrl: './vector-interactive.component.css',
  
})
export class VectorInteractiveComponent implements AfterViewInit{

  @Input() style:string | undefined;
  @ViewChild("interactive") interactive: any | undefined;
  @ViewChildren("content") children: any;
  constructor(private vectorService:VectorService){
      
  }

  ngAfterViewInit(): void {
     this.vectorService.createInteractive(this.interactive!)
     console.log(this.vectorService.interactive)
     let {x,y,width,height} = this.interactive.nativeElement.getBoundingClientRect();
  
     this.vectorService.interactive.viewBox = `${x},${y},${width},${height}`;
     if(this.style){
        this.vectorService.interactive.style.cssText = this.style; 
     }
  }
}
