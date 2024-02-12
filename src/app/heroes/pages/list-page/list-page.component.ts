import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  constructor(private ser: HeroesService){}

  public heroe: Hero[] = []
  // varieble para almacenar el listado de héroes

  // inyectar el servicio
  ngOnInit():void {
    this.ser.getHeroes().subscribe(data =>{
      this.heroe =data
    })
  }
}
