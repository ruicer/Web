import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';

@Component({
    selector: 'abonos-dialog',
    templateUrl: 'abonos-dialog.component.html',
})
export class AbonosDialog implements OnInit {
    callCenterForm: FormGroup;
    listadoGestion = [];
    constructor(
        public dialogRef: MatDialogRef<AbonosDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private asignacionService: AsignacionPermisos,
    ) { }

    ngOnInit() {
        this.callCenterForm = this.formBuilder.group({
            DESCRIPCION: ['', Validators.required],
        });

        this.asignacionService.getTipogestion().then(data => {
            (<any>Object).values(data).forEach(element => {
                this.listadoGestion.push(element);
              });
              console.log(this.listadoGestion);
        });

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if(this.callCenterForm.valid) {
            this.asignacionService.abonoAdd(this.callCenterForm.getRawValue())
                .then((data:any) => {
                    if(data.Status) {
                        this.dialogRef.close(true);
                    } else {
                        this.dialogRef.close(false);
                    }
                 });
        }
    }

}