import { Component, OnInit, DoCheck, TemplateRef } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalOptions, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionCleosService } from '../../../services/conection-cleos.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { modalOptions } from '../../../common/modal-options';
import { Observable } from 'rxjs';

interface iServicios {
  id: number;
  nombreServicio: string;
  especialidad: string;
  precio: string;
  duracion: string;
  preparacionPrevia: string;
  descripcion: string;
}


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit{

  rowsServicios :any = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[];
  data$: Observable<any[]>;
  title:string;
  previousData: any[] = [];
  modalRef: NgbModalRef;
  formServicios: any;
  formEspecialidad: any;
  especialidadRows: any;
  duracionRows: any;
  titleActionForm: string;
  idEspecialidad: any;
  rowsEspecialidad: any;
  idServicio: any;
  opcionSeleccionada: { id: null; especialidad: string; };

  constructor(private formBuilder: FormBuilder,private apiCleos: ConectionCleosService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal) { }


  ngOnInit(): void{

    this.getServicios();
    this.formServicios = this.formBuilder.group({

      nombreServicio: ['', Validators.required],
      especialidad: [null, Validators.required],
      descripcion: ['', Validators.required],
      preparacionPrevia: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: [null, Validators.required],
    });

    this.formEspecialidad = this.formBuilder.group({ 
      especialidad : ['', Validators.required]
    });

    this.apiCleos.listEspecialidades().subscribe((data) => {
      console.log(data);
      this.especialidadRows = [...data];
    });

    this.apiCleos.listDuracion().subscribe((data) => {
      this.duracionRows = data;
    });


    
  }

  guardarServicio(){

    const valuesFormServicio = this.formServicios.value;
    
    const formData:any = new FormData();

    formData.append("nombreServicio", valuesFormServicio.nombreServicio);
    formData.append("especialidad", valuesFormServicio.especialidad);
    formData.append("precio", valuesFormServicio.precio);
    formData.append("duracion", valuesFormServicio.duracion);
    formData.append("descripcion", valuesFormServicio.descripcion);
    formData.append("preparacionPrevia", valuesFormServicio.preparacionPrevia);

    if ( this.titleActionForm === 'Grabar' ) {
      this.apiCleos.saveServicio(formData).subscribe(data => {
        this.rowsServicios = [...data];
      });
    }else{

      this.apiCleos.updateServicio(this.idServicio, valuesFormServicio).subscribe(data => {
        this.rowsServicios = [...data];
      });
    }

    this.formServicios.reset();  
    this.modalRef.close(); 
    
  }

  editServicio(row:any, content:any) {

    this.title = 'Editar Servicio';
    this.titleActionForm = 'Editar';
    
		this.modalRef = this.modalService.open(content, modalOptions);
    this.apiCleos.getServicio(row).subscribe( data => {
        // console.log(data);
        this.idServicio = data.id;
        this.formServicios.get('nombreServicio').setValue(data.servicio);
        this.formServicios.get('especialidad').setValue(data.id_especialidad);
        this.formServicios.get('precio').setValue(data.precio);
        this.formServicios.get('duracion').setValue(data.id_duracion);
        this.formServicios.get('descripcion').setValue(data.descripcion);
        this.formServicios.get('preparacionPrevia').setValue(data.preparacion_previa);
    });

  }

  deleteServicio(row:any) {

    Swal.fire({
      title: '¿Desea eliminar el servicio?',
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
        const index = this.rowsServicios.findIndex((fila: { id: any; }) => fila?.id === row);
        this.rowsServicios.splice(index, 1);

        this.apiCleos.deleteServicio(row).subscribe(data => {
          console.log(data);
          this.rowsServicios = [...this.rowsServicios];
        });
      }
    })
  }


  getServicios(){

    this.apiCleos.listServicios().subscribe(data => {
      
      this.rowsServicios =data;
      
    });

  }

  editEspecialidad(row:any) {

    console.log(row);

    this.title = 'Editar Especialidad';
    this.titleActionForm = 'Editar';
    this.apiCleos.getEspecialidad(row).subscribe(data => {
      this.formEspecialidad.get('especialidad')?.setValue(data.especialidad);
      this.idEspecialidad = data.id;
    });
    

  }

  deleteEspecialidad(row:any) {
    Swal.fire({
      title: '¿Desea eliminar la especialidad?',
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
        const index = this.especialidadRows.findIndex((fila: { id: any; }) => fila.id === row);
        this.especialidadRows.splice(index, 1);  
        this.apiCleos.deleteEspecialidad(row).subscribe(data => {
          console.log(data);
          this.especialidadRows = [...this.especialidadRows];
        });

      }
    })
  }

  saveEspecialidad(){

    if (this.formEspecialidad.valid) {
      const especialidad = this.formEspecialidad.value;

      if ( this.titleActionForm === 'Grabar'){

        this.apiCleos.saveEspecialidad(especialidad).subscribe(data => {
          this.especialidadRows = [...data];
        });

      }else{
        
        this.apiCleos.updateEspecialidad(this.idEspecialidad,especialidad).subscribe(data => {
          this.especialidadRows = [...data];
        });
      }

      this.formEspecialidad.reset();
      
    }

  }

  openFormModalEspecialidad(content: TemplateRef<any>): void{

    this.title = 'Especialidades';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, modalOptions);
    
  }

  openFormModalServicio(content: TemplateRef<any>): void{

    this.title = 'Servicio';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, modalOptions);

  }

  limpiarInputs():void {

    this.formServicios.reset();

  }

}


