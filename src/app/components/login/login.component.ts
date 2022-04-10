import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    user: string;
    password: string;

    constructor(private loginService: LoginService, private route: Router) {

    }

    ngOnInit(): void { }


    login() {

        this.loginService.login(this.user, this.password).subscribe(res => {
            console.log("logueado", res);

            localStorage.setItem('FINAKTIVA-TOKEN', res.token);
            this.route.navigate(['/home']);

        });
        
    }

}

