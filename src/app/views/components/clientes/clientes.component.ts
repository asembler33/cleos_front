import { Component, OnInit, inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbDateAdapter, NgbModal, NgbModalRef, NgbModalOptions, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct, NgbDatepickerI18n , NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { modalOptions } from '../../../common/modal-options';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { CustomDatepickerI18n } from './calendar.component';




@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ClientesComponent implements OnInit {

  rowsClientes: any[] = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[]
  title:string;
  formCliente: FormGroup;
  titleActionForm: string;
  modalRef: NgbModalRef;
  idSucursal: any;
  idCliente: any;
  selectedDate: NgbDateStruct;
  formClientes: FormGroup;
  fechaSeleccionada: NgbDateStruct;
  fechaActual: NgbDateStruct;
  formatoFecha: any = { day: '2-digit' , month: '2-digit', year: 'numeric' };
  today = inject(NgbCalendar).getToday();
  date: { year: number; month: number };
  fechaMinima: NgbDate;
  

  constructor(private ngbCalendar: NgbCalendar, private modalService: NgbModal,private apiCleos: ClientesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private dateAdapter: NgbDateAdapter<string>, config: NgbDatepickerConfig) {
    
    this.fechaMinima = new NgbDate(1900,1,1);
    
    this.fechaSeleccionada = this.ngbCalendar.getToday();

    // config.dayTemplate = '{day}';
    // config.monthTemplate = '{month}';
    // config.yearTemplate = '{year}';
    
    config.displayMonths = 1;
    config.navigation = 'select';
    config.showWeekNumbers = false;
  }

  

  ngOnInit(): void {
    
    this.formCliente = this.formBuilder.group({
      rut: ['', Validators.required],
      nombres: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required]
    });

    this.apiCleos.listClientes().subscribe(data => {
      console.log(data);
      this.rowsClientes =  data;
    });

  }

  configurarDatePicker() {
    // Configurar el formato del DatePicker
    const config = {
      dayTemplate: '{day}',
      monthTemplate: '{month}',
      yearTemplate: '{year}',
      displayMonths: 2,
      navigation: 'select',
      showWeekNumbers: false,
    };

    return config;
  }

  openFormModalClientes(content: any){

    this.title = 'Agregar Cliente';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content,  modalOptions );

  }

  editCliente(row:any, content: any) {

    this.title = 'Editar Cliente';
    this.titleActionForm = 'Editar';
    
    this.apiCleos.getClientes(row).subscribe(data => {

      console.log(data);
      this.formCliente.get('rut')?.setValue(data.rut);
      this.formCliente.get('nombres')?.setValue(data.nombres);
      this.formCliente.get('paterno')?.setValue(data.apellido_paterno);
      this.formCliente.get('materno')?.setValue(data.apellido_materno);
      const fecha = data.fecha_nacimiento.split('-');
      this.fechaSeleccionada = {day: parseInt(fecha[2], 10) , month: parseInt(fecha[1], 10), year: parseInt(fecha[0],10) };
      console.log(this.fechaSeleccionada);
      this.formCliente.get('direccion')?.setValue(data.direccion);
      this.formCliente.get('telefono')?.setValue(data.telefono);
      this.formCliente.get('correo')?.setValue(data.correo);
      this.idCliente = data.id;
      
    });
    
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  deleteCliente(row:any) {

    Swal.fire({
      title: '¿Desea eliminar el cliente?',
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

        const index = this.rowsClientes.findIndex(fila => fila.id === row);
        this.rowsClientes.splice(index, 1);  
        this.apiCleos.deleteCliente(row).subscribe(data => {
          console.log(data);
          this.rowsClientes = [...this.rowsClientes];
        });
      }

    })
  }

  saveCliente(){ 

    if (this.formCliente.valid) {

      const dia = this.formCliente.get('fechaNacimiento')?.value.day;
      const mes = this.formCliente.get('fechaNacimiento')?.value.month;
      const ano = this.formCliente.get('fechaNacimiento')?.value.year;
      
      this.formCliente.get('fecha_nacimiento')?.setValue( ano+'-'+mes+'-'+dia);

      const formData = new FormData();
      const valueForms = this.formCliente.value;
        
      formData.append("rut", valueForms.rut);
      formData.append("nombres", valueForms.nombres);
      formData.append("paterno", valueForms.paterno);
      formData.append("materno", valueForms.materno);
      formData.append("fecha_nacimiento",ano+'-'+mes+'-'+dia);
      formData.append("telefono",valueForms.telefono);
      formData.append("direccion",valueForms.direccion);
      formData.append("correo",valueForms.correo);
      const formDataJson:any = {};

      formData.forEach((valor, clave) => {
        formDataJson[clave] = valor;
      });

      if ( this.titleActionForm === 'Grabar'){
        this.apiCleos.saveClientes(formDataJson).subscribe(data => {
          this.rowsClientes = [...data];
        });

      }else{
        
        this.apiCleos.updateCliente(formDataJson, this.idCliente).subscribe(data => {
          this.rowsClientes = [...data];
        });
      }

      this.formCliente.reset();
      this.modalRef.close();
    }

  }

  private getNgbDate(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // Month is zero-based
      day: date.getDate(),
    };
  }

  closeModal() {

    this.formCliente.reset();
    this.modalRef.close();

  }


}
