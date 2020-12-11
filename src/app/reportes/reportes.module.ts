import { NgModule } from '@angular/core';
/* router module */
import { RouterModule } from '@angular/router';
/* router module */

/* router module */

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
import { ReportesRoutes } from './reportes.routes';
import { ContactabilidadComponent } from './components/contactabilidad/contactabilidad.component';
import { LlamadaService } from '../services/llamada.service';
import { ReportesService } from '../services/reportes.service';
import { DetalleCreditosComponent } from './components/detalleCreditos/detalleCreditos.component';
import { DetalleCreditosAsignadoComponent } from './components/detalleCreditosAsignado/detalleCreditosAsignado.component';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';
import { MasivoGestionesAsignadoComponent } from './components/masivoGestiones/masivoGestiones.component';
import { UploadFileComponent } from '../components/uploadFile/uploadFile.component';
import { MasivoJuridicoComponent } from './components/masivoJuridico/masivoJuridico.component';
import { GestionesRealizadasComponent } from './components/gestionesRealizadas/gestionesRealizadas.component';
import { DemandaMasivaComponent } from './components/demandaMasiva/demandaMasiva.component';
import { DemandaEstadoComponent } from './components/demandaEstado/demandaEstado.component';
import { ConveniosRealizadosComponent } from './components/conveniosRang/conveniosRang.component';
import { ConveniosDiComponent } from './components/conveniosDi/conveniosDi.component';

/*components angular material */


@NgModule({
  declarations: [
    ContactabilidadComponent,
    DetalleCreditosComponent,
    DetalleCreditosAsignadoComponent,
    ConsolidadoComponent,
    MasivoGestionesAsignadoComponent,
    UploadFileComponent,
    MasivoJuridicoComponent,
    GestionesRealizadasComponent,
    DemandaMasivaComponent,
    DemandaEstadoComponent,
    ConveniosRealizadosComponent,
    ConveniosDiComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule.forChild(ReportesRoutes),
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
 
  ],
  providers: [
    ReportesService
  ],
})
export class ReportesModule { }