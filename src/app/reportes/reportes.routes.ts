import { Routes } from '@angular/router';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';
import { ContactabilidadComponent } from './components/contactabilidad/contactabilidad.component';
import { ConveniosDiComponent } from './components/conveniosDi/conveniosDi.component';
import { ConveniosRealizadosComponent } from './components/conveniosRang/conveniosRang.component';
import { DemandaEstadoComponent } from './components/demandaEstado/demandaEstado.component';
import { DemandaMasivaComponent } from './components/demandaMasiva/demandaMasiva.component';
import { DetalleCreditosComponent } from './components/detalleCreditos/detalleCreditos.component';
import { DetalleCreditosAsignadoComponent } from './components/detalleCreditosAsignado/detalleCreditosAsignado.component';
import { GestionesRealizadasComponent } from './components/gestionesRealizadas/gestionesRealizadas.component';
import { MasivoGestionesAsignadoComponent } from './components/masivoGestiones/masivoGestiones.component';
import { MasivoJuridicoComponent } from './components/masivoJuridico/masivoJuridico.component';


export const ReportesRoutes: Routes = [
    { path: 'contactabilidad', component: ContactabilidadComponent},
    { path: 'detalleMora', component: DetalleCreditosComponent},
    { path: 'detalleAsig', component: DetalleCreditosAsignadoComponent},
    { path: 'consolidado', component: ConsolidadoComponent},
    { path: 'masivoGestiones', component: MasivoGestionesAsignadoComponent},
    { path: 'masivoJuridico', component: MasivoJuridicoComponent},
    { path: 'gestionesRe', component: GestionesRealizadasComponent},
    { path: 'demandaMasiva', component: DemandaMasivaComponent },
    { path: 'demandaEstado', component: DemandaEstadoComponent },
    { path: 'conveniosRealizados', component: ConveniosRealizadosComponent },

    { path: 'conveniosFec', component: ConveniosDiComponent },

    { path: '**', redirectTo: 'login' },
];
