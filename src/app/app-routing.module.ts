import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent, canActivate: [ AuthGuard ] },
  { path: 'empleado/:id', component: EmpleadoComponent },
  //{ path: '**', pathMatch: 'full' redirectTo: 'empleados' },-->
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
