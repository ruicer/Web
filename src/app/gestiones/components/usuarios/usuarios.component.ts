import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackComponent } from 'src/app/components/snackbar/snackbar.component';
import { UsuariosDialog } from './usuarios-dialog/usuarios-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'usuarios-app',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']

})
export class UsuariosComponent implements OnInit {


  displayedColumns: string[] = ['ID_PROCURADOR', 'ID', 'NOMBRE', 'USUARIO', 'PUESTO', 'icons'];
  dataSource = new MatTableDataSource();
  @ViewChild('paginator1', { static: true }) paginator: MatPaginator;
  callCenterForm: FormGroup;

  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  pageEvent: PageEvent;
  pageIndex = 0;
  sucSelect;
  valueSearch;
  constructor(private asignacionService: AsignacionPermisos,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private cobranzaService: CobranzaService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private reportService: ReportesService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.navigate(['/gestiones/usuarios'], { queryParams: { length: this.length, pageIndex: 1 } });
    this.getSubscribeParams();
  }
  getSubscribeParams() {
    let creditos = [];
    this.route.queryParams.subscribe(queryParams => {
      this.cobranzaService.activate();
      this.openSnackBar('Cargando..');
      this.reportService.getUs(queryParams['pageIndex'])
        .then((data: any) => {
          console.log(data.lenght);
          console.log(typeof (data));

          let creditos = [];
          (<any>Object).values(data.data).forEach(element => {
            creditos.push(element);
          });
          this.dataSource.data = [];
          this.length = data.lenght;
          this.pageIndex = data.skip;
          this.dataSource.data = creditos;
          this.cobranzaService.deactivate();
          if (creditos.length === 0) {
            this.openSnackBar('Sin información en base de datos.');
            return;
          }
          this.openSnackBar('Información cargada correctamente');

        });
    });
  }


  applyFilterTwo(value: string) {
    if(value.length > 0) {
      this.valueSearch = value;      
    } else if(value.length == 0) {
      console.log('holaassssss')
      this.getSubscribeParams();
    }
  }

  search() {
    console.log(this.valueSearch);
    this.reportService.getUsSearch(1, this.valueSearch).then((data: any) => {
      console.log(data);
      let creditos = [];
      (<any>Object).values(data.data).forEach(element => {
        creditos.push(element);
      });
      this.dataSource.data = [];
      this.length = data.lenght;
      this.pageIndex = data.skip;
      this.dataSource.data = creditos;
      this.cobranzaService.deactivate();
      if (creditos.length === 0) {
        this.openSnackBar('Sin información en base de datos.');
        return;
      }
      this.openSnackBar('Información cargada correctamente');
    })
  }
  getServerData(event): any {
    const pageIndex = Number(event.pageIndex) + 1;


    this.router.navigate(['/gestiones/usuarios'],
      { queryParams: { length: event.length, pageIndex: pageIndex } });

  }


  updateUsuario(update) {
    
    const dialogRef = this.dialog.open(UsuariosDialog, {
      width: '300px',
      data: update.ID
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.openSnackBar('Operación realizada');
      } else if (!result) {
        this.openSnackBar('No se realizo operación');
      }
    });
    this.getSubscribeParams();

  }

  deletePermiso(id) {
    console.log(id);
    this.cobranzaService.activate();
    this.asignacionService.delUsu(id.ID).then(data => {
      this.cobranzaService.deactivate();
      this.openSnackBar('Eliminado correctamente.');
      this.getSubscribeParams();
    });
  }


  openSnackBar(VALUE) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 3500,
      data: VALUE
    });
  }


  add() {

    const dialogRef = this.dialog.open(UsuariosDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.openSnackBar('Operación realizada');
      } else if (!result) {
        this.openSnackBar('No se realizo operación');
      }
    });
    this.getSubscribeParams();

  }

}