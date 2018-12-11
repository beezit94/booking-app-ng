import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsListItemComponent } from './rentals-list-item.component';

describe('RentalsListItemComponent', () => {
  let component: RentalsListItemComponent;
  let fixture: ComponentFixture<RentalsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
