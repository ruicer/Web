import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//MODELO PARA DATOS DEL USUARIO
export class User {
  [x: string]: any;
    USUARIO: string;
    PASSWORD: string;
    ID_PROCURADOR: string;
    PUESTO: string;
    EXTE: string;
}
//MODELO PARA DATOS DEL USUARIO

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public currentUserSubjects: BehaviorSubject<boolean>;
    public currentMenus: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.stringify(sessionStorage.getItem('USER')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubjects = new BehaviorSubject<any>(Boolean);
        this.currentMenus = this.currentUserSubjects.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    setVarMenu(value) {
        this.currentUserSubjects.next(value);
    }

    public get currentMenuValue(): User {
        return this.currentUserSubject.value;
    }
    login(username: any) {
        //https://localhost:44337/http://srvweb/serviceCobranza/
        return this.http.get<any>(`http://192.168.9.252/serviceCobranza/ControllerUsuario.ashx?action=1&user=`+username.user+`&password=`+username.password+``)
            .toPromise().then((data: any) => {
                if (data.length > 0) {
                    sessionStorage.setItem('USER', btoa(JSON.stringify(data)));
                    //sessionStorage.setItem('PRUEBA', btoa(JSON.stringify(data)));
                    this.currentUserSubject.next(data);
                }
                return data;
            });
    }

    logout() {
        sessionStorage.clear();
        this.currentUserSubject.next(null);
        this.currentUserSubjects.next(false);

    }

    first(us) {
        return this.http.get(`http://192.168.9.252/serviceCobranza/ControllerTime.ashx?action=1&user=` +us).toPromise();
    }

    addFirst(us) {
        return this.http.get(`http://192.168.9.252/serviceCobranza/ControllerTime.ashx?action=2&user=` +us).toPromise();
    }
    
}