import { AfterViewChecked, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorService } from '../vector-service/vector-service.service';
import { PointCoords } from '../vector-model/interfaces';



@Component({
  selector: 'nx-vector-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vector-button.component.html',
  styleUrl: './vector-button.component.css',
})
export class VectorButtonComponent implements AfterViewChecked {
  private button: any;
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Input() coords: PointCoords | undefined;
  @Input() label: string | undefined;

  constructor(private vectorService: VectorService) { }

  ngAfterViewChecked() {
    if (!this.button && this.vectorService.interactive) {
      this.button = this.vectorService.interactive.button(this.coords?.x, this.coords?.y, this.label)
      this.button.root.addEventListener("click", (ev: any) => {
       
        this.click.emit(this.button);
      })
    }
  }

}
