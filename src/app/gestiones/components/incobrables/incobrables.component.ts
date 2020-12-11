import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'incobrables-app',
  templateUrl: './incobrables.component.html',
  styleUrls: ['./incobrables.component.scss']

})
export class IncobrablesComponent implements OnInit {


  sucursales: any;
  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
  idSucursal;

  displayedColumns: string[] = ['icons', 'ID_CREDITO', 'PROGRAMAD', 'NOMBRE',
    'DIASMORA',  'FECHA_ENTREGA', 'FECHA_VENCIMIENTO', 'CAPITAL_OTORGADO',
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
      mora: new FormControl(),
    });
    this.cobranzaService.activate();
    this.cobranzaService.getSucursales(this.userAccount[0].ID_PROCURADOR).then(data => {
      this.sucursales = data;
      this.cobranzaService.deactivate();
    });
    this.loadTable();

  }

  loadTable() {
    let creditos = [];

    this.callCenterForm.get('sucursal').valueChanges.subscribe((data: any) => {
      console.log(data);
      this.cobranzaService.activate();
      this.asignacionService.credIncobrables(data).then((values: any) => {
        (<any>Object).values(values).forEach(element => {
          creditos.push(element);
        });
        this.dataSource.data = creditos;
        this.dataSource.paginator = this.paginator;
        this.cobranzaService.deactivate();
        this.openSnackBar('Cargados correctamente');

      });
    });
    /* (<any>Object).values(data).forEach(element => {
       creditos.push(element);
     });
     this.dataSource.data = creditos;
     this.dataSource.paginator =  this.paginator;
     this.cobranzaService.deactivate();
     //this.cobranzaService.activate();
     /*this.asignacionService.getAbonos().then(data => {
         console.log(data);
         (<any>Object).values(data).forEach(element => {
             creditos.push(element);
           });
           this.dataSource.data = creditos;
           this.dataSource.paginator =  this.paginator;
           this.cobranzaService.deactivate();
     });*/
  }


  applyFilterOne(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  deletePermiso(id) {
    console.log(id);
    this.cobranzaService.activate();
    this.asignacionService.addIncobrables(id.ID_CREDITO, this.userAccount[0].ID_PROCURADOR).then((data:any) => {
      if(data.Status) {
        this.openSnackBar('Agregado a credito incobrable');
        this.loadTable();
      } else {
        this.openSnackBar('No se puede agregar a creditos incobrables');
        this.loadTable();

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