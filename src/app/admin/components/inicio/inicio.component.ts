import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { LlamadaService } from 'src/app/services/llamada.service';
import { MatSnackBar, getMatFormFieldDuplicatedHintError } from '@angular/material';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';

@Component({
  selector: 'inicio-app',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  displayedColumns: string[] = [  'icons', 'PRESTAMO', 'NOMBRE_DEL_CLIENTE', 'DIASMORACAPITAL', 'DIASMORAINTERES', 'CODSUC', 'SUCURSAL', 'NOMBRE_PROMOTOR', 'COD_PROMOTOR', 'PRIORIDAD', 'NOMBREGRUPO'];
  dataSource = new MatTableDataSource();
  callCenterForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
  cargaExcel = false;
  idCredito;

  FilterForm: any;
  filterName;


  constructor(public cobranzaService: CobranzaService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private llamadaService: LlamadaService,
    private _snackBar: MatSnackBar) {
    this.getSelects();
    this.callCenterForm = this.formBuilder.group({
      sucursal: new FormControl(),
      mora: new FormControl(),
    });
    this.FilterForm = this.formBuilder.group({
      filters: new FormControl()
    });

  }
  
  ngOnInit() {

    this.callCenterForm.get('sucursal').valueChanges.subscribe(change => {
      this.idCredito = null;
      this.valueSucursal = change;
   
      if(this.callCenterForm.get('mora').value == null) {

        let creditos = [];
        this.cobranzaService.activate();
        this.cobranzaService.getCreditosAldia(this.userAccount[0].USUARIO, this.valueSucursal)
        .then(values => {
          (<any>Object).values(values).forEach(element => {
            creditos.push(element);
          });
          creditos.forEach(data => {
            //data.SHOW = false;
            //this.gestionesDiarias.forEach(element => {
              //console.log(element.CREDITO);
              //debugger;
             // if(this.idCredito === data.PRESTAMO) {
               //data.SHOW = true;
             // }
            //})
  
            //onsole.log(data)
            //let prestamo = data.PRESTAMO.replace(/ /g, "");
            /*(<any>Object).values(this.gestionesDiarias).forEach((ID: any) => {
              if (prestamo === ID.CREDITO && fecha === ID.FECHAGESTION) {
                data.SHOW = true;
              }
            });*/
          });
          this.dataSource.data = creditos;
          this.dataSource.paginator = this.paginator;
          this.cobranzaService.deactivate();
          this.cargaExcel = false;
          console.log(this.dataSource.data)
        });

      } else {
        this.changeValueOfData();
      }
      
    });
    this.callCenterForm.get('mora').valueChanges.subscribe(change => {
      this.valueMora = change;
      this.idCredito = null;
      this.changeValueOfData();
    });

    this.FilterForm.get('filters').valueChanges.subscribe(change => {
      this.filterName = change;
    });
  }
  
  getSelects() {
    let creditos = [];
    let userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
    this.cobranzaService.activate();
    this.cobranzaService.getEstados().then(data => {
      this.moras = data;
      this.cobranzaService.getSucursales(userAccount[0].ID_PROCURADOR).then(data => {
        this.sucursales = data;
        this.cobranzaService.deactivate();
      })
    });
  /*  this.cobranzaService.getGestionDiaria().then(data => {
      this.gestionesDiarias = data;
    });
*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: any, filter: string) => { 
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }
 

  changeValueOfData() {
    let creditos = [];
    let dateGestion = new Date();
    let fecha;
    if (dateGestion.getDate() < 10) {
      fecha = dateGestion.getFullYear() + '-' + (dateGestion.getMonth() + 1) + '-' + '0' + dateGestion.getDate();
    } else {
      fecha = dateGestion.getFullYear() + '-' + (dateGestion.getMonth() + 1) + '-' + dateGestion.getDate();
    }
    this.cobranzaService.activate();
    //console.log(this.valueMora);
   // console.log(this.valueSucursal)
   // console.log(this.idCredito);
    if(this.idCredito) {
      console.log('hola');
      console.log(this.idCredito);
      this.dataSource.data.forEach((e: any) => {
        if(this.idCredito === e.PRESTAMO) {
          e.SHOW = true;
         }
      })
    } else {
      this.cobranzaService.getCreditos(this.userAccount[0].USUARIO, this.valueSucursal, this.valueMora)
      .then(data => {
      
        (<any>Object).values(data).forEach(element => {
          creditos.push(element);
        });
        creditos.forEach(data => {
          //data.SHOW = false;
          /*this.gestionesDiarias.forEach(element => {
            //console.log(element.CREDITO);
            //debugger;
           // if(this.idCredito === data.PRESTAMO) {
             //data.SHOW = true;
           // }
          })*/

          //onsole.log(data)
          let prestamo = data.PRESTAMO.replace(/ /g, "");
          /*(<any>Object).values(this.gestionesDiarias).forEach((ID: any) => {
            if (prestamo === ID.CREDITO && fecha === ID.FECHAGESTION) {
              data.SHOW = true;
            }
          });*/
        });
        this.dataSource.data = creditos;
        this.dataSource.paginator = this.paginator;
        this.cobranzaService.deactivate();
        this.cargaExcel = false;
      })
    }
    
      
  }

  openDialog(element: any) {
    this.idCredito = element.PRESTAMO;
    let values = [];
    this.cobranzaService.activate();
    this.llamadaService.getNumeroTelefono(element.PRESTAMO).then(data => {
      values.push(data);
      this.llamadaService.getPlan_pago(element.PRESTAMO).then(data => {
        values.push(data);
        this.llamadaService.getFiador(element.PRESTAMO).then(data => {
          values.push(data);
          this.llamadaService.getClienteLlamada(element.PRESTAMO).then(data => {
            values.push(data);
            this.llamadaService.getSaldoLlamada(element.PRESTAMO).then(data => {
              values.push(data);
              this.llamadaService.getGestion().then(data => {
                values.push(data);
                this.llamadaService.getGestionRealizada(element.PRESTAMO).then(data => {
                  values.push(data);
                  values.push(element.PRESTAMO);
                  values.push(this.valueMora);
                  this.cobranzaService.deactivate();
                  this.dialogStyle(values);
                });
              });
            });
          });
        });
      });
    });
  }

  dialogStyle(values) {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '100%',
      width: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
      panelClass: 'my-class',
      data: values
    });
    dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar('GESTION CERRADA');
      console.log(result);
      
      this.getSelects();
      this.changeValueOfData();
       
    });
  }

  uploadFinished(e) {
    console.log(e);
  }

  onThrottle(e) {
    console.log(e);

    
    e.forEach(element => {
      this.dataSource.data.push(element);
    });
    this.dataSource.paginator = this.paginator;
    this.cobranzaService.deactivate();
    /*if(this.dataSource.data.length > 0 && !this.cargaExcel) {
      
      this.dataSource.data = e;
      this.dataSource.paginator = this.paginator;
      this.cargaExcel = true;
      this.cobranzaService.deactivate();
      console.log(e);

    } else if (this.dataSource.data.length > 0 && this.cargaExcel) {
      
      e.forEach(element => {
        this.dataSource.data.push(element);
      });
      this.dataSource.paginator = this.paginator;
      this.cobranzaService.deactivate();

    } else if (this.dataSource.data.length == 0 && !this.cargaExcel) {
     
      this.dataSource.data = e;
      this.dataSource.paginator = this.paginator;
      this.cobranzaService.deactivate();
      this.cargaExcel = true;
   
    }
*/
  }

  openSnackBar(VALUE) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 3500,
      data: VALUE
    });
  }

  downloadFile() {
    let link = document.createElement("a");
    link.download = "Plantilla";
    link.href = "assets/Plantilla.xlsx";
    link.click();
  }

  validateWarning(idCredito) {

  }

}
