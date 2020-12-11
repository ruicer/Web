import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { SnackComponent } from '../snackbar/snackbar.component';


@Component({
    selector: 'uploadfile-app',
    templateUrl: './uploadFile.component.html'
})
export class UploadFileComponent implements OnInit {
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();
    @ViewChild('file', { static: true })
    myInputVariable: ElementRef;
    @Input() public urlEndpoint: string;
    constructor(private http: HttpClient,
      private cobranzaService: CobranzaService,
      private _snackBar: MatSnackBar,
      ) { }

    ngOnInit() {
      console.log(this.urlEndpoint);
    }
    openSnackBar(VALUE) {
      this._snackBar.openFromComponent(SnackComponent, {
          duration: 3500,
          data: VALUE
      });
  }

    public uploadFile = (files) => {
      this.cobranzaService.activate();
        if (files.length === 0) {
          this.openSnackBar('NO EXISTE ARCHIVO PARA CARGAR');
          return;
        }
        if (files.length > 1) {
          this.openSnackBar('SOLO SE PUEDE CARGAR UN ARCHIVO');
          return;
        };
        this.openSnackBar('CARGANDO ARCHIVO....');

        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.http.post(this.urlEndpoint, formData, {reportProgress: true, observe: 'events'})
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Cargado correctamente.';
              this.onUploadFinished.emit(event.body);
              this.reset();
              this.cobranzaService.deactivate();
            }
          });
      }

      reset () {
        this.myInputVariable.nativeElement.value = "";
      }

}