import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VectorControllPointComponent } from './vector-controll-point.component';

describe('VectorControllPointComponent', () => {
  let component: VectorControllPointComponent;
  let fixture: ComponentFixture<VectorControllPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorControllPointComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VectorControllPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
