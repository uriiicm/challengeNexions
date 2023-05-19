import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormsListComponent } from './client-forms-list.component';

describe('ClientFormsListComponent', () => {
  let component: ClientFormsListComponent;
  let fixture: ComponentFixture<ClientFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFormsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
