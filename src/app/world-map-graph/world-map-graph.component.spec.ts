import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapGraphComponent } from './world-map-graph.component';

describe('WorldMapGraphComponent', () => {
  let component: WorldMapGraphComponent;
  let fixture: ComponentFixture<WorldMapGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldMapGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
