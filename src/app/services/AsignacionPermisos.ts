import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable()
export class AsignacionPermisos {

    endpoint = environment.urlApi;

    constructor(private http: HttpClient) {

    }


    getProcuradores(id) {
        return this.http.get(`${this.endpoint}procuradores/${id}`).toPromise();
    }

    async DrPermiso(id, suc) {
        return this.http.get(`${this.endpoint}sucursales/dr/asig/${id}/${suc}`).toPromise();

    }


    /**----------------------------------------------- */

    async getTipogestion() {
        return this.http.get(`${this.endpoint}tipoGestion`).toPromise();

    }

   

    async getNomenglatura() {
        return this.http.get(`${this.endpoint}nomGestion`).toPromise();

    }
    async TipoDr(id) {
        return this.http.get(`${this.endpoint}sucursales/dr/tipo/${id}`).toPromise();
    }

    async NomenglaturaDr(id) {
        return this.http.get(`${this.endpoint}sucursales/dr/nomenglatura/${id}`).toPromise();
    }

    async NomenglaturaAdd(id) {
        return this.http.post(`${this.endpoint}add/nomenglatura/`, id).toPromise();
    }


    async TipoAdd(id) {
        return this.http.post(`${this.endpoint}add/tipo/gestion`, id).toPromise();
    }

    /**----------------------------------------------- */



    async PermisosNoAsignados(id) {
        return this.http.get(`${this.endpoint}sucursales/not/asig/${id}`).toPromise();

    }
    async PermisosAsignados(id) {
        return this.http.get(`${this.endpoint}sucursales/asig/${id}`).toPromise();

    }

    async PermisosAddAsig(id) {
        return this.http.post(`${this.endpoint}add/per/`, id).toPromise();

    }

    async PuestosDisponibles() {
        return this.http.get(`${this.endpoint}puestos/`).toPromise();

    }

    async getUsuario(id) {
        return this.http.get(`${this.endpoint}/usuarios/edit/crd/${id}`).toPromise();

    }
    async delUsu(id) {
        return this.http.get(`${this.endpoint}usuario/del/${id}`).toPromise();

    }


    async addUs(body) {
        return this.http.post(`${this.endpoint}usuarios/add/`, body).toPromise();
    }
    async updUs(body) {
        return this.http.post(`${this.endpoint}usuarios/upd/`, body).toPromise();
    }


    /************************************* */

    async getbienes() {
        return this.http.get(`${this.endpoint}bienes`).toPromise();

    }

    async bienDr(id) {
        return this.http.get(`${this.endpoint}dr/bien/${id}`).toPromise();
    }

    
    async bienAdd(id) {
        return this.http.post(`${this.endpoint}add/bien/`, id).toPromise();

    }


/********************************************* */
   /************************************* */

async getAbonos() {
    return this.http.get(`${this.endpoint}abonos`).toPromise();

}

async abonoDr(id) {
    return this.http.get(`${this.endpoint}dr/abono/${id}`).toPromise();
}


async abonoAdd(id) {
    return this.http.post(`${this.endpoint}add/bono/`, id).toPromise();

}


/********************************************* */
   /************************************* */

async getTipoCargo() {
    return this.http.get(`${this.endpoint}tipoCargo`).toPromise();

}

async tipoCargoDr(id) {
    return this.http.get(`${this.endpoint}dr/tipoCargo/${id}`).toPromise();
}


async tipoCargoAdd(id) {
    return this.http.post(`${this.endpoint}add/tipoCargo/`, id).toPromise();

}


/********************************************* */

/********************************************* */

async credIncobrables(sucu) {
    return this.http.get(`${this.endpoint}incobrables/${sucu}`).toPromise();
}

/********************************************* */


async addIncobrables(id, procu) {
    return this.http.get(`${this.endpoint}add/inco/${id}/${procu}`).toPromise();
}

async delIncobrables(id) {
    return this.http.get(`${this.endpoint}del/inco/${id}`).toPromise();
}

async reversaIncobrables(id, fech) {
    return this.http.get(`${this.endpoint}incobrables/reversa/${id}/${fech}`).toPromise();
}
/** */
async getAsignado() {
    return this.http.get(`${this.endpoint}puestos/asignac`).toPromise();

}

async getVistaAsig(id) {
    return this.http.get(`${this.endpoint}vistas/asig/${id}`).toPromise();
}

async getVistaAsigNo(id) {
    return this.http.get(`${this.endpoint}vistas/not/asig/${id}`).toPromise();
}


async delVista(id) {
    return this.http.get(`${this.endpoint}vistas/del/${id}`).toPromise();
}


async addVistaPer(body) {

    return this.http.post(`${this.endpoint}vistas/add`, body).toPromise();
}
/** */

}