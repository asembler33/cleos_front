import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-create-agendamiento',
  templateUrl: './form-create-agendamiento.component.html',
  styleUrls: ['./form-create-agendamiento.component.scss']
})
export class FormCreateAgendamientoComponent implements OnInit {

  formCrearAgendamiento:FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  saveAgendamiento(): void {

    

  }

}
