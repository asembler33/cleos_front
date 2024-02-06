import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ProfesionService } from '../../../services/profesion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.scss']
})
export class ProfesionesComponent implements OnInit {

  rowsProfesiones: any[] = [];
  comunasRows: any[] = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[]
  title_profesiones:string;
  formProfesiones: FormGroup;
  titleActionForm: string;
  modalRef: NgbModalRef;
  idSucursal: any;
  idProfesion: any;


  constructor(private modalService: NgbModal,private apiCleos: ProfesionService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formProfesiones = this.formBuilder.group({
      profesion: ['', Validators.required],
    });

    this.apiCleos.listProfesiones().subscribe(data => {
      this.rowsProfesiones = data;
    });

  }


  openFormModalProfesion(content: any) {
    this.title_profesiones = 'Agregar Profesión';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  editProfesion(row:any, content: any) {

    // console.log(nombreEspecialidad);
    this.title_profesiones = 'Editar Profesión';
    this.titleActionForm = 'Editar';
    this.apiCleos.getProfesion(row).subscribe(data => {

      console.log(data);
      this.formProfesiones.get('profesion')?.setValue(data.profesion);
      this.idProfesion = data.id;

    });
    
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  deleteProfesion(row:any) {

    Swal.fire({
      title: '¿Desea eliminar la profesión?',
      icon: 'warning',
      iconColor : '#48BD62',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor : '#CFF878',
      showCancelButton: true,
      heightAuto : false,
      allowOutsideClick: false
    }).then( (result) => {
      if (result.isConfirmed) {

        const index = this.rowsProfesiones.findIndex(fila => fila.id === row);
        this.rowsProfesiones.splice(index, 1);  
        this.apiCleos.deleteProfesion(row).subscribe(data => {
          console.log(data);
          this.rowsProfesiones = [...this.rowsProfesiones];
        });
      }

    })
  }

  saveProfesion(){

    console.log(this.idProfesion);
    if (this.formProfesiones.valid) {

      if ( this.titleActionForm === 'Grabar'){

        this.apiCleos.saveProfesiones(this.formProfesiones.value).subscribe(data => {
          this.rowsProfesiones = [...data];
        });

      }else{
        
        this.apiCleos.updateProfesion(this.formProfesiones.value, this.idProfesion).subscribe(data => {
          this.rowsProfesiones = [...data];
        });
      }

      this.formProfesiones.reset();
      this.modalRef.close();
    }

  }



}
