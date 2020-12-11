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
  selector: 'cartera-app',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  displayedColumns: string[] = [  'gestor', 'cantidad'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  visibleCard = false;

  ViewData = [];
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
  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "PlantillaCartera";
    link.href = "assets/PlantillaCartera.xlsx";
    link.click();
  }

  onThrottle(e) {
    e.forEach(element => {
        let aux = this.ViewData.find(e => e.gestor == element[1]);
        if(!aux) {
          let objectAux = { gestor: element[1], cantidad: 1 };
          this.ViewData.push(objectAux);
        } else {
          this.ViewData.forEach(inset => {
            if(element[1] == inset.gestor) {
              inset.cantidad = inset.cantidad + 1;
            }
          });
        }
    });
    this.dataSource.data = this.ViewData;
    this.dataSource.paginator = this.paginator;
    this.visibleCard = true;
  }

  clearExport() {
    this.visibleCard = false;
    this.dataSource.data = [];
    this.dataSource.paginator = this.paginator;
  }

}