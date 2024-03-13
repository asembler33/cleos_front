import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { modalOptions } from '../../../common/modal-options';
import { ConectionCleosService } from '../../../services/conection-cleos.service';

@Injectable({
    providedIn: 'root',
  })

export class ServiciosUsuariosClass  {


    formServiciosTrabajadores: FormGroup;
    modalRefServiciosTrabajadores: NgbModalRef;
    titleForModalServiciosTrabajadores: String;
    listaEspecialidades: any[];
    arrayServicioTrabajadores: any[];

    constructor(private formBuilder: FormBuilder, private modalService: NgbModal, public especialidadService: ConectionCleosService){
        this.formServiciosTrabajadores = this.formBuilder.group({});
    } 

    saveServiciosaUsuarios():void {

    }
    
    formOpenModalServiciosTrabajadores(idUsuario:any, content: TemplateRef<any>):void{

        this.modalRefServiciosTrabajadores = this.modalService.open( content, modalOptions );
        this.titleForModalServiciosTrabajadores = 'Asignar Servicios a Trabajadores';
        this.especialidadService.listEspecialidades().subscribe(data => {
            console.log(data);
            this.listaEspecialidades = [...data];
        });

        // this.especialidadService.listServiciosEspecialidad(idEspecialidad).subscribe(row => {
        //     console.log(row);
        //     this.arrayServicioTrabajadores = row;
        // });

    }

    closeFormModalServiciosTrabajadores():void{

    }



}
