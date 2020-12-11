import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';


import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';
import { CobranzaService } from './services/cobranza.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackComponent } from './components/snackbar/snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatListModule} from '@angular/material/list';


import { EmbedVideo } from 'ngx-embed-video';
import { LlamadaService } from './services/llamada.service';
import { GestionesComponent } from './gestiones/gestiones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UploadFileComponent } from './components/uploadFile/uploadFile.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    SnackComponent,
    SpinnerComponent,
    GestionesComponent,
    ReportesComponent,
    MenuComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    EmbedVideo.forRoot(),
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatChipsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  providers: [CobranzaService,
    AuthenticationService
  ],
  entryComponents: [
    SnackComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
