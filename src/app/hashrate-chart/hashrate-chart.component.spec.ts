import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashrateChartComponent } from './hashrate-chart.component';

describe('HashrateChartComponent', () => {
  let component: HashrateChartComponent;
  let fixture: ComponentFixture<HashrateChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashrateChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashrateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
