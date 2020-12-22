import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplianceComponent } from './add-appliance.component';

describe('AddApplianceComponent', () => {
  let component: AddApplianceComponent;
  let fixture: ComponentFixture<AddApplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
