import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersCompareComponent } from './players-compare.component';

describe('PlayersCompareComponent', () => {
  let component: PlayersCompareComponent;
  let fixture: ComponentFixture<PlayersCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
