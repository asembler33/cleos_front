import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
    providedIn: 'root',
  })

export class ServiciosUsuariosClass  {


    formServiciosTrabajadores: FormGroup;

    constructor(private formBuilder: FormBuilder){
        this.formServiciosTrabajadores = this.formBuilder.group({});
    } 

   
        
        // 

    

    saveServiciosaUsuarios():void {

    }    


}
