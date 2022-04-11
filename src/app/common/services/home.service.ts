import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    urlBase = environment.urlBase;
  
    constructor(private httpclient: HttpClient) { }


    consultarUsuario(): Observable<Usuario[]> {

        let headers = new HttpHeaders().set('Autorization', localStorage.getItem('FINAKTIVA-TOKEN'));
        return this.httpclient.get<Usuario[]>(`${this.urlBase}finaktiva/consultaUsuarios`, {headers: headers} );

    }


    crearUsuario(usuario: Usuario) : Observable<any> {

        let headers = new HttpHeaders().set('Autorization', localStorage.getItem('FINAKTIVA-TOKEN'));
        return this.httpclient.post<Usuario[]>(`${this.urlBase}finaktiva/nuevoUsuario`, usuario, {headers: headers} );

    }

    eliminarUsuario(usuario: Usuario) : Observable<any> {

        let headers = new HttpHeaders().set('Autorization', localStorage.getItem('FINAKTIVA-TOKEN'));
        return this.httpclient.post<Usuario[]>(`${this.urlBase}finaktiva/eliminarUsuario`, usuario.idusuario, {headers: headers} );

    }

    actualizarUsuario(usuario: Usuario) : Observable<any> {

        let headers = new HttpHeaders().set('Autorization', localStorage.getItem('FINAKTIVA-TOKEN'));
        return this.httpclient.post<Usuario[]>(`${this.urlBase}finaktiva/actualizarUsuario`, usuario,  {headers: headers} );

    }

}
