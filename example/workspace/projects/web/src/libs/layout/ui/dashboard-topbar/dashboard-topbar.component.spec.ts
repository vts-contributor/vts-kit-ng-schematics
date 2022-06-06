import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopbarComponent } from './dashboard-topbar.component';

describe('DashboardTopbarComponent', () => {
  let component: DashboardTopbarComponent;
  let fixture: ComponentFixture<DashboardTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
