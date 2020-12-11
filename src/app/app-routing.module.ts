import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { ReportesComponent } from './reportes/reportes.component';



const routes: Routes = [
  /* rutas con lazy loading por ahora solo admin */

  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule'
      }], canActivate: [AuthGuard]
  },
  {
    path: 'gestiones', component: GestionesComponent,
    children: [
      {
        path: '',
        loadChildren: './gestiones/gestiones.module#GestionesModule'
      }], canActivate: [AuthGuard]
  },
  {
    path: 'reportes', component: ReportesComponent,
    children: [
      {
        path: '',
        loadChildren: './reportes/reportes.module#ReportesModule'
      }], canActivate: [AuthGuard]
  },
  /* pagina por defecto login */
  { path: '**', redirectTo: 'login' },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
