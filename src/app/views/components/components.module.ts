import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Routes, RouterModule } from '@angular/router';
import {ListaEspecialidadesComponent} from './lista-especialidades/lista-especialidades.component';
import { ConectionCleosService } from '../../services/conection-cleos.service';
import { BoxService } from '../../services/box.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiciosComponent } from './servicios/servicios.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ConectionSucursalesService } from 'src/app/services/sucursales.service';
import { ProfesionesComponent } from './profesiones/profesiones.component';
import { ProfesionService } from 'src/app/services/profesion.service';
import { ClientesComponent } from './clientes/clientes.component';
import { NgbDatepicker, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from 'src/app/services/clientes.service';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { RolesComponent } from './roles/roles.component';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { BoxComponent } from './box/box.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

// delete DEFAULT_DROPZONE_CONFIG.url;
// import { NgxDropzoneWrapperComponent } from './ngx-dropzone-wrapper/ngx-dropzone-wrapper.component';

const routes: Routes = [
  {
    path: 'lista-especialidades',
    component: ListaEspecialidadesComponent
    
  },
  {
    path: 'servicios',
    component: ServiciosComponent
    
  },
  {
    path: 'sucursales',
    component: SucursalesComponent
    
  },
  {
    path: 'profesiones',
    component: ProfesionesComponent
    
  },
  {
    path: 'clientes',
    component: ClientesComponent
    
  },
  {
    path: 'trabajadores',
    component: TrabajadoresComponent
    
  },
  {
    path: 'roles',
    component: RolesComponent
    
  },
  {
    path: 'box',
    component: BoxComponent
    
  },

]


@NgModule({
  declarations: [ListaEspecialidadesComponent, ServiciosComponent, SucursalesComponent, ProfesionesComponent, ClientesComponent, TrabajadoresComponent, RolesComponent, BoxComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule, 
    NgbDatepickerModule,
    DropzoneModule
  ],
  providers: [ConectionCleosService, ConectionSucursalesService, ProfesionService, ClientesService, UsersService, RolesService, BoxService,{
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class ComponentsModule { }
