import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadMangmentComponent } from './lead-mangment.component';

describe('LeadMangmentComponent', () => {
  let component: LeadMangmentComponent;
  let fixture: ComponentFixture<LeadMangmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadMangmentComponent]
    });
    fixture = TestBed.createComponent(LeadMangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
