import { Routes } from '@angular/router';
import { AbonosComponent } from './components/abonos/abonos.component';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { AsignacionUsuarioComponent } from './components/asignacionUsuario/asignacionUsuario..component';
import { BienesComponent } from './components/bienes/bienes.component';
import { IncobrablesComponent } from './components/incobrables/incobrables.component';
import { NomenglaturaComponent } from './components/nomenglatura/nomenglatura.component';
import { ReversasComponent } from './components/reversas/reversas.component';
import { TipoCargoComponent } from './components/tipoCargo/tipoCargo.component';
import { TipoGestionComponent } from './components/tipoGestion/tipoGestion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
export const GestionesRoutes: Routes = [
    { path: 'asignacion', component: AsignacionComponent},
    { path: 'nomenglaturas', component: NomenglaturaComponent},
    { path: 'tipoGestion', component: TipoGestionComponent},
    { path: 'bienes', component: BienesComponent},
    { path: 'abonos', component: AbonosComponent},
    { path: 'tipoCargo', component: TipoCargoComponent},
    { path: 'incobrables', component: IncobrablesComponent},
    { path: 'reversas', component: ReversasComponent},
    {path: 'asignacionUsuario', component: AsignacionUsuarioComponent},
    {path: 'usuarios', component: UsuariosComponent},

    { path: '**', redirectTo: 'login' },
];
