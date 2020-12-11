import { NgModule } from '@angular/core';
/* router module */
import { RouterModule } from '@angular/router';
/* router module */

/* router module */
import { AdminRoutes } from './admin.routes';

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
  MatNativeDateModule
} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatVideoModule } from 'mat-video';


/*components angular material */

/* componentes app */
import { InicioComponent } from './components/inicio/inicio.component';
import { DialogComponent } from './components/dialog/dialog.component';
/* componentes app */


import { LlamadaService } from '../services/llamada.service';
import { ChangeExtensionComponent } from './components/changeExtesion/changeExtension.component';
import { FileComponent } from './components/file/file.component';
import { UploadServiceService } from '../services/upload-service.service';
import { FileExcelComponent } from './components/file-excel/file-excel.component';
import { VideoInicio } from './components/video-inicio/video-inicio.component';
import { CarteraComponent } from './components/cartera/cartera.component';
import { FileCarteraComponent } from './components/file-cartera/file-cartera.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ReporteDiarioComponent } from './components/reporteDiario/reporteDiario.component';
@NgModule({
  declarations: [
    InicioComponent,
    DialogComponent,
    ChangeExtensionComponent,
    FileComponent,
    FileExcelComponent,
    VideoInicio,
    CarteraComponent,
    FileCarteraComponent,
    ReporteDiarioComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule.forChild(AdminRoutes),
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
    MatVideoModule,
    MatButtonToggleModule

  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    LlamadaService,
    MatDatepickerModule,
    UploadServiceService
  ],
})
export class AdminModule { }
