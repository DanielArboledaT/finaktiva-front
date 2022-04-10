import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    urlBase = environment.urlBase;
    
  
    constructor(private httpclient: HttpClient) { 

    }

    login(username: string, pass: string): Observable<any>{

        const req = {
            "password": pass,
            "username": username
        }

        return this.httpclient.post<any>(`${this.urlBase}auth/login`, req);


    }

}
