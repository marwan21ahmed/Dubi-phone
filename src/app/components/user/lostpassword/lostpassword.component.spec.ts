import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostpasswordComponent } from './lostpassword.component';

describe('LostpasswordComponent', () => {
  let component: LostpasswordComponent;
  let fixture: ComponentFixture<LostpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LostpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
