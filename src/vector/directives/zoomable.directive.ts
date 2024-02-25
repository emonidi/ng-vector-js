import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';
import { VectorService } from '../vector-service/vector-service.service';
@Directive({
  selector: '[nxZoomable]',
  standalone: true,
})
export class ZoomableDirective {
  private observer: MutationObserver;
  private zoom;
  private svg: any | undefined;

  constructor(private el: ElementRef) {
    this.observer = new MutationObserver((mut) => this.onMutation(mut));
    this.observer.observe(this.el.nativeElement, { childList: true });
    this.zoom = zoom();
   

    
  }

  onMutation(mutation: any) {
  
    if (!this.svg) {
      this.svg = select('svg');
      this.svg.call(this.zoom.filter(this.filter).on('zoom',ev=> this.zoomed(ev)));
    }
  }

  zoomed(ev: any) {
    this.svg.attr("transform",`translate(${ev.transform.x},${ev.transform.y}) scale(${ev.transform.k},${ev.transform.k})`)
  }
  filter(event:any) {
    event.preventDefault();
    
    return event.type === 'wheel'
  }
}
