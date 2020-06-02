import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoModel } from '../../models/empleado.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: EmpleadoModel[] = [];
    cargando = false;

  constructor( private auth: AuthService,private router: Router, private empleadoService: EmpleadosService ) { }

  ngOnInit() {
    this.cargando = true;
    this.empleadoService.getEmpleados()
      .subscribe( resp => {
        this.empleados = resp;
        this.cargando = false;
      });
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  borrarEmpleado( empleado: EmpleadoModel, i: number ) {

  Swal.fire({
    title: '¿Está seguro?',
    text: `Está seguro que desea borrar a ${ empleado.nombre }`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then( resp => {

    if ( resp.value ) {
      this.empleados.splice(i, 1);
      this.empleadoService.borrarEmpleado( empleado.id ).subscribe();
    }

  });



}

}
