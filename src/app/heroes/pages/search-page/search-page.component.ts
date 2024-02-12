import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(private heroeService: HeroesService){}

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  public searchHeroe(){

    this.searchInput.addAsyncValidators

    const value: string = this.searchInput.value || '';
    this.heroeService.getSuggetions(value).subscribe(
      heroes => this.heroes = heroes
    );

  }

  public onSelectedOption(event: MatAutocompleteSelectedEvent){
    if (!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value
    this.searchInput.setValue(hero.superhero)
    this.selectedHero = hero

  }
}
