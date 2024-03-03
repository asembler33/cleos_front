import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbModal, NgbModalOptions, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { modalOptions } from '../../../common/modal-options';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { UsersService } from '../../../services/users.service';
import { ProfesionService } from '../../../services/profesion.service';
import { RolesService } from '../../../services/roles.service';
import { environment } from 'src/environments/environment';
import {  ServiciosUsuariosClass } from './servicios-usuarios.class';
import { ConectionCleosService } from 'src/app/services/conection-cleos.service';


interface Users {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  username: string;
  telefono: string;
  email: string;
  avatar: string;
  nombre_rol: string;
}

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['../../../app.component.scss']
})



export class TrabajadoresComponent implements OnInit {

  rowsTrabajador: Users[] = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[]
  title:string;
  formTrabajadores: FormGroup;
  formProfesion: FormGroup;
  titleActionForm: string;
  modalRefTrabajadores: NgbModalRef;
  modalRefProfesiones: NgbModalRef;
  idTrabajador: any;
  idProfesion: any;
  rolesRows: any = [];
  rowsProfesiones: any[] = [];
  arrayProfesiones: any = [];
  avatarImagen: File | null = null;
  avatar: string = "";
  mostrarMiniatura: boolean = false;
  nombreUsuario: any;

  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private apiCleos: UsersService, private apiProfesion: ProfesionService, private apiRoles:RolesService, public especialidadService: ConectionCleosService) { }
  
  claseServicio: ServiciosUsuariosClass = new ServiciosUsuariosClass(this.formBuilder, this.modalService, this.especialidadService);
   modalOptions: NgbModalOptions = {
    backdrop: 'static', // Evita que el modal se cierre al hacer clic fuera de él
    keyboard: false,
    size: 'lg', 
    ariaLabelledBy: 'modal-basic-title'     
  };

  ngOnInit(): void {

    this.formTrabajadores = this.formBuilder.group({
      
      rut: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombres: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rol: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      profesiones: ['', Validators.required],
      prestadorServicio: ['', Validators.required],
    });

    this.formProfesion =  this.formBuilder.group({
      profesion : ['', Validators.required]
    })

    this.apiProfesion.listProfesiones().subscribe((data) => {
      this.rowsProfesiones = [...data];
      this.arrayProfesiones = [...data];
    });

    this.apiRoles.listRoles().subscribe((data) => {
      this.rolesRows = [...data];
     });

    this.apiCleos.listUsers().subscribe((data) => { 
      console.log(data);
      this.rowsTrabajador =  [...data];
    }); 
  }


  editTrabajadores(row:any, content: any): void {
    this.title = 'Editar Trabajador';
    this.titleActionForm = 'Editar';
    this.mostrarMiniatura = true;
		this.modalRefTrabajadores = this.modalService.open(content, this.modalOptions);
    let prestador:any = '';

    this.apiCleos.getUser(row).subscribe(response => {
      console.log(response);
      this.formTrabajadores.get('usuario')?.setValue(response.username);
      this.formTrabajadores.get('rut')?.setValue(response.rut);
      this.formTrabajadores.get('nombres')?.setValue(response.nombres);
      this.formTrabajadores.get('paterno')?.setValue(response.apellido_paterno);
      this.formTrabajadores.get('materno')?.setValue(response.apellido_materno);
      this.formTrabajadores.get('direccion')?.setValue(response.direccion);
      this.formTrabajadores.get('telefono')?.setValue(response.telefono);
      this.formTrabajadores.get('correo')?.setValue(response.email);
      this.formTrabajadores.get('rol')?.setValue(response.id_rol);
      this.formTrabajadores.get('profesiones')?.setValue(response.id_profesion);

      if ( response.prestador_servicio === 1  ){
          prestador = "Si";
      }else{
          prestador = "No";
      }

      this.idTrabajador = response.id;

      this.formTrabajadores.get('prestadorServicio')?.setValue(prestador);
      this.avatar = (environment as any).URL_IMAGE +`${response.avatar}`;
    });
  }

  editProfesion(row:any){
    this.titleActionForm = 'Editar';
    this.apiProfesion.getProfesion(row).subscribe((data) => {
      console.log(data);
      this.idProfesion = data.id;
      this.formProfesion.get('profesion')?.setValue(data.profesion);
    });

  }

  deleteTrabajadores(row:any): void {

    Swal.fire({
      title: '¿Desea eliminar el trabajador?',
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

        const index = this.rowsTrabajador.findIndex(fila => fila.id === row);
        this.rowsTrabajador.splice(index, 1);  
        this.apiCleos.deleteUser(row);
        this.rowsTrabajador = [...this.rowsTrabajador];
        
      }

    })

  }

  deleteProfesion(row:any): void {

    Swal.fire({
      title: '¿Desea eliminar la profesion?',
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

        const index = this.rowsProfesiones.findIndex((fila: { id: any; }) => fila.id === row);
        this.rowsProfesiones.splice(index, 1);  
        this.apiProfesion.deleteProfesion(row).subscribe(data => {
          
          this.rowsProfesiones = [...this.rowsProfesiones];
        });

        this.titleActionForm = "Grabar";
        this.formProfesion.reset();
      }

    })

  }

  openFormModalTrabajadores(content: TemplateRef<any>): void {

    this.title = 'Agregar Trabajador';
    this.titleActionForm = 'Grabar';
		this.modalRefTrabajadores = this.modalService.open(content, modalOptions);

  }

  openFormModalProfesion(content: any): void {

    this.title = 'Agregar Profesión';
    this.titleActionForm = 'Grabar';
		this.modalRefProfesiones = this.modalService.open(content, this.modalOptions);

  }

  cerrarFormModalTrabajadores(){

    this.formTrabajadores.reset();
    this.modalRefTrabajadores.close();
  }

  cerrarFormModalProfesion(){

    this.formTrabajadores.reset();
    this.modalRefProfesiones.close();
  }

  saveTrabajador(): void{

    const valoresFormularioTrabajadores = this.formTrabajadores.value;
    const formData:any = new FormData();

    formData.append("rut", valoresFormularioTrabajadores.rut);
    formData.append("usuario", valoresFormularioTrabajadores.usuario);
    formData.append("clave", valoresFormularioTrabajadores.clave);
    formData.append("nombres", valoresFormularioTrabajadores.nombres);
    formData.append("paterno", valoresFormularioTrabajadores.paterno);
    formData.append("materno", valoresFormularioTrabajadores.materno);
    formData.append("direccion", valoresFormularioTrabajadores.direccion);
    formData.append("telefono", valoresFormularioTrabajadores.telefono);
    formData.append("correo", valoresFormularioTrabajadores.correo);
    formData.append("profesiones", valoresFormularioTrabajadores.profesiones);
    formData.append("prestadorServicio", valoresFormularioTrabajadores.prestadorServicio);
    formData.append("rol", valoresFormularioTrabajadores.rol);
    
    formData.append("avatar", this.avatarImagen as Blob);

    if ( this.titleActionForm === 'Grabar'){

      this.apiCleos.saveUser(formData).subscribe(data => {

          this.rowsTrabajador = [...data];
      });
      
    }else{
      
      formData.append("id", this.idTrabajador);
      this.apiCleos.updateUser(this.idTrabajador, formData).subscribe(data => {
          console.log(data);
          this.rowsTrabajador = [...data];
      });


    }

  }

  saveProfesion(): void{

    if ( this.titleActionForm === 'Grabar'){

      this.apiProfesion.saveProfesiones(this.formProfesion.value).subscribe(data => {
        this.rowsProfesiones = [...data];
      });

    }else{   

      this.apiProfesion.updateProfesion(this.formProfesion.value,this.idProfesion).subscribe(data => {
        this.rowsProfesiones = [...data];
      });
    }

    this.formProfesion.reset();

  }

  onFileSelected(event:any): void {
    this.avatarImagen = event.target.files[0];
  }
 
  devuelveImagen(avatar:any):string {
    return (environment as any).URL_IMAGE +`${avatar}`;
  }



}
