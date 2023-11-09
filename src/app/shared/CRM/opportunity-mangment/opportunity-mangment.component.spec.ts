import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityMangmentComponent } from './opportunity-mangment.component';

describe('OpportunityMangmentComponent', () => {
  let component: OpportunityMangmentComponent;
  let fixture: ComponentFixture<OpportunityMangmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunityMangmentComponent]
    });
    fixture = TestBed.createComponent(OpportunityMangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
