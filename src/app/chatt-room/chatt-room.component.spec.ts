import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattRoomComponent } from './chatt-room.component';

describe('ChattRoomComponent', () => {
  let component: ChattRoomComponent;
  let fixture: ComponentFixture<ChattRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChattRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChattRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
