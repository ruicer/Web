import { NgModule } from '@angular/core';
/* router module */
import { RouterModule } from '@angular/router';
/* router module */

/* router module */
import { GestionesRoutes } from './gestiones.routes';

/* router module */


/* components angular material*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatNativeDateModule, MatAutocompleteModule
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { AsignacionPermisos } from '../services/AsignacionPermisos';
import { NomenglaturaComponent } from './components/nomenglatura/nomenglatura.component';
import { NomenglaturaDialog } from './components/nomenglatura/nomenglatura-dialog/nomenglatura-dialog.component';
import { TipoGestionComponent } from './components/tipoGestion/tipoGestion.component';
import { TipoGestionDialog } from './components/tipoGestion/tipoGestion-dialog/tipoGestion-dialog.component';
import { BienesDialog } from './components/bienes/bienes-dialog/bienes-dialog.component';
import { BienesComponent } from './components/bienes/bienes.component';
import { AbonosComponent } from './components/abonos/abonos.component';
import { AbonosDialog } from './components/abonos/abonos-dialog/abonos-dialog.component';
import { TipoCargoDialog } from './components/tipoCargo/tipoCargo-dialog/tipoCargo-dialog.component';
import { TipoCargoComponent } from './components/tipoCargo/tipoCargo.component';
import { IncobrablesComponent } from './components/incobrables/incobrables.component';
import { ReversasComponent } from './components/reversas/reversas.component';
import { ReportesRoutes } from '../reportes/reportes.routes';
import {  AsignacionUsuarioComponent } from './components/asignacionUsuario/asignacionUsuario..component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ReportesService } from '../services/reportes.service';
import { UsuariosDialog } from './components/usuarios/usuarios-dialog/usuarios-dialog.component';


/*components angular material */


@NgModule({
  declarations: [
      AsignacionComponent,
      NomenglaturaComponent,
      NomenglaturaDialog,
      TipoGestionComponent,
      TipoGestionDialog,
      BienesDialog,
      BienesComponent,
      AbonosComponent,
      AbonosDialog,
      TipoCargoDialog,
      TipoCargoComponent,
      IncobrablesComponent,
      ReversasComponent,
      AsignacionUsuarioComponent,
      UsuariosComponent,
      UsuariosDialog
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule.forChild(GestionesRoutes),
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    FormsModule,
    MatTooltipModule,
    MatAutocompleteModule

  ],
  entryComponents: [
    NomenglaturaDialog,
    TipoGestionDialog,
    BienesDialog,
    AbonosDialog,
    TipoCargoDialog,
    UsuariosDialog
  ],
  providers: [
    AsignacionPermisos,
    ReportesService
  ],
})
export class GestionesModule { }