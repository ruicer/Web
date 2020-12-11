import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));

  constructor(private http: HttpClient) { }

  uploadFile(formData) {
    let urlApi = 'http://192.168.9.70:4000/api/load';
    return this.http.post(urlApi, formData);
  }
  uploadFileExcel(formData) {
    let urlApi = 'http://192.168.9.70:4000/excel/import/' + this.userAccount[0].USUARIO;
    return this.http.post(urlApi, formData);
  }
  uploadFileCartera(credito, codigo, sup) {
    return this
    .http
    .get('http://192.168.9.252/ControllerAsigform.ashx?cred=' +credito+ '&cod='+codigo+'&sup='+sup)
    .toPromise();
  }
}
