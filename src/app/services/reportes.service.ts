import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable()
export class ReportesService {

    endpoint = environment.urlApi;

    constructor(private http: HttpClient) {

    }
    async getRepContact(id) {
        return this.http.get(`${this.endpoint}reporte/contactabilidad/${id}`).toPromise();
    }

    async getDetalle(id, ins ) {
        return this.http.get(`${this.endpoint}reporte/detalle/${id}/${ins}`).toPromise();
    }
    
    async getMora1(suc, procu, skip ) {
        return this.http.get(`${this.endpoint}morasMayorAsg/${suc}/${procu}/${skip}/5`).toPromise();
    }
    
    async getMora1Asign(suc, skip) {
        return this.http.get(`${this.endpoint}morasMayor/${suc}/${skip}/5`).toPromise();
    }


    async getGestion(fecin, fecfin, skip) {
        return this.http.get(`${this.endpoint}gestiones/realizadas/${fecin}/${fecfin}/${skip}/5`).toPromise();
    }

    getExcelGestion(fecin, fecfin) {

        return this.http.get(`${this.endpoint}/reporte/gestiones/${fecin}/${fecfin}`, { responseType: 'blob' as 'blob' });
    }
    getExcel(suc) {

        return this.http.get(`${this.endpoint}reporte/morasMayor/${suc}`, { responseType: 'blob' as 'blob' });
    }


    getConsolidado() {

        return this.http.get(`${this.endpoint}reporte/consolidado/`, { responseType: 'blob' as 'blob' });
    }


    getPlantillas(nombre) {

        return this.http.get(`${this.endpoint}plantilla/${nombre}/`, { responseType: 'blob' as 'blob' });
    }

    async getConsolidadoSkips(skip) {
        return this.http.get(`${this.endpoint}consolidado/${skip}/5`).toPromise();
    }



    async getUsSearch(skip, search) {
        return this.http.get(`${this.endpoint}usuarios/crd/${skip}/5/${search}`).toPromise();
    }


    
    async getUs(skip) {
        return this.http.get(`${this.endpoint}usuarios/crd/${skip}/5`).toPromise();
    }

   
    

    
    async getDemandaEstado(us, skip) {
        return this.http.get(`${this.endpoint}demanda/${us}/${skip}/5`).toPromise();
    }


    async getDemandaEstadoGen(us, skip) {
        return this.http.get(`${this.endpoint}demanda/gen/${us}/${skip}/5`).toPromise();
    }


    async getConvenioRango(fecin, fecfin, skip) {
        return this.http.get(`${this.endpoint}convenios/fecs/${skip}/5/${fecin}/${fecfin}`).toPromise();
    }
    async getConvenioFech(fecin, skip) {
        return this.http.get(`${this.endpoint}convenios/dias/${skip}/5/${fecin}`).toPromise();
    }

    getRangoConveniosRep(fecin) {

        return this.http.get(`${this.endpoint}reporte/convenios/fec/${fecin}`, { responseType: 'blob' as 'blob' });
    }
    getbyFecCovenios(fecin, fecfin) {

        return this.http.get(`${this.endpoint}reporte/convenios/fecs/rag/${fecin}/${fecfin}`, { responseType: 'blob' as 'blob' });
    }


    getDemandaEstadoReport(us) {

        return this.http.get(`${this.endpoint}reporte/demandaEstado/${us}`, { responseType: 'blob' as 'blob' });
    }


    
    getDemandaEstadoReportGen(us) {

        return this.http.get(`${this.endpoint}reporte/demandaEstado/gen/${us}`, { responseType: 'blob' as 'blob' });
    }


}