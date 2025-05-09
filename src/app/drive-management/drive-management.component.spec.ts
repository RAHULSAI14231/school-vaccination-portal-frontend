import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveManagementComponent } from './drive-management.component';

describe('DriveManagementComponent', () => {
  let component: DriveManagementComponent;
  let fixture: ComponentFixture<DriveManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriveManagementComponent]
    });
    fixture = TestBed.createComponent(DriveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
