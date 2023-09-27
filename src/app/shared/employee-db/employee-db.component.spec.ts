import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDbComponent } from './employee-db.component';

describe('EmployeeDbComponent', () => {
  let component: EmployeeDbComponent;
  let fixture: ComponentFixture<EmployeeDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDbComponent]
    });
    fixture = TestBed.createComponent(EmployeeDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
