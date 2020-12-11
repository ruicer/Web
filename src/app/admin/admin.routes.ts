import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ChangeExtensionComponent } from './components/changeExtesion/changeExtension.component';
import { VideoInicio } from './components/video-inicio/video-inicio.component';
import { CarteraComponent } from './components/cartera/cartera.component';
import { ReporteDiarioComponent } from './components/reporteDiario/reporteDiario.component';
export const AdminRoutes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'changeExtension', component: ChangeExtensionComponent},
    { path: 'video', component: VideoInicio},
    { path: '**', redirectTo: 'login' },
    { path: 'cartera', component: CarteraComponent},
    { path: 'reporteDiario', component: ReporteDiarioComponent}
    

];
