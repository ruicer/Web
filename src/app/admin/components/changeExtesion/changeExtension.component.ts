import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { LlamadaService } from 'src/app/services/llamada.service';
import { MatSnackBar } from '@angular/material';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'changeExtension-app',
  templateUrl: './changeExtension.component.html',
  styleUrls: ['./changeExtension.component.scss']
})
export class ChangeExtensionComponent implements OnInit {

  formChange: FormGroup;
  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
  constructor(private formBuilder: FormBuilder,
    private cobranzaService: CobranzaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {

  }

  ngOnInit() {
    this.formChange = this.formBuilder.group({
      extensionAnterior: ['', Validators.required],
      extensionNueva: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  verifyExtension() {
    const password = this.userAccount[0].PASSWORD;
    const EXanterior = this.userAccount[0].EXTE;
    if (!this.formChange.invalid) {
      if (password === this.formChange.get('password').value && EXanterior === this.formChange.get('extensionAnterior').value) {
        const values = {
          extension: this.formChange.get('extensionNueva').value,
          user: this.userAccount[0].USUARIO
        };
        this.cobranzaService.activate();
        this.cobranzaService.changeExtension(values).then(data => {
          this.openSnackBarSucces();
          sessionStorage.clear();
          this.userAccount[0].EXTE = this.formChange.get('extensionNueva').value;
          //let user = btoa('USER');
          sessionStorage.setItem('USER', btoa(JSON.stringify(this.userAccount)));
          this.cobranzaService.deactivate();
          setTimeout(() => {
            this.router.navigate(['/admin/inicio']);
          }, 1000);
        });
      } else {
        this.openSnackBar();
      }
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 2500,
      data: 'ERROR EN CAMBIO DE EXTENSION'
    });
  }
  openSnackBarSucces() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 2500,
      data: 'CAMBIO REALIZADO'
    });
  }

}