import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnackComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'asignacionUsuario-app',
  templateUrl: './asignacionUsuario.component.html',
  styleUrls: ['./asignacionUsuario.component.scss']

})
export class AsignacionUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['ID',  'TITLE', 'URL', 'icons'];


  dataSource = new MatTableDataSource();

  dataSource2 = new MatTableDataSource();
  callCenterForm: FormGroup;
  @ViewChild('paginator1', { static: true }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: true }) categoryPaginator: MatPaginator;

  sucursales: any;
  prioridades = [];
  moras: any;
  tipos: any;
  creditos: any;
  valueSucursal: any = 1;
  valueMora: any = 'EN MORA 1 A 30 DIAS';
  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
  gestionesDiarias: any = {};
  nameFilter = new FormControl();
  colorFilter = new FormControl();

  expandedElement;
  element;
  idCredito;

  FilterForm: any;
  filterName;
  filteredOptions: Observable<any[]>;
  listProcuradores;
  options;
  listNoAsignados;
  constructor(private asignacionService: AsignacionPermisos,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private cobranzaService: CobranzaService,
  ) { }


  ngOnInit() {
    this.callCenterForm = this.formBuilder.group({
      PROCURADORES: ['', Validators.required],
      NOTASIG: ['', Validators.required],
      PUESTOS: ['']
    });

    this.cobranzaService.activate();

    this.asignacionService.getAsignado().then(data => {
      this.cobranzaService.deactivate();
      this.options = Object(data);
    });

    this.susbcribeValues();

  


  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();
    console.log(this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0));
    debugger;
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  displayFn(user: any) {
    console.log(user);
  }

  asignar() {

  }

  susbcribeValues() {

   /* this.callCenterForm.get('PUESTOS').valueChanges.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource2.data = [];
      this.cobranzaService.activate();
      this.asignacionService.getProcuradores(data).then(data => {
        this.cobranzaService.deactivate();
        this.listProcuradores = Object(data);
      });
    });*/
    this.callCenterForm.get('PUESTOS').valueChanges.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource2.data = [];
      this.cobranzaService.activate();
      this.valuesChanges(data);
    });
  }

  valuesChanges(procurador) {
    let creditos = [];
    let noAsig = [];

    this.asignacionService.getVistaAsig(procurador).then(values => {
      console.log(values);
      (<any>Object).values(values).forEach(element => {
        creditos.push(element);
      });
      this.dataSource2.data = creditos;
      this.dataSource2.paginator =  this.paginator;
      this.cobranzaService.deactivate();
    });
    this.asignacionService.getVistaAsigNo(procurador).then(values => {
    
      (<any>Object).values(values).forEach(element => {
        noAsig.push(element);
      });
      this.dataSource.data = noAsig;
      this.dataSource.paginator = this.categoryPaginator;
      this.cobranzaService.deactivate();

    });
  }

  filteredValues(value: string) {
    console.log(value);
  }


  applyFilterTwo(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  applyFilterOne(filterValue) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();

  }

  addPermiso(value) {
    console.log(value)
    const dataOb = {
      nombre_grupo: this.callCenterForm.get('PUESTOS').value,
      tab: value.ID
    }
    this.cobranzaService.activate();
    this.asignacionService.addVistaPer(dataOb).then((data: any) => {
      
      if(data.Status) {
        this.valuesChanges(this.callCenterForm.get('PUESTOS').value);
        this.openSnackBar('Asignación realizada');

      } else {
        this.openSnackBar('No se puede realizar asignación, comuniquese con el administrador');
      }
    }).catch(() => {
      this.openSnackBar('Ocurrio un error de comunicación');
    });
  }

  openSnackBar(VALUE) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 3500,
      data: VALUE
    });
  }
  deletePermiso(value) {
    this.cobranzaService.activate();
    this.asignacionService.delVista(value.ID)
      .then((data: any) => {
        if(data.Status) {
          this.valuesChanges(this.callCenterForm.get('PUESTOS').value);
          this.openSnackBar('Acción realizada');
  
        } else {
          this.openSnackBar('No se puede realizar eliminación, comuniquese con el administrador');
        }
      }).catch(() => {
        this.openSnackBar('Ocurrio un error de comunicación');
      });

  }

 
}
