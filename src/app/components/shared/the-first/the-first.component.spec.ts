import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFirstComponent } from './the-first.component';

describe('TheFirstComponent', () => {
  let component: TheFirstComponent;
  let fixture: ComponentFixture<TheFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheFirstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
