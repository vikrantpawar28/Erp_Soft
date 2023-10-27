import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpLeadComponent } from './pop-up-lead.component';

describe('PopUpLeadComponent', () => {
  let component: PopUpLeadComponent;
  let fixture: ComponentFixture<PopUpLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpLeadComponent]
    });
    fixture = TestBed.createComponent(PopUpLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
