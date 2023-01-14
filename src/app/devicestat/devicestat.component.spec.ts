import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicestatComponent } from './devicestat.component';

describe('DevicestatComponent', () => {
  let component: DevicestatComponent;
  let fixture: ComponentFixture<DevicestatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicestatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
