import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LlamadaService {
    //https://localhost:44337/http://srvweb/serviceCobranza/
    endpoint = 'http://192.168.9.252/serviceCobranza/';
    endpointCall = 'http://192.168.9.252:8090/jusancall/llamar.ashx?';
    endpointNw = 'https://localhost:44337/ControllerAddNum.ashx?';
    constructor(private http: HttpClient) {
    
    }

    getRealizarLlamada(extension, numero) {
        return this.http.get(this.endpointCall+'exte='+extension+'&donde='+numero+'').toPromise();
    }


    addNum(cred, rel, nom, us, num) {
        return this.http.get(this.endpoint+'ControllerAddNum.ashx?cred='+cred+'&rel='+rel+'&nom='+nom+'&us='+us+'&num='+num).toPromise();
    }


    getFiador(ID_PRESTAMO) {
        return this.http.get(this.endpoint + 'ControllerFiador.ashx?ID_CREDITO=' + ID_PRESTAMO).toPromise();
    }

    getPlan_pago(ID_PRESTAMO) {
        return this.http.get(this.endpoint +'ControllerPlanPago.ashx?action=1&ID_CREDITO='+ ID_PRESTAMO).toPromise();
    }

    getSaldo_Plan(ID_PRESTAMO) {
        return this.http.get(this.endpoint +'ControllerPlanPago.ashx?action=2&ID_CREDITO='+ ID_PRESTAMO).toPromise();
    }

    getNumeroTelefono(ID_PRESTAMO) {
        return this.http.get(this.endpoint +'ControllerNumeroTelefono.ashx?ID_CREDITO='+ ID_PRESTAMO).toPromise();
    }

    getSaldoLlamada(ID_PRESTAMO) {
        return this.http.get(this.endpoint +'ControllerSaldo.ashx?action=1&ID='+ ID_PRESTAMO).toPromise();
    }

    getClienteLlamada(ID_PRESTAMO) {
        return this.http.get(this.endpoint +'ControllerCliente.ashx?ID='+ ID_PRESTAMO).toPromise();
    }

    getGestion() {
        return this.http.get(this.endpoint + 'ControllerGestion.ashx?action=1').toPromise();
    }

    getNomGestion(ID_GESTION) {
        return this.http.get(this.endpoint + 'ControllerGestion.ashx?action=2&ID=' + ID_GESTION).toPromise();
    }

    getGestionRealizada(ID_PRESTAMO) {
        return this.http.get(this.endpoint + 'ControllerGestion.ashx?action=3&ID='+ ID_PRESTAMO).toPromise();
    }

    postGestion(values, id) {
        return this.
        http.
        get(this.endpoint +'ControllerGestion.ashx?action=4&ID='+id+'&credito=' + values.credito + '&noBoleta=' + values.noBoleta +
        '&monto=' +values.monto+ '&fechaBoleta=' +values.fechaBoleta+ '&idGestion=' +values.idGestion+ '&user=' +values.user) 
        .toPromise();
    }

    postGES(values) {
        return this
        .http
        .get(this.endpoint +'ControllerGestion.ashx?action=5&credito='+ values.credito +'&fecha=' +values.fecha+ '&tipoGestion=' +values.tipoGestion+
            '&monto=' +values.monto+ '&fechaPago=' +values.fechaPago+ '&obs=' +values.obs+ '&duracion=' +values.duracion+'&user='+values.user )
        .toPromise();
    }

    postCarta(values) {
        return this
        .http
        .get(this.endpoint + 'ControllerCarta.ashx?user='+values.user+'&carta=' +values.carta+ '&credito='+values.credito)
        .toPromise();
    }

    postGestionDiaria(values) {
        return this.http.get(this.endpoint + 'ControllerGestionDiaria.ashx?action=1&credito='+values.credito).toPromise();
    }
}