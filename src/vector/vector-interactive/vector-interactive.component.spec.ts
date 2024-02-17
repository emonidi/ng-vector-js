import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VectorInteractiveComponent } from './vector-interactive.component';

describe('VectorInteractiveComponent', () => {
  let component: VectorInteractiveComponent;
  let fixture: ComponentFixture<VectorInteractiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorInteractiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VectorInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
