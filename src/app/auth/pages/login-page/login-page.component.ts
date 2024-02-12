import { Component } from '@angular/core';
import { AutheService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AutheService,
    private router: Router
  ){}

  onLogin(){
    this.authService.login('','').subscribe( user =>{
      this.router.navigate(['/heroes'])
    })
  }
}
