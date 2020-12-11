import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class CobranzaService {
//https://localhost:44337/http://srvweb/serviceCobranza/
    endpoint = 'http://192.168.9.252/serviceCobranza/';
    public spinnerActive: EventEmitter<Boolean>;
    endpoints = environment.urlApi;


  constructor(private http: HttpClient) {
    this.spinnerActive = new EventEmitter();

   }
    activate(){
        this.spinnerActive.emit(true)
    }
 
    deactivate(){
         this.spinnerActive.emit(false)
    }


    getProcuradores(id, sub) {
        return this.http.get(`${this.endpoints}permisos/${id}/${sub}`);
    }

    getReporte(fecin, fecfn, sucursal) {
        const endpoint = 'http://192.168.9.252/serviceCobranza/';
        return this.http
            .get(endpoint +'ReporteDiario.ashx?fecIn=' +fecin+'&fecFin=' +fecfn+ '&sucursal=' +sucursal) 
            .toPromise();  
  }

    uploadFileCartera(credito, codigo, sup) {
        return this
        .http
        .get(this.endpoint +'ControllerAsigform.ashx?cred=' +credito+ '&cod='+codigo+'&sup='+sup)
        .toPromise();
      }

  getEstados() {
      return this.http.get(this.endpoint +'ControllerEstado.ashx').toPromise();
  }


  getSucursales(procurador) {
      return this.http.get(this.endpoint  +'ControllerSucursal.ashx?procurador='+procurador).toPromise();
  }

  getTipoGestiones() {
      return this.http.get(this.endpoint + 'ControllerTipoGestion.ashx').toPromise();
  }
  
  getCreditos(usuario, sucursal, mora) {
        return this.http
            .get(this.endpoint +'ControllerCredito.ashx?user=' +usuario+'&sucursal=' +sucursal+ '&mora=' +mora) 
            .toPromise();  
  }

  getCreditosAldia(usuario, sucursal) {
      const usPru = 'https://localhost:44337/';
    return this.http
        .get(this.endpoint +'ControllerAldia.ashx?user=' +usuario+'&sucursal=' +sucursal) 
        .toPromise();  
}

  async getCredito(usuario, cred) {
    const values = await this.http
    .get(this.endpoint +'ControllerNumCredito.ashx?user=' +usuario+'&id=' +cred) 
    .toPromise();
    return values
}

  changeExtension(data) {
      return this.http
      .get(this.endpoint +'ControllerUsuario.ashx?action=2&extension=' +data.extension+ '&user=' +data.user)
      .toPromise();
  }

  getGestionDiaria(){
      return this.http.get(this.endpoint +'ControllerGestionDiaria.ashx?action=2').toPromise();
  }

}