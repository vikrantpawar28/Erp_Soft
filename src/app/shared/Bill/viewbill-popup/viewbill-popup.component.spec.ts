import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbillPopupComponent } from './viewbill-popup.component';

describe('ViewbillPopupComponent', () => {
  let component: ViewbillPopupComponent;
  let fixture: ComponentFixture<ViewbillPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewbillPopupComponent]
    });
    fixture = TestBed.createComponent(ViewbillPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
