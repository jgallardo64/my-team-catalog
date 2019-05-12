import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLineupComponent } from './create-lineup.component';

describe('CreateLineupComponent', () => {
  let component: CreateLineupComponent;
  let fixture: ComponentFixture<CreateLineupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
