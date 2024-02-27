import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LineCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

@Component({
  selector: 'nx-vector-line',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './vector-line.component.html',
  styleUrl: './vector-line.component.css',
  // schemas:[NO_ERRORS_SCHEMA]
})
export class VectorLineComponent {
  @ViewChild('line', { static: true }) template: any;

  @Output() mouseover = new EventEmitter();
  @Output() mouseout: EventEmitter<Event> = new EventEmitter();
  @Output() click: EventEmitter<Event> = new EventEmitter();
  @Output() mousedown: EventEmitter<Event> = new EventEmitter();
  @Output() mouseup: EventEmitter<Event> = new EventEmitter();

  @Input() class: string = '';
  @Input() set visible(visible: boolean) {
    this.visible = visible;
  }

  @Input() stroke: string | undefined;
  @Input() set strokeWidth(strokeWidth: number) {
    this._strokeWidth = strokeWidth;
    if (this.line) {
      this.setStrokeWidth();
    }
  }
  @Input() set coords(coords: LineCoordinates | undefined) {
    this._coords = coords!;
  }

  
  private _visible = false;
  private _strokeWidth: number = 1;
  public _coords: LineCoordinates = { x1: 0, x2: 0, y1: 0, y2: 0 };
  private line: any;

  constructor(
    private ref: ViewContainerRef
  ) {}

  ngOnInit() {
    this.line = this.ref.createEmbeddedView(this.template).rootNodes[0];
    this.setStrokeWidth();
    if(!this.stroke){
        this.stroke = "black"
    }
  }


  onClick(ev:any){
    this.click.emit(ev)
  }

  onMousedown(ev:any){
   
    this.mousedown.emit(ev);
  }

  onMouseout(ev:any){
    this.mouseout.emit(ev);
  }

  onMouseOver(ev:any){
  
    this.mouseover.emit(ev);
  }

  setClass() {
    this.line.root.setAttribute(
      'class',
      [...this.line.classList, ...this.class.split(' ')].join(' ')
    );
  }

  setStrokeWidth() {
    
    this.line.style.strokeWidth = this._strokeWidth || 1;
  }

  setVisible() {
    if (this.line) {
      this.line.style.display = this._visible ? 'block' : 'none';
    }
  }
}
