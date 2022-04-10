import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { Usuario } from 'src/app/common/models/usuario';
import { HomeService } from 'src/app/common/services/home.service';
import { Alert } from 'selenium-webdriver';



@Component({
    selector: 'app-detalle-usuario',
    templateUrl: './detalle-usuario.component.html',
    styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

    usuario: Usuario;
    rol: String;
    password: string;
    esNuevoUsuario: boolean;
    guardando: boolean;
    


    constructor(private route: Router, private location: Location, private homeService: HomeService) {

        this.usuario = new Usuario();
        this.guardando = false;
    

    }

    ngOnInit(): void {

        let state = this.location.getState() as any;
        if (state.usuario) {
            this.esNuevoUsuario = false;
            this.usuario = state.usuario as Usuario;

            this.rol = this.usuario.roles[0].rolNombre === 'ROL_ADMIN' ? 'admin' : 'operario';

        } else {
            this.esNuevoUsuario = true;
            this.usuario = new Usuario();
        }

        console.log(this.location.getState());

    }

    volver() {
        this.route.navigate(['/home']);
    }

    guardar () {

        this.guardando = true;

        if (this.esNuevoUsuario) {

            if (this.password) {
                this.usuario.password = this.password;
            } else {
                window.alert("Debe ingresar una contraseña");
                this.guardando = false;
                return;
            }
            let rolUsr = this.rol; 
            this.usuario.roles = [];
            this.usuario.roles.push(rolUsr);

            console.log('this.usuario', this.usuario);

            this.homeService.crearUsuario(this.usuario).subscribe(res => {
                window.alert("guardó exitosamente");
                this.guardando = false;
            },
            err => {
                if (err.status == 403) {
                    window.alert(`No estás autorizado`);
                } else {
                    window.alert(`Ocurrió un error ${err.mensaje}`);
                }
                this.guardando = false; 
            });


        } else {
            
            if (this.password) {
                this.usuario.password = this.password;
            } else {
                window.alert("Debe ingresar una contraseña");
                this.guardando = false;
                return;
            }
            let rolUsr = this.rol; 
            this.usuario.roles = [];
            this.usuario.roles.push(rolUsr);

            console.log('this.usuario', this.usuario);

            this.homeService.actualizarUsuario(this.usuario).subscribe(res => {
                window.alert("Guardó exitosamente");
                this.guardando = false;
            },
            err => {
                if (err.status == 403) {
                    window.alert(`No estás autorizado`);
                } else {
                    window.alert(`Ocurrió un error ${err.mensaje}`);
                }
                this.guardando = false; 
            });

        }

    }

}
