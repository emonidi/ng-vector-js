import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VectorLineComponent } from './vector-line.component';

describe('VectorLineComponent', () => {
  let component: VectorLineComponent;
  let fixture: ComponentFixture<VectorLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VectorLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
