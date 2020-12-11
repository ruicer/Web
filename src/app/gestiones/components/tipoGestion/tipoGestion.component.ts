import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackComponent } from 'src/app/components/snackbar/snackbar.component';
import { TipoGestionDialog } from './tipoGestion-dialog/tipoGestion-dialog.component';

@Component({
  selector: 'tipoGestion-app',
  templateUrl: './tipoGestion.component.html',
  styleUrls: ['./tipoGestion.component.scss']

})
export class TipoGestionComponent implements OnInit {




  displayedColumns: string[] = ['ID', 'TIPOGESTION','icons'];
  dataSource = new MatTableDataSource();
  @ViewChild('paginator1', { static: true }) paginator: MatPaginator;
  callCenterForm: FormGroup;

  constructor(private asignacionService: AsignacionPermisos,
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private cobranzaService: CobranzaService,
      public dialog: MatDialog) {

  }

  ngOnInit() {
      this.loadTable();
  }

  loadTable() {
      let creditos = [];
      this.cobranzaService.activate();
      this.asignacionService.getTipogestion().then(data => {
          console.log(data);
          (<any>Object).values(data).forEach(element => {
              creditos.push(element);
            });
            this.dataSource.data = creditos;
            this.dataSource.paginator =  this.paginator;
            this.cobranzaService.deactivate();
      });
  }


  applyFilterOne(filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
    }


    deletePermiso(id) {
      console.log(id);
      this.cobranzaService.activate();
      this.asignacionService.TipoDr(id.ID).then(data => {
          this.cobranzaService.deactivate();
          this.openSnackBar('Eliminado correctamente.');
          this.loadTable();
      });
  }


  openSnackBar(VALUE) {
      this._snackBar.openFromComponent(SnackComponent, {
        duration: 3500,
        data: VALUE
      });
  }


  add() {

      const dialogRef = this.dialog.open(TipoGestionDialog, {
          width: '260px'
      });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          if(result) {
            this.openSnackBar('Operación realizada');
            this.loadTable();
          } else if(!result) {
            this.openSnackBar('No se realizo operación');
          }
        });
  }
    
}