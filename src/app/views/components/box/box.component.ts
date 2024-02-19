import { Component, OnInit, Input } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { BoxService } from '../../../services/box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { modalOptions } from '../../../common/modal-options';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['../../../app.component.scss']
})

export class BoxComponent implements OnInit {


  @Input() idSucursalOrigen: string;

  constructor( private apiBox: BoxService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  

  rowsBoxes: any[] = [];
  comunasRows: any[] = [];
  regionesRows: any[] = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns:any[]
  title_sucursal:string;
  title:string;
  formSucursales: FormGroup;
  formBox: FormGroup;
  titleActionForm: string;
  idBox: any;
  

  ngOnInit(): void {

    this.title = 'Box';
    this.titleActionForm = 'Grabar';

    this.formBox = this.formBuilder.group({
      idBox: ['',],
      idSucursalOrigen: ['', ],
      nombreBox: ['', Validators.required],
      numeroBox: ['', Validators.required],
      piso: ['', Validators.required],
      contacto: ['', ],
      detalle: ['', ],
    });

    this.formBox.get('idSucursalOrigen')?.setValue(this.idSucursalOrigen);
    
    this.apiBox.listBox(this.idSucursalOrigen).subscribe(rows => {
      console.log(rows);
      this.rowsBoxes = rows;
    });


  }


  editBox(row:any) {

    this.titleActionForm = 'Editar';
    
    this.apiBox.getBox(row).subscribe(data => {
      
      this.formBox.get('nombreBox')?.setValue( data.nombre_box );
      this.formBox.get('numeroBox')?.setValue( data.numero_box );
      this.formBox.get('piso')?.setValue( data.piso );
      this.formBox.get('contacto')?.setValue( data.contacto );
      this.formBox.get('detalle')?.setValue( data.detalle );
      this.formBox.get('idBox')?.setValue( data.id);
      this.formBox.get('idSucursalOrigen')?.setValue(this.idSucursalOrigen);
    });
    
  }

  deleteBox(row:any) {

    Swal.fire({
      title: '¿Desea eliminar el Box?',
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
        const index = this.rowsBoxes.findIndex(fila => fila.id === row);
        this.rowsBoxes.splice(index, 1);

        this.apiBox.deleteBox(row).subscribe(data => {
          this.rowsBoxes = [...this.rowsBoxes];
        });

        this.formBox.reset();

      }
    })
  }

  saveBox(){

    if ( this.titleActionForm === 'Grabar'){

      this.apiBox.saveBox(this.formBox.value).subscribe(data => {
        this.rowsBoxes = [...data];
      });

    }else{   
      
      this.apiBox.updateBox(this.formBox.value, this.formBox.get('idBox')?.value).subscribe(data => {
        this.rowsBoxes = [...data];
      });
    }

    this.formBox.reset();
    

  }

  cerrarModal():void {
    this.activeModal.close();
  }

}
