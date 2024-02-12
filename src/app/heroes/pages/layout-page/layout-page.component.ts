import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AutheService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-heroe' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  constructor(
    private authService: AutheService,
    private router: Router
  ){}

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  get user(): User | undefined{
    return this.authService.currentUser;
  }
}


