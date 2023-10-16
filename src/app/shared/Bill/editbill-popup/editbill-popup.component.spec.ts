import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbillPopupComponent } from './editbill-popup.component';

describe('EditbillPopupComponent', () => {
  let component: EditbillPopupComponent;
  let fixture: ComponentFixture<EditbillPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditbillPopupComponent]
    });
    fixture = TestBed.createComponent(EditbillPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
