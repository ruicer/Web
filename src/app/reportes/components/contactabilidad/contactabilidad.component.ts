import { Component, OnInit, ViewChild, ɵConsole, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, getMatFormFieldDuplicatedHintError, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/AppDateAdapter';
import * as XLSX from 'xlsx';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
    selector: 'contactabilidad-app',
    templateUrl: './contactabilidad.component.html',
    styleUrls: ['./contactabilidad.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class ContactabilidadComponent implements OnInit {

    displayedColumns: string[] = ['REG', 'SUC', 'RANGOMORA', 'TOTCRED', 'TOTLLAMADA', 'CLIUNOMASLLAMA',
        'POCLIECONTOT', 'CLIENCONTAC', 'ACUPAGO',  'MONTO', 'NOCONTACT'];
    dataSource = new MatTableDataSource();
    callCenterForm: FormGroup;
    @ViewChild(MatTable, {static : true}) table: ElementRef;

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
    mostrarTotal = false;
    totalGes = 0;
    exportExcel;
    showExport= false;

    constructor(
        public cobranzaService: CobranzaService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private reportService: ReportesService
    ) { }


    ngOnInit() {
        this.callCenterForm = this.formBuilder.group({
            sucursal: new FormControl(),
            fechIn: new FormControl(),
        });
        this.getSelects();
     
        this.callCenterForm.get('fechIn').valueChanges.subscribe(change => {
                const fechIn = this.castdate(this.callCenterForm.get('fechIn').value);
                const sucursal = this.callCenterForm.get('sucursal').value;
                this.getDataReport(fechIn);
            
        });

      
    }

    getDataReport(fechIn) {
        let creditos = [];
        this.cobranzaService.activate();
        this.reportService.getRepContact(fechIn).then((data: any) => {
            (<any>Object).values(data).forEach(element => {
                creditos.push(element);
              });
              if(data.length === 0) {
                this.showExport = true;
                this.totalGes = 0;
                this.openSnackBar('Sin datos en sistema.')
              } else {
                this.showExport = false;
                this.openSnackBar('Cargados correctamente.')
              }
              
            this.dataSource.data = creditos;
            this.dataSource.paginator = this.paginator;
            this.mostrarTotal = true;
            this.totalGes = creditos.length;
            this.exportExcel = creditos; 
            this.cobranzaService.deactivate();

        });
    }

    getSelects() {
        let creditos = [];
        let userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
        this.cobranzaService.activate();
        this.cobranzaService.getSucursales(userAccount[0].ID_PROCURADOR).then(data => {
            this.sucursales = data;
            this.cobranzaService.deactivate();
        })

        /*  this.cobranzaService.getGestionDiaria().then(data => {
            this.gestionesDiarias = data;
          });
      */
    }

    datesConcatenation(value) {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    }


    exportAsExcel()
    {
        const workSheet = XLSX.utils.json_to_sheet(this.exportExcel, {header:['dataprop1', 'dataprop2']});
        const workBook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
        XLSX.writeFile(workBook, 'ReporteDiario.xlsx');

    }

    castdate(input) {
        let dateInit = new Date(input);
        const mesI = this.datesConcatenation((dateInit.getMonth() + 1));
        const diain = this.datesConcatenation(dateInit.getDate());
        let dateI = dateInit.getFullYear() + '-' + mesI + '-' + diain;
        return dateI;
    }

    openSnackBar(VALUE) {
        this._snackBar.openFromComponent(SnackComponent, {
          duration: 3500,
          data: VALUE
        });
      }



      export() {
         
      }
}