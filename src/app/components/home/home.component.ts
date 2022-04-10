import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/common/models/usuario';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    listaUsuarios: Usuario[];
    cargando: boolean;
    eliminando: boolean;

    constructor(private homeService: HomeService, private route:Router) {

        this.cargando = true;
        this.eliminando = false;

    }

    ngOnInit(): void {

        this.consultarUsuarios();

    }

    consultarUsuarios() {

        this.homeService.consultarUsuario().subscribe(res => {
            this.listaUsuarios = res;
            
            this.cargando = false;
            console.log('lista usuario', this.listaUsuarios);
        });

    }

    nuevoUsuario() {
        this.route.navigate(['/info-usuario']);
    }

    actualizarUsuario(usuario: Usuario) {
        this.route.navigate(['/info-usuario'], {state: {usuario}});
    }

    eliminarUsuario(usuario: Usuario) {
        this.eliminando = true;
        console.log("usuario", usuario);
        this.homeService.eliminarUsuario(usuario).subscribe(res => {
            window.alert("Eliminó exitosamente");
            this.eliminando = false;
            this.consultarUsuarios();
            this.cargando = true;
        },
        err => {
            if (err.status == 403) {
                window.alert(`No estás autorizado`);
            } else {
                window.alert(`Ocurrió un error ${err.mensaje}`);
            }
            this.eliminando = false; 
        });
    }

}
