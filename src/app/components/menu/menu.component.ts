import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { Observable, Subscription, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { ControlContainer } from "@angular/forms";
import { AuthenticationService } from 'src/app/services/authentication.service';

var misc:any ={
    sidebar_mini_active: true
}

export interface RouteInfo {
  ID: number;
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: any;
}

export interface ChildrenItems {
  ID: number;
  path: string;
  title: string;
  ab: string;
  type?: string;
}

//Menu Items
export let ROUTES: RouteInfo[] = [
 {
    ID: 1,
    path: "/abasto/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "design_app"
  },
 
];

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit, OnDestroy, OnChanges {
    @Input()  menus: any;

    listOptions = [];
    public menuItems: any[];
    constructor(private authService: AuthenticationService) {}

    ngOnChanges(changes: SimpleChanges) {
     // console.log('entro a cambio de menus')
        const {menus}  = changes;
        let opciones = [];
        this.listOptions = menus.currentValue;
    }

    ngOnInit() {
   
    }

    ngOnDestroy() {

    }
}