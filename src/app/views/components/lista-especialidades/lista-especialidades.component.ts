import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ConectionCleosService } from '../../../services/conection-cleos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.scss']
})

export class ListaEspecialidadesComponent implements OnInit {
  rows: any[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  closeResult = '';
  title_especialidades: string;
  actionsTpl : string;
  columns:any[];
  formEspecialidad: FormGroup;
  textoEspecialidad: string;
  modalRef: NgbModalRef
  titleActionForm:string;
  idEspecialidad:any;
  constructor(private modalService: NgbModal, private apiCleos: ConectionCleosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formEspecialidad = this.formBuilder.group({
      especialidad: ['', Validators.required],
    });
    
    this.apiCleos.listEspecialidades().subscribe(res => {
        console.log(res);
        this.rows = res;
    })

    this.actionsTpl = '<ng-template let-row="row" ngx-datatable-cell-template>' +
    '  <button (click)="edit(row)" class="btn btn-primary btn-sm">Editar</button>' +
    '  <button (click)="delete(row)" class="btn btn-danger btn-sm">Eliminar</button>' +
    '</ng-template>';

    this.columns = [
      { prop: 'especialidad', name: 'Especialidad' }
    ];

  }

  

  open(content: any) {
    this.title_especialidades = 'Agregar Especialidad';
    this.titleActionForm = 'Grabar';
		this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  editEspecialidad(row:any, content: any, nombreEspecialidad:any) {

    console.log(nombreEspecialidad);
    this.title_especialidades = 'Editar Especialidad';
    this.titleActionForm = 'Editar';
    this.formEspecialidad.get('especialidad')?.setValue(nombreEspecialidad);
    // this.formEspecialidad.get('idEspecialidad')?.setValue(row);
    this.idEspecialidad = row;
    
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  deleteEspecialidad(row:any) {

    const index = this.rows.findIndex(fila => fila.id === row);
    this.rows.splice(index, 1);  
    this.apiCleos.deleteEspecialidad(row).subscribe(data => {
      console.log(data);
      this.rows = [...this.rows];
    });

  }

  saveEspecialidad(){

    if (this.formEspecialidad.valid) {
      const especialidad = this.formEspecialidad.value;

      if ( this.titleActionForm === 'Grabar'){

        this.apiCleos.saveEspecialidad(especialidad).subscribe(data => {
          this.rows = [...data];
        });

      }else{
        
        console.log(this.idEspecialidad);
        this.apiCleos.updateEspecialidad(this.idEspecialidad,especialidad).subscribe(data => {
          this.rows = [...data];
        });
      }

      this.formEspecialidad.reset();
      this.modalRef.close();
    }

  }


}
