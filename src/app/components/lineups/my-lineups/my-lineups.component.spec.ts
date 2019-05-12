import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLineupsComponent } from './my-lineups.component';

describe('MyLineupsComponent', () => {
  let component: MyLineupsComponent;
  let fixture: ComponentFixture<MyLineupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLineupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLineupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
