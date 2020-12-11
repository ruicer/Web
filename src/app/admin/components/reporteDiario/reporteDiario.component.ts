import { Component, OnInit, ViewChild, ɵConsole, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { LlamadaService } from 'src/app/services/llamada.service';
import { MatSnackBar, getMatFormFieldDuplicatedHintError, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/AppDateAdapter';
import * as XLSX from 'xlsx';

@Component({
    selector: 'reporte-app',
    templateUrl: './reporteDiario.component.html',
    styleUrls: ['./reporteDiario.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class ReporteDiarioComponent implements OnInit {

    displayedColumns: string[] = ['SUCURSAL', 'USUARIO', 'NOMBRE', 'PRESTAMO', 'DESC', 'G_I',
        'TIPGEST', 'GESTION', 'OBS',  'DURLLAMADA', 'HORA'];
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

    showExport= false;

    constructor(
        public cobranzaService: CobranzaService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private llamadaService: LlamadaService,
        private _snackBar: MatSnackBar
    ) { }


    ngOnInit() {
        this.callCenterForm = this.formBuilder.group({
            sucursal: new FormControl(),
            fechIn: new FormControl(),
            fechFn: new FormControl(),
        });
        //this.cobranzaService.activate();
        this.getSelects();
        this.callCenterForm.get('fechFn').valueChanges.subscribe(change => {
            if (this.callCenterForm.get('sucursal').value && this.callCenterForm.get('fechIn').value) {
                const fechIn = this.castdate(this.callCenterForm.get('fechIn').value);
                const fechFn = this.castdate(this.callCenterForm.get('fechFn').value);
                const sucursal = this.callCenterForm.get('sucursal').value;
                this.getDataReport(fechIn, fechFn, sucursal);
            }
        });

        this.callCenterForm.get('fechIn').valueChanges.subscribe(change => {
            if (this.callCenterForm.get('fechFn').value && this.callCenterForm.get('sucursal').value) {
                const fechIn = this.castdate(this.callCenterForm.get('fechIn').value);
                const fechFn = this.castdate(this.callCenterForm.get('fechFn').value);
                const sucursal = this.callCenterForm.get('sucursal').value;
                this.getDataReport(fechIn, fechFn, sucursal);
            }
        });

        this.callCenterForm.get('sucursal').valueChanges.subscribe(change => {
            if (this.callCenterForm.get('fechFn').value && this.callCenterForm.get('fechIn').value) {
                const fechIn = this.castdate(this.callCenterForm.get('fechIn').value);
                const fechFn = this.castdate(this.callCenterForm.get('fechFn').value);
                const sucursal = this.callCenterForm.get('sucursal').value;
                this.getDataReport(fechIn, fechFn, sucursal);
            }
        });

    }

    getDataReport(fechIn, fechFn, sucursal) {
        let creditos = [];
        this.cobranzaService.activate();
        this.cobranzaService.getReporte(fechIn, fechFn, sucursal).then(data => {
            (<any>Object).values(data).forEach(element => {
                creditos.push(element);
              });
            this.showExport = true;
            this.dataSource.data = creditos;
            this.dataSource.paginator = this.paginator;
            this.mostrarTotal = true;
            this.totalGes = creditos.length;
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
        const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, {header:['dataprop1', 'dataprop2']});
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
}