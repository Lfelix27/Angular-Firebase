import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoModel } from '../../models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado: EmpleadoModel = new EmpleadoModel();


  constructor( private empleadoService: EmpleadosService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.empleadoService.getEmpleado( id )
        .subscribe( (resp: EmpleadoModel) => {
          this.empleado = resp;
          this.empleado.id = id;
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.empleado.id ) {
      peticion = this.empleadoService.actualizarEmpleado( this.empleado );
    } else {
      peticion = this.empleadoService.crearEmpleado( this.empleado );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.empleado.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
