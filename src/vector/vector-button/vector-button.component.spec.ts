import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VectorButtonComponent } from './vector-button.component';

describe('VectorButtonComponent', () => {
  let component: VectorButtonComponent;
  let fixture: ComponentFixture<VectorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VectorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
