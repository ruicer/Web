import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignacionPermisos } from 'src/app/services/AsignacionPermisos';

@Component({
    selector: 'usuarios-dialog',
    templateUrl: 'usuarios-dialog.component.html',
})
export class UsuariosDialog implements OnInit {
    callCenterForm: FormGroup;
    listadoGestion = [];
    action = false;
    edit = false;
    constructor(
        public dialogRef: MatDialogRef<UsuariosDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private asignacionService: AsignacionPermisos,
    ) { }

    ngOnInit() {
        this.callCenterForm = this.formBuilder.group({
            PASSWORD: ['', Validators.required],
            PUESTO: ['', Validators.required],
            USUARIO: ['', Validators.required],
            EXTE: ['', Validators.required],
            NOMBRE: ['', Validators.required],
            ID_PROCURADOR: ['', Validators.required],
            ID: [''],
        });
        if(this.data) {
            this.edit = true;
            this.asignacionService.getUsuario(this.data).then((data : any) => {
                this.edit = false;
                this.callCenterForm.patchValue(data[0]);
                this.action = true;
            });           
        }

        this.asignacionService.PuestosDisponibles().then(data => {
            (<any>Object).values(data).forEach(element => {
                this.listadoGestion.push(element);
              });
        });

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if(this.callCenterForm.valid) {
            if(this.action) {
                this.asignacionService.updUs(this.callCenterForm.getRawValue()).then((data:any) => {
                    console.log(data)
                    this.responseComponent(data);
                });
            } else {
                this.asignacionService.addUs(this.callCenterForm.getRawValue()).then(data => {
                    console.log(data)
                    this.responseComponent(data);
                });
            }
        }
    }


    responseComponent(data) {
        console.log(data);
        if(data.Status) {
            console.log(data.Status)
            this.dialogRef.close(true);

        } else {
            this.dialogRef.close(false);

        }
    }

}