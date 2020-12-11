import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../components/snackbar/snackbar.component';
import { CobranzaService } from '../services/cobranza.service';
import { debug } from 'util';


@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  constructor(private authenticationService: AuthenticationService,
    private cobranzaService: CobranzaService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {


  }

  ngOnInit() {

    sessionStorage.clear();
    this.authenticationService.currentUserSubject.next(null);
    this.authenticationService.currentUserSubjects.next(null);
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      extension: ['', Validators.required]
    });
  }
  verifyLogin() {
    let values = [];
    this.cobranzaService.activate();

    this.authenticationService.login(this.loginForm.getRawValue())
      .then(data => {
        if (data.length > 0) {
          this.authenticationService.first(data[0].USUARIO).then((val: any) => {
            (<any>Object).values(val).forEach(da => {
              values.push(da);
            });
            if (values.length > 0) {
              this.router.navigate(['/admin/inicio']);
              this.cobranzaService.deactivate();
            } else {
              this.router.navigate(['/admin/video']);
              this.authenticationService.addFirst({ user: data[0].USUARIO }).then(res => {
              });
              this.cobranzaService.deactivate();
            }
          });
        } else {
          this.openSnackBar();
          this.cobranzaService.deactivate();
        }
      });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 2500,
      data: 'USUARIO INCORRECTO'
    });
  }


}
