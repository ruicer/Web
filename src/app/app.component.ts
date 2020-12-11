import { Component, NgZone, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CobranzaService } from './services/cobranza.service';
import { MatSidenav } from '@angular/material';
import { Location } from '@angular/common';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
    access = true;
    activeSpinner = false;
    panelOpenState;
    @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
    isExpanded = true;
    showSubmenu: boolean = true;
    isShowing = true;
    showSubSubMenu: boolean = false;
    urlRedirect = 'http://192.168.9.235/cartacobranza/cartas.aspx';
    //urlRedirect = 'https://localhost:44398/cartas.aspx';

    urlRedirectConsolidado = 'http://192.168.9.235/cartacobranza/consolidado.aspx';
    //urlRedirectConsolidado = 'https://localhost:44398/consolidado.aspx';

    listOptions = [
        /* {url: '', visible: true, title: 'Usuarios', icon: 'user'},
         {id: 6, url: '#/gestiones/asignacion', visible: true, title: 'Asignación de sucursales', icon: 'pending_actions'},
         {url: '#/gestiones/incobrables', visible: true, title: 'Asignación de creditos incobrables', icon: 'pending'},
         {url: '#/gestiones/reversas', visible: true, title: 'Reversa de creditos incobrables', icon: 'delete_outline'},
         {url: '#/gestiones/asignacionUsuario', visible: true, title: 'Asignación permisos usuarios', icon: 'supervisor_account'},
         {id: 13,url: '#/reportes/detalleMora', visible: true, title: 'Consulta de mora mayor a 1 dia', icon: 'assignment_returned'},
         {id: 14,url: '#/reportes/detalleAsig', visible: true, title: 'Consulta de mora asignada 1 dia', icon: 'assignment_returned'},
         {url: '#/reportes/demandaMasiva', visible: true, title: 'Demanda masiva', icon: 'assignment_returned'},
         {url: '#/reportes/demandaEstado', visible: true, title: 'Demanda mavisa estado', icon: 'assignment_returned'},
     */
    ];

    listSubOptions = [
        /*{url: '#/reportes/consolidado', visible: true, title: 'Reporte Consolidado', icon: 'pending_actions'},
        {url: '#/reportes/gestionesRe', visible: true, title: 'Reporte contactabilidad', icon: 'pending'},
        {url: '#/reportes/masivoGestiones', visible: true, title: 'Ingreso Masivo Clientes', icon: 'delete_outline'},
        {url: '#/reportes/masivoJuridico', visible: true, title: 'Ingreso cobro Juridico', icon: 'add'},
        {url: '#/gestiones/abonos', visible: true, title: 'Manejador de abonos', icon: 'payment'},
        {id: 7, url: '#/gestiones/nomenglaturas', visible: true, title: 'Nomenglaturas de gestiones', icon: 'input'},
        {url: '#/gestiones/tipoGestion', visible: true, title: 'Manejador de tipo de gestiones', icon: 'outbond'},
        {id: 8, url: '#/gestiones/bienes', visible: true, title: 'Tipos de bienes', icon: 'home'},
    */
    ];
    //userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));

    showMenuPrincipal = false;


    constructor(private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private cobranzaService: CobranzaService,
        private location: Location) {
        /*authService.currentMenus.subscribe(data => {
       console.log(data);
       if(data) {
         this.showMenuPrincipal = true;
       }
     });*/
        this.cobranzaService.spinnerActive.subscribe(activate => {
            this.toggleSpinner(activate);
        });




    }


    ngOnInit() {


        this.authService.currentUser.subscribe(data => {
            /*if (data) {
              this.router.navigate(['/']);
            }*/
            if (data) {
                if (data.length == 4) {
                    this.access = false;
                } else if (data.length == 1) {
                    this.access = true;
                }
                if(typeof(data) === 'string' && data !== 'null' ) {
                    const userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
                    this.cobranzaService.getProcuradores(userAccount[0].PUESTO, 1).subscribe((data: any) => {
                        this.listOptions = data;
                        if (data.length > 0) {
                            this.showMenuPrincipal = true;
    
                        }
                    });
                    this.cobranzaService.getProcuradores(userAccount[0].PUESTO, 2).subscribe((data: any) => {
                        this.listSubOptions = data;
                        if (data.length > 0) {
                            this.showMenuPrincipal = true;
    
                        }
                    });
                } else if (data) {
                    console.log('hola')
                    this.cobranzaService.getProcuradores(data[0].PUESTO, 1).subscribe((data: any) => {
                        this.listOptions = data;
                        if (data.length > 0) {
                            this.showMenuPrincipal = true;
    
                        }
                    });
                    this.cobranzaService.getProcuradores(data[0].PUESTO, 2).subscribe((data: any) => {
                        this.listSubOptions = data;
                        if (data.length > 0) {
                            this.showMenuPrincipal = true;
    
                        }
                    });

                }
                
                console.log('hola')
            } else {
                this.access = false;

            }


        });
        this.authService.currentMenus.subscribe(data => {
            this.showMenuPrincipal = data;
        })



    }

    addItem($event) {
        console.log($event);
    }
    ngOnChanges() {

    }

    toggleSpinner(activate) {
        this.activeSpinner = activate
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
        this.listOptions = [];
        this.listSubOptions = [];
    }


    goToLink() {

        const userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
        const param = userAccount[0].ID_PROCURADOR;

        window.open(`${this.urlRedirect}?us=${param}`, "about:blank", "height=700,width=1350,modal=yes,alwaysRaised=yes");
    }


    goToLinkConst() {
        const userAccount = JSON.parse(atob(sessionStorage.getItem('USER')));
        const param = userAccount[0].ID_PROCURADOR;

        window.open(`${this.urlRedirectConsolidado}`, "about:blank", "height=700,width=1350,modal=yes,alwaysRaised=yes");

    }



    mouseenter() {
        if (!this.isExpanded) {
            this.isShowing = true;
        }
    }

    mouseleave() {
        if (!this.isExpanded) {
            this.isShowing = false;
        }
    }

}
