import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundBlocksChartComponent } from './found-blocks-chart.component';

describe('FoundBlocksChartComponent', () => {
  let component: FoundBlocksChartComponent;
  let fixture: ComponentFixture<FoundBlocksChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundBlocksChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundBlocksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
