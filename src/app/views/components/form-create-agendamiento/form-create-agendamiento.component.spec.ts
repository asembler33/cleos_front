import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAgendamientoComponent } from './form-create-agendamiento.component';

describe('FormCreateAgendamientoComponent', () => {
  let component: FormCreateAgendamientoComponent;
  let fixture: ComponentFixture<FormCreateAgendamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateAgendamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
