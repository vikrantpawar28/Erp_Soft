import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPopDetailsComponent } from './emp-pop-details.component';

describe('EmpPopDetailsComponent', () => {
  let component: EmpPopDetailsComponent;
  let fixture: ComponentFixture<EmpPopDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpPopDetailsComponent]
    });
    fixture = TestBed.createComponent(EmpPopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
