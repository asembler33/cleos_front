import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../../services/roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  rowsRol: any[] = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[]
  title_roles:string;
  formRoles: FormGroup;
  titleActionForm: string;
  modalRef: NgbModalRef;
  idRol: any;

  constructor(private modalService: NgbModal,private apiCleos: RolesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formRoles = this.formBuilder.group({
      rol: ['', Validators.required],
    });

    this.apiCleos.listRoles().subscribe(res => {
       console.log(res);
       this.rowsRol = [...res];
      }, err => console.log(err) 
     );  

  }

  openFormModalRol(content: any) {
    this.title_roles = 'Agregar Rol';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  editRol(row:any, content: any) {

    // console.log(nombreEspecialidad);
    this.title_roles = 'Editar Rol';
    this.titleActionForm = 'Editar';
    this.apiCleos.getRol(row).subscribe(data => {

      console.log(data);
      this.formRoles.get('rol')?.setValue(data.nombre_rol);
      this.idRol = data.id;

    });
    
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  deleteRol(row:any) {

    Swal.fire({
      title: '¿Desea eliminar el Rol?',
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

        const index = this.rowsRol.findIndex(fila => fila.id === row);
        this.rowsRol.splice(index, 1);  
        this.apiCleos.deleteRol(row).subscribe(data => {
          console.log(data);
          this.rowsRol = [...this.rowsRol];
        });
      }

    })
  }

  saveRol(){

    if (this.formRoles.valid) {

      if ( this.titleActionForm === 'Grabar'){

        this.apiCleos.saveRol(this.formRoles.value).subscribe(data => {
          console.log(data);
          this.rowsRol = [...data];
        });

      }else{
        
        this.apiCleos.updateRol(this.formRoles.value, this.idRol).subscribe(data => {
          this.rowsRol = [...data];
        });
      }

      this.formRoles.reset();
      this.modalRef.close();
    }

  }




}
