import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ConectionSucursalesService } from '../../../services/sucursales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modalOptions } from '../../../common/modal-options';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { BoxComponent } from '../box/box.component';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  rowsSucursales: any[] = [];
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
  modalRef: NgbModalRef;
  idSucursal: any;
  idBox: any;
  idSucursalOrigen:any;
  
  
  constructor(private modalService: NgbModal, private apiCleos: ConectionSucursalesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder  ) { }

  ngOnInit(): void {

    this.formSucursales = this.formBuilder.group({
      sucursal: ['', Validators.required],
      numeroBox: ['', ],
      regionesRows: [null, Validators.required],
      comuna: [null, Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    });


    this.apiCleos.listSucursales().subscribe(sucursales => {
      console.log(sucursales);
      this.rowsSucursales = sucursales;
    });

    this.apiCleos.listRegiones().subscribe(regiones => {
      this.regionesRows = regiones;
    });


  }

  editSucursal(row:any, content: any) {

    this.title_sucursal = 'Editar Sucursal';
    this.titleActionForm = 'Editar';
    this.apiCleos.getSucursal(row).subscribe(data => {
      this.idSucursal = data.id;
      this.formSucursales.get('sucursal')?.setValue( data.nombre_sucursal );
      this.formSucursales.get('numeroBox')?.setValue( data.box );
      this.formSucursales.get('regionesRows')?.setValue( data.id_region );
      this.formSucursales.get('comuna')?.setValue( data.comuna_id );
      this.formSucursales.get('direccion')?.setValue( data.direccion );
      this.formSucursales.get('telefono')?.setValue( data.telefono );
      this.formSucursales.get('correo')?.setValue( data.correo );

    });
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  deleteSucursal(row:any) {

    Swal.fire({
      title: '¿Desea eliminar la Sucursal?',
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

        this.apiCleos.deleteSucursal(row).subscribe(data => {

          if (data != 1){
            const index = this.rowsSucursales.findIndex(fila => fila.id === row);
            this.rowsSucursales.splice(index, 1);

            this.rowsSucursales = [...this.rowsSucursales];
          }else{

            Swal.fire({
              title: 'No se puede eliminar la sucursal, primero elimine los box.',
              icon: 'error',
              iconColor : '#48BD62',
              confirmButtonColor : '#CFF878',
              showCancelButton: false,
              heightAuto : false,
              allowOutsideClick: false
            })

          }
        });
      }
    })
  }
  
  saveSucursal(){

    if ( this.titleActionForm === 'Grabar'){

      this.apiCleos.saveSucursales(this.formSucursales.value).subscribe(data => {

        this.rowsSucursales = [...data];
      });

    }else{
 
      this.apiCleos.updateSucursales(this.idSucursal,this.formSucursales.value).subscribe(data => {
    
        this.rowsSucursales = [...data];
      });
    }

    this.formSucursales.reset();
    this.modalRef.close();

  }

  abrirFormModalSucursal(content:any){

    this.title_sucursal = 'Agregar Sucursal';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, modalOptions);
    this.formSucursales.reset();
  }

  openFormModalBox(idSucursal: any){
    
    
		this.modalRef = this.modalService.open( BoxComponent, { backdrop: 'static',
    keyboard: false,
    size: 'lg',
    ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.componentInstance.idSucursalOrigen = idSucursal;
  }


  onRegionSelected(event:any){

    this.apiCleos.getComuna(event).subscribe(data => {
        console.log(data);
        this.comunasRows = data;
    });

  }


}
