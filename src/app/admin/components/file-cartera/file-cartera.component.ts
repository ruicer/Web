import { Component, Inject, ɵConsole, Output, EventEmitter } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { UploadServiceService } from 'src/app/services/upload-service.service';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
    selector: 'filecartera-app',
    templateUrl: './file-cartera.component.html',
    styleUrls: ['./file-cartera.component.scss'],
})
export class FileCarteraComponent {

    data: AOA = [[1, 2], [3, 4]];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
    count = 0;
    @Output() public throttle = new EventEmitter();
    uploadedFiles: Array<File>;
    load = false;
    userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
    dataReturn = [];
    constructor(private service: UploadServiceService,
        private cobranzaService: CobranzaService,
        private _snackBar: MatSnackBar) {

    }
    FILENAME = 'EXCEL';

    fileChange(evt: any) {
        /* wire up file reader */
        this.cobranzaService.activate();
        
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        this.FILENAME = target.files[0].name;
        let dataReturn = [];

        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            this.data.forEach(dat => {
                if (dat.length > 0) {
                    if (typeof (dat[0]) === 'number' && typeof (dat[1]) === 'number' && typeof (dat[2]) === 'number') {
                        dataReturn.push(dat);
                        //debugger;
                        this.cobranzaService.uploadFileCartera(dat[0], dat[1], dat[2]).then( (respond : any) => {
                            //console.log(respond);
                            if(respond[0].response) {
                            } 
                            this.count  = this.count +1;
                            console.log(this.count);
                        }).catch(() => {
                            this.openSnackBar('¡ERROR EN LA CARGA DE CARTERA!');
                        });
                    }
                }
            });
            this.cobranzaService.deactivate();
            this.throttle.emit(dataReturn);

        };

        reader.readAsBinaryString(target.files[0]);
    }





    openSnackBar(VALUE) {
        this._snackBar.openFromComponent(SnackComponent, {
            duration: 1000,
            data: VALUE
        });
    }
}
