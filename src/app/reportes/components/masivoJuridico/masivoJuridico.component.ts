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
import { environment } from 'src/environments/environment';

@Component({
    selector: 'masivoJuridico-app',
    templateUrl: './masivoJuridico.component.html',
    styleUrls: ['./masivoJuridico.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class MasivoJuridicoComponent implements OnInit {

   
    message = '';
    endpoint = environment.urlApi;
    show = false;
    userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
    totalGes;
    mostrarTotal;
    urlEndpoint = `${this.endpoint}uploadFileJuridico/${this.userAccount[0].ID_PROCURADOR}`;
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
        console.log(this.urlEndpoint)
    }

    openSnackBar(VALUE) {
        this._snackBar.openFromComponent(SnackComponent, {
            duration: 3000,
            data: VALUE
        });
    }

    uploadFinished(e) {
        if(e.Status) {
            

            this.message = e.Message;
            this.show = e.Status;
            this.router.navigate(['/reportes/masivoJuridico'])

        }

    }

    export() {
        this.cobranzaService.activate();
        this.reportService.getPlantillas('PlantillaCobroJuridico').subscribe(fileData => {
            const blob: any = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            let link = document.createElement("a");

            if (link.download !== undefined) {
                let url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", 'PlantillaCobroJuridico.xls');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            this.cobranzaService.deactivate();
            this.openSnackBar('Plantilla Descargada');
        });
    }
}