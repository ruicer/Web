import { Component, Inject, ɵConsole, Output, EventEmitter } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { UploadServiceService } from 'src/app/services/upload-service.service';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { SnackComponent } from '../../../components/snackbar/snackbar.component';
import * as XLSX from 'xlsx';


type AOA = any[][];
@Component({
    selector: 'fileexcel-app',
    templateUrl: './file-excel.component.html',
    styleUrls: ['./file-excel.component.scss'],
})
export class FileExcelComponent {
    @Output() public throttle = new EventEmitter();
    uploadedFiles: Array<File>;
    load = false;
    userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
    dataReturn = [];


    /**. */
    data: AOA = [[1, 2], [3, 4]];
    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'SheetJS.xlsx';
  
    constructor(private service: UploadServiceService,
        private cobranzaService: CobranzaService,
        private _snackBar: MatSnackBar) {

    }
    FILENAME = 'EXCEL';
    export;
    fileChange(element) {
        this.export = element.target;
        this.uploadedFiles = element.target.files;
        this.FILENAME = this.uploadedFiles[0].name;
        

    }

    async upload() {
        this.load = true;
        this.cobranzaService.activate();
        const target: DataTransfer = <DataTransfer>(this.export);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
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
          let count = 0;
          this.data.forEach(values => {
              count = count + 1;
              let s = [];
              this.cobranzaService.getCredito(this.userAccount[0].USUARIO, values[0]).then((data): any => {
                  (<any>Object).values(data).forEach(element => {
                      s.push(element);
                  });
                  this.throttle.emit(s);
              })
          });
        };
        reader.readAsBinaryString(target.files[0]);
        /*if (this.uploadedFiles) {
            this.cobranzaService.activate();
            let formData = new FormData();
            for (var i = 0; i < this.uploadedFiles.length; i++) {
                formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
            }
            this.load = true;
            this.service.uploadFileExcel(formData).subscribe((res): any => {
                (<any>Object).values(res).forEach((ID: any) => {
                    this.dataReturn.push(ID);
                    let s = [];
                    this.cobranzaService.getCredito(this.userAccount[0].USUARIO, ID).then((data): any => {
                        console.log(data);
                        (<any>Object).values(data).forEach(element => {
                            s.push(element);
                        });
                        this.throttle.emit(s);
                    }).catch(data => {
                        this.openSnackBar('OCURRIO UN ERROR AL TRANSPORTAR DATA DEL SERVIDOR!');
                      });
                });
            });
        } else {
            this.openSnackBar('INGRESE UN DOCUMENTO');
        }*/
    }

 
    openSnackBar(VALUE) {
        this._snackBar.openFromComponent(SnackComponent, {
            duration: 1000,
            data: VALUE
        });
    }
}
