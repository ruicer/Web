import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'reversas-app',
  templateUrl: './reversas.component.html',
  styleUrls: ['./reversas.component.scss']

})
export class ReversasComponent implements OnInit {


  sucursales: any;
  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
  idSucursal;

  displayedColumns: string[] = ['icons', 'ID_CREDITO', 'PROGRAMAD', 'NOMBRE',
    'DIASMORA', 'FECHA_ENTREGA', 'FECHA_VENCIMIENTO', 'CAPITAL_OTORGADO',
    'SALDO_INTERES', 'SALDO_CAPITAL',
    'GRANTOTAL'];
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
    this.callCenterForm = this.formBuilder.group({
      sucursal: new FormControl(),
      fechIn: new FormControl(),
    });
    this.cobranzaService.activate();
    this.cobranzaService.getSucursales(this.userAccount[0].ID_PROCURADOR).then(data => {
      this.sucursales = data;
      this.cobranzaService.deactivate();
    });
    this.loadTable();

  }

  loadTable() {

    this.callCenterForm.get('fechIn').valueChanges.subscribe((data: any) => {
      const date = this.castdate(data);

      if (this.callCenterForm.get('sucursal').value !== ''
        && this.callCenterForm.get('sucursal').value) {
        this.cobranzaService.activate();
        this.loadIncobrables(this.callCenterForm.get('sucursal').value, date);

      }


    });

    this.callCenterForm.get('sucursal').valueChanges.subscribe((data: any) => {
      const date = this.castdate(data);

      if (this.callCenterForm.get('fechIn').value !== ''
        && this.callCenterForm.get('fechIn').value) {
        this.cobranzaService.activate();
        this.loadIncobrables(this.callCenterForm.get('sucursal').value, date);
      }
    });
  }


  loadIncobrables(suc, fech) {
    let creditos = [];

    this.asignacionService.reversaIncobrables(suc, fech).then((values: any) => {
      if (values.length === 0) {
        this.cobranzaService.deactivate();
        this.openSnackBar('No existe creditos incobrables con esos parametros');
        return;
      }
      (<any>Object).values(values).forEach(element => {
        creditos.push(element);
      });
      this.dataSource.data = creditos;
      this.dataSource.paginator = this.paginator;
      this.cobranzaService.deactivate();
      this.openSnackBar('Cargados correctamente');

    });
  }

  applyFilterOne(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  castdate(input) {
    let dateInit = new Date(input);
    const mesI = this.datesConcatenation((dateInit.getMonth() + 1));
    const diain = this.datesConcatenation(dateInit.getDate());
    let dateI = dateInit.getFullYear() + '-' + mesI + '-' + diain;
    return dateI;
  }

  datesConcatenation(value) {
    if (value < 10) {
      value = '0' + value;
    }
    return value;
  }
  deletePermiso(id) {
    this.cobranzaService.activate();
    this.asignacionService.delIncobrables(id.ID_CREDITO).then((data: any) => {
      if (data.Status) {
        this.openSnackBar('Eliminado de creditos incobrables');
      } else {
        this.openSnackBar('No se puede eliminar de creditos incobrables');

      }
      this.cobranzaService.deactivate();
    });
  }


  openSnackBar(VALUE) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 3500,
      data: VALUE
    });
  }


  add() {

     /* const dialogRef = this.dialog.open(AbonosDialog, {
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
      */  }

}