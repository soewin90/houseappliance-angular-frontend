import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplianceComponent } from './list-appliance.component';

describe('ListApplianceComponent', () => {
  let component: ListApplianceComponent;
  let fixture: ComponentFixture<ListApplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
