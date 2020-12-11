import { Component, OnInit, ViewChild, ɵConsole, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, getMatFormFieldDuplicatedHintError, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/AppDateAdapter';
import * as XLSX from 'xlsx';
import { ReportesService } from 'src/app/services/reportes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'detalleCreditos-app',
    templateUrl: './detalleCreditos.component.html',
    styleUrls: ['./detalleCreditos.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class DetalleCreditosComponent implements OnInit {

    displayedColumns: string[] = ['ID_CREDITO', 'CIERRE', 'PROGRAMAD', 'NOMBRE', 'DIASMORA',
        'FECHA_ENTREGA', 'FECHA_VENCIMIENTO', 'CAPITAL_OTORGADO', 'GRANTOTAL', 'MORA_REC_TOTAL'];
    dataSource = new MatTableDataSource();
    callCenterForm: FormGroup;
    @ViewChild(MatTable, { static: true }) table: ElementRef;

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

    showExport = false;

    length = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5];
    pageEvent: PageEvent;
    pageIndex = 0;
    sucSelect;
    constructor(
        public cobranzaService: CobranzaService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private reportService: ReportesService,
        private route: ActivatedRoute,
        private router: Router
    ) { }


    ngOnInit() {
        this.callCenterForm = this.formBuilder.group({
            sucursal: new FormControl(),
        });
        //this.cobranzaService.activate();
        this.getSelects();
        let userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
        this.cobranzaService.activate();
        this.cobranzaService.getSucursales(userAccount[0].ID_PROCURADOR).then(data => {
            this.sucursales = data;
            this.cobranzaService.deactivate();
        });
        this.callCenterForm.get('sucursal').valueChanges.subscribe(change => {
            this.sucSelect = change;
            this.router.navigate(['/reportes/detalleMora'], { queryParams: { length: this.length, pageIndex: 1, sucSelect: change } });
        });
        this.getSubscribeParams();

        /*this.callCenterForm.get('fechIn').valueChanges.subscribe(change => {
                const fechIn = this.castdate(this.callCenterForm.get('fechIn').value);
                const sucursal = this.callCenterForm.get('sucursal').value;
                this.getDataReport(fechIn);
            
        });

      */
    }


    getSubscribeParams() {
        let creditos = [];
        this.route.queryParams.subscribe(queryParams => {
            console.log(queryParams);
            //this.callCenterForm.get('sucursal').setValue(queryParams['sucSelect']);
            this.cobranzaService.activate();
            this.openSnackBar('Cargando..');
            //const page = Number(queryParams['pageIndex'] + 1);
            this.reportService.getMora1Asign(queryParams['sucSelect'], queryParams['pageIndex'])
                .then((data: any) => {
                    let creditos = [];
                    (<any>Object).values(data.data).forEach(element => {
                        creditos.push(element);
                    });
                    this.dataSource.data = [];
                    this.length = data.lenght;
                    this.dataSource.data = creditos;
                    this.showExport = true;
                    this.cobranzaService.deactivate();
                    if(creditos.length === 0) {
                        this.openSnackBar('Sin información en base de datos.');
                        return;
                    }
                    this.openSnackBar('Información cargada correctamente');

                });
        });
    }

    openSnackBar(VALUE) {
        this._snackBar.openFromComponent(SnackComponent, {
            duration: 3500,
            data: VALUE
        });
    }

    getServerData(event)  : any{
        const pageIndex = Number(event.pageIndex) + 1;
        //console.log(pageIndex);
        //console.log(event);
        //const page = Number(event.pageIndex + 1);
        this.router.navigate(['/reportes/detalleMora'],
            { queryParams: { length: event.length, pageIndex: pageIndex, sucSelect: this.sucSelect } });

    }
    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    export() {
        if (this.callCenterForm.get('sucursal').value) {
            this.openSnackBar('cargando..');
            this.cobranzaService.activate();
            this.reportService.getExcel(this.callCenterForm.get('sucursal').value).subscribe(fileData => {
                const blob: any = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                let link = document.createElement("a");

                if (link.download !== undefined) {
                    let url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", 'reporteSucursal.xls');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                this.cobranzaService.deactivate();
                this.openSnackBar('Reporte generado');
            });
        }
    }


    /*  getDataReport(fechIn) {
         let creditos = [];
         this.cobranzaService.activate();
         this.reportService.getRepContact(fechIn).then(data => {
             console.log(data)
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
     }*/

    getSelects() {
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

    /*datesConcatenation(value) {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    }


    exportAsExcel() {
        const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data, { header: ['dataprop1', 'dataprop2'] });
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
    }*/
}