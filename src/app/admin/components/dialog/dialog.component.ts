import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, AfterViewInit, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CobranzaService } from 'src/app/services/cobranza.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LlamadaService } from 'src/app/services/llamada.service';
import { MatTabGroup } from '@angular/material/tabs/typings/tab-group';

@Component({
  selector: 'dialog-app',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DialogComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['LLAMADA', 'TIPO', 'NOMBRE', 'TELPRINCIPAL', 'EDIT'];
  displayedColumnsFiadores: string[] = ['CREDITO', 'NOM_FIADOR', 'CODIGO', 'TELEFONO', 'TELTRABAJO', 'TELNEGOCIO'];
  displayedColumnsPlan: string[] = ['FECHA', 'ESTATUS', 'CAPITAL', 'MORA', 'TOTAL'];
  displayedColumnsGes: string[] = ['CREDITO', 'FECLLAMADA', 'GESTION', 'MONTO', 'FECPAGO', 'OBS', 'DURLLAMADA', 'US'];

  dataSource = new MatTableDataSource();
  dataSourceFiadores = new MatTableDataSource();
  dataSourcePlan = new MatTableDataSource();
  dataGestionesRealizadas = new MatTableDataSource();

  formDatosCliente: FormGroup;
  formSaldoCobro: FormGroup;
  formAddGestion: FormGroup;
  form: FormGroup;
  PRESTAMO: any;
  @ViewChild('onePaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('twopaginador', { static: true }) paginatorFiadores: MatPaginator;
  @ViewChild('treepaginador', { static: true }) paginatorPlan: MatPaginator;
  @ViewChild('fourpaginador', { static: true }) paginatorGestiones: MatPaginator;
  @ViewChild('tab', { static: true }) tab: MatTabGroup;


  message = 'GESTION REALIZADA';
  ID_PRESTAMO;
  valueCliente;
  valueIntereses;
  gestiones;
  TipoGestion;
  nomID;
  nomenglaturas;
  boleta = true;
  observaciones = false;
  convenio = true;
  cartas = true;
  volverLlamar = false;

  viewReloj;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval;
  warn = false;
  mora;
  observacionAdd = false;
  warnObs;
  primary;

  numVisible = true;
  addNum = false;
  formAddNum: FormGroup;
  rowEdit;
  rowAdd;
  isCall = false;


  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    public router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private llamadaService: LlamadaService,

  ) {

    this.dataSource = new MatTableDataSource(data[0]);
    this.dataSourceFiadores = new MatTableDataSource(data[2]);
    this.dataSourcePlan = new MatTableDataSource(data[1]);
    this.valueCliente = this.data[3];
    this.valueIntereses = this.data[4];
    this.dataGestionesRealizadas = new MatTableDataSource(this.data[6]);

  }

  ngOnInit() {
    this.isCall = false;

    let total2 = this.valueIntereses[0].INTPORCOBRAR + this.valueIntereses[0].MORAACUMULADO;
    let total3 = this.valueIntereses[0].MORADELPERIODO + this.valueIntereses[0].MORAACUMULADO;

    this.formAddGestion = this.formBuilder.group({
      noBoleta: ['', Validators.required],
      montoBoleta: ['', Validators.required],
      montoPromesa: ['', Validators.required],
      horaLlamada: ['', Validators.required],
      fecha: ['', Validators.required],
      fechaVolver: ['', Validators.required],
      fechaBoleta: ['', Validators.required],
      observaciones: ['', Validators.required],
      observacionesConvenio: ['', Validators.required],
      observacionesBoleta: ['', Validators.required],
      observacionesCartas: ['', Validators.required],
      cartaurl: ['', Validators.required]
    });

    this.formDatosCliente = this.formBuilder.group({
      credito: new FormControl({ value: this.valueCliente[0].CANUCR, disabled: true }, Validators.required),
      nombre: new FormControl({ value: this.valueCliente[0].CRNOMB, disabled: true }, Validators.required),
      capital: new FormControl({ value: this.valueCliente[0].DIASMORACAPITAL, disabled: true }, Validators.required),
      interes: new FormControl({ value: this.valueCliente[0].DIASMORAINTERES, disabled: true }, Validators.required),
      entrega: new FormControl({ value: this.valueCliente[0].FECHA_VENCIMIENTO, disabled: true }, Validators.required),
      vencimiento: new FormControl({ value: this.valueCliente[0].FECHA_ENTREGA, disabled: true }, Validators.required),
      otorgado: new FormControl({ value: this.valueCliente[0].CAPITAL_OTORGADO, disabled: true }, Validators.required)
    });

    this.formSaldoCobro = this.formBuilder.group({
      adelantado: new FormControl({ value: '', disabled: true }, Validators.required),
      atrasado: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required),
      sigPagoCap: new FormControl({ value: 0, disabled: true }, Validators.required),
      total1: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required),
      capitalizado: new FormControl({ value: 0, disabled: true }, Validators.required),
      porCobrar: new FormControl({ value: this.valueIntereses[0].INTPORCOBRAR, disabled: true }, Validators.required),
      proyectado: new FormControl({ value: this.valueIntereses[0].INTPROYECTADO, disabled: true }, Validators.required),
      total2: new FormControl({ value: total2, disabled: true }, Validators.required),
      moraPeriodo: new FormControl({ value: this.valueIntereses[0].MORADELPERIODO, disabled: true }, Validators.required),
      moraAcumulada: new FormControl({ value: this.valueIntereses[0].MORAACUMULADO, disabled: true }, Validators.required),
      acumulado: new FormControl({ value: 0, disabled: true }, Validators.required),
      total3: new FormControl({ value: total3, disabled: true }, Validators.required),
      cobroproyectado: new FormControl({ value: 0, disabled: true }, Validators.required),
      cobrosJudiciales: new FormControl({ value: 0, disabled: true }, Validators.required),
      total4: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required),
      total5: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required),
      total6: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required),
      total7: new FormControl({ value: this.valueIntereses[0].CAPITALATRASADO, disabled: true }, Validators.required)
    });

    this.formAddNum = this.formBuilder.group({
      numero: new FormControl(  { value:'', disabled: false },  [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
        //Validators.pattern('[0-9]*')
      ]),
      rel: new FormControl(  { value:'', disabled: false })
   
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data[0];
    this.dataSourceFiadores.paginator = this.paginatorFiadores;
    this.dataSourceFiadores.data = this.data[2];
    this.dataSourcePlan.data = this.data[1];
    this.dataSourcePlan.paginator = this.paginatorPlan;
    this.dataGestionesRealizadas.paginator = this.paginatorGestiones;
    this.gestiones = this.data[5];
    this.ID_PRESTAMO = this.data[7];
    this.mora = this.data[8];


    this.formAddGestion.get('observaciones').valueChanges.subscribe(data => {
        if (data.length > 0) {
          this.observacionAdd = true;
        } else {
          this.observacionAdd = false;
        }

    });
    
    this.formAddGestion.get('observacionesConvenio').valueChanges.subscribe(data => {
        if (data.length > 0) {
          console.log('entro convenio');
          this.observacionAdd = true;
        } else {
          this.observacionAdd = false;
        }

    });
    this.formAddGestion.get('observacionesBoleta').valueChanges.subscribe(data => {
      if (data.length > 0) {
        console.log('entro boletas');

        this.observacionAdd = true;
      } else {
        this.observacionAdd = false;
      }

  });

  this.formAddGestion.get('observacionesCartas').valueChanges.subscribe(data => {
    if (data.length > 0) {
 
      this.observacionAdd = true;
    } else {
      this.observacionAdd = false;
    }

});
  }

  ngAfterViewInit() {
  }


  startTimer() {
    this.viewReloj = true;
    this.interval = setInterval(() => {
      if (this.seconds >= 0) {
        this.seconds = this.seconds + 1;
      }
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes == 60) {
        this.minutes = 0;
        this.hours++;
      }
    }, 1000)
  }

  changeSelect(event) {
    this.TipoGestion = event.source.value;
    this.llamadaService.getNomGestion(event.source.value).then(data => {
      this.nomenglaturas = data;
    });
  }

  editarNum(row) {
    console.log(row);
    console.log(row.TELPRINCIPAL);
    this.rowEdit = row;
    this.formAddNum.get('numero').setValue(row.TELPRINCIPAL);
    this.addNum = true;
    this.numVisible = false;
  }

  addNumTelefono() {
    console.log(this.formAddNum.valid);
    console.log(this.userAccount[0].USUARIO)
    this.addNum = false;
    this.numVisible = true;
    if(this.rowAdd) {
      this.llamadaService
    .addNum( this.formDatosCliente.get('credito').value, this.formAddNum.get('rel').value, this.formAddNum.get('rel').value,
     this.userAccount[0].USUARIO , this.formAddNum.get('numero').value).then(data => {
     
     });
     let objNew = {
       TIPO:   this.formAddNum.get('rel').value,
       NOMBRE:  this.formAddNum.get('rel').value, 
       CANUCR: this.formAddNum.get('rel').value, 
       TELPRINCIPAL:  this.formAddNum.get('numero').value
     }

     this.dataSource.data.push(objNew);
    } else {
    this.llamadaService
    .addNum(this.formDatosCliente.get('credito').value, this.rowEdit.TIPO, this.rowEdit.TIPO,
     this.userAccount[0].USUARIO , this.formAddNum.get('numero').value).then(data => {
     });
    
     this.dataSource.data.forEach((e :any) => {
      
      if(e.TIPO === this.rowEdit.TIPO ) {

        e.TELPRINCIPAL = this.formAddNum.get('numero').value;
      }
     });
    }
  }

  call(row) {
    this.isCall = true;
    this.llamadaService.getRealizarLlamada(this.userAccount[0].EXTE, row.TELPRINCIPAL).then(data => {
      this.startTimer();
    });
  }

  addNumMe() {
    this.rowAdd = true;
    this.formAddNum.get("numero").setValue('');
  }
  
  regresar() {
    this.addNum = false;
    this.numVisible = true;

  }


  changeSelectNom(event) {
    this.nomID = event.source.value;
    if (this.TipoGestion == 8) {
      switch (this.nomID) {
        case '136':
          this.volverLlamar = false;
          this.observaciones = true;
          this.boleta = false;
          this.convenio = true;
          this.cartas = true;
          this.tab.selectedIndex = 2;
          break;
        case '137':
          this.volverLlamar = false;
          this.observaciones = true;
          this.boleta = true;
          this.convenio = false;
          this.cartas = true;
          this.tab.selectedIndex = 1;
          break;
        case '140':
          this.volverLlamar = true;
          this.changeObservaciones();
          break;
        case '141':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '146':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '147':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '148':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '149':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '150':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '151':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '174':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '175':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '196':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }
    if (this.TipoGestion == 16) {
      switch (this.nomID) {
        case '170':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
        case '171':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
        case '192':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
      }
    }
    if (this.TipoGestion == 14) {
      switch (this.nomID) {
        case '163':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
        case '164':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
        case '165':

          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '166':
          this.volverLlamar = false;

          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 12) {
      switch (this.nomID) {
        case '153':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '154':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '155':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '156':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '157':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '158':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 13) {
      switch (this.nomID) {
        case '159':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '160':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '162':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 15) {
      switch (this.nomID) {
        case '167':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '168':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '169':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 19) {
      switch (this.nomID) {
        case '180':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '181':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 20) {
      switch (this.nomID) {
        case '182':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '183':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
      }
    }

    if (this.TipoGestion == 21) {
      switch (this.nomID) {
        case '184':
          this.volverLlamar = false;
          this.changeObservaciones();
          break;
        case '185':
          this.boleta = true;
          this.observaciones = true;
          this.convenio = true;
          this.cartas = false;
          this.tab.selectedIndex = 3;
          break;
      }
    }

  }

  changeObservaciones() {
    this.boleta = true;
    this.observaciones = false;
    this.convenio = true;
    this.cartas = true;
    this.tab.selectedIndex = 0;
  }

  close() {
    this.dialogRef.close();
  }

  addGestion() {
    if (this.seconds > 0) {
      if(this.observacionAdd) {
        let values = {};
      let GESTEL = {};
        console.log('entro a agregar');
      let dateGestion = new Date();
      let fecha = dateGestion.getFullYear() + '-' + (dateGestion.getMonth() + 1) + '-' + dateGestion.getDate();
      let userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
      if (this.nomID) {
        if (this.nomID === '136') {
          let dat = new Date(this.formAddGestion.get('fechaBoleta').value);
          if ((dat.getMonth() + 1) >= 10) {
            let date = dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
            values = {
              credito: this.ID_PRESTAMO,
              noBoleta: this.formAddGestion.get('noBoleta').value,
              monto: this.formAddGestion.get('montoBoleta').value,
              idGestion: this.nomID,
              user: userAccount[0].USUARIO,
              fechaBoleta: date
            };
            GESTEL = {
              credito: this.ID_PRESTAMO,
              fecha: fecha,
              obs: this.formAddGestion.get('observacionesBoleta').value,
              tipoGestion: this.nomID,
              monto: this.formAddGestion.get('montoBoleta').value,
              fechaPago: date,
              duracion: this.minutes + ':' + this.seconds,
              user: userAccount[0].USUARIO,
            };
          } else {
            let date = dat.getFullYear() + '-0' + (dat.getMonth() + 1) + '-' + dat.getDate();
            values = {
              credito: this.ID_PRESTAMO,
              noBoleta: this.formAddGestion.get('noBoleta').value,
              monto: this.formAddGestion.get('montoBoleta').value,
              idGestion: this.nomID,
              user: userAccount[0].USUARIO,
              fechaBoleta: date
            };
            GESTEL = {
              credito: this.ID_PRESTAMO,
              fecha: fecha,
              obs: this.formAddGestion.get('observacionesBoleta').value,
              tipoGestion: this.nomID,
              monto: this.formAddGestion.get('montoBoleta').value,
              fechaPago: date,
              duracion: this.minutes + ':' + this.seconds,
              user: userAccount[0].USUARIO
            };
          }
          this.ADD(values);
        }
        if (this.nomID === '137') {
          let date = new Date(this.formAddGestion.get('fecha').value);
          let dat = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          values = {
            credito: this.ID_PRESTAMO,
            monto: this.formAddGestion.get('montoPromesa').value,
            idGestion: this.nomID,
            user: userAccount[0].USUARIO
          };
          GESTEL = {
            credito: this.ID_PRESTAMO,
            fecha: fecha,
            obs: this.formAddGestion.get('observacionesConvenio').value,
            tipoGestion: this.nomID,
            monto: this.formAddGestion.get('montoPromesa').value,
            fechaPago: dat,
            duracion: this.minutes + ':' + this.seconds,
            user: userAccount[0].USUARIO
          };
          this.ADD(values);
        }
        if (this.nomID === '140') {
          let dat = new Date(this.formAddGestion.get('fechaVolver').value);
          if ((dat.getMonth() + 1) >= 10) {
            let date = dat.getFullYear() + '-' + (dat.getMonth() + 1) + '-' + dat.getDate();
            values = {
              credito: this.ID_PRESTAMO,
              fecha: date,
              horaLlamada: this.formAddGestion.get('horaLlamada').value,
              idGestion: this.nomID,
              user: userAccount[0].USUARIO
            };
            GESTEL = {
              credito: this.ID_PRESTAMO,
              fecha: fecha,
              obs: this.formAddGestion.get('observaciones').value,
              tipoGestion: this.nomID,
              monto: 0,
              fechaPago: date,
              duracion: this.minutes + ':' + this.seconds,
              user: userAccount[0].USUARIO
            };

          } else {
            let date = dat.getFullYear() + '-0' + (dat.getMonth() + 1) + '-' + dat.getDate();
            values = {
              credito: this.ID_PRESTAMO,
              fecha: date,
              horaLlamada: this.formAddGestion.get('horaLlamada').value,
              idGestion: this.nomID,
              user: userAccount[0].USUARIO
            };
            GESTEL = {
              credito: this.ID_PRESTAMO,
              fecha: fecha,
              obs: this.formAddGestion.get('observaciones').value,
              tipoGestion: this.nomID,
              monto: 0,
              fechaPago: date,
              duracion: this.minutes + ':' + this.seconds,
              user: userAccount[0].USUARIO
            };
          }

          this.ADD(values);

        }
        if (this.nomID === '185') {
          GESTEL = {
            credito: this.ID_PRESTAMO,
            fecha: fecha,
            obs: this.formAddGestion.get('observacionesCartas').value,
            tipoGestion: this.nomID,
            monto: 0,
            fechaPago: fecha,
            duracion: this.minutes + ':' + this.seconds,
            user: userAccount[0].USUARIO
          };

          let valueCarta = {
            user: userAccount[0].USUARIO,
            carta: this.ID_PRESTAMO + this.mora + ' Carta ' + this.formAddGestion.get('cartaurl').value,
            credito: this.ID_PRESTAMO,
          };
          this.llamadaService.postCarta(valueCarta).then(data => { });
        }

        if (this.nomID !== '140' && this.nomID !== '137' && this.nomID !== '136') {
          GESTEL = {
            credito: this.ID_PRESTAMO,
            fecha: fecha,
            obs: this.formAddGestion.get('observaciones').value,
            tipoGestion: this.nomID,
            monto: 0,
            fechaPago: fecha,
            duracion: this.minutes + ':' + this.seconds,
            user: userAccount[0].USUARIO
          };
        }
      } else {
        GESTEL = {
          credito: this.ID_PRESTAMO,
          fecha: fecha,
          obs: this.formAddGestion.get('observaciones').value,
          tipoGestion: 16,
          monto: 0,
          fechaPago: fecha,
          duracion: this.minutes + ':' + this.seconds,
          user: userAccount[0].USUARIO
        };
      }

      const va = {
        credito: this.ID_PRESTAMO
      };
      this.llamadaService.postGestionDiaria(va).then(() => { });
      this.llamadaService.postGES(GESTEL).then(data => {
        this.dialogRef.close();
        this.observacionAdd = false;
      });

      } else {
        this.warnObs = true;
        setTimeout(() => {
          this.warnObs = false;
        }, 2500)
      }

    } else {
      this.warn = true;
      setTimeout(() => {
        this.warn = false;
      }, 2500)
    }

  }

  ADD(VAL) {
    this.llamadaService.postGestion(VAL, this.nomID).then(data => {

    });
  }

  onThrottle(e) {
    this.formAddGestion.get('cartaurl').setValue(e);
  }
}
