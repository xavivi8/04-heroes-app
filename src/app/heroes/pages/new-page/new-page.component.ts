import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  public titulo?: string;
  public heroeName?: string;
  public hero?: Hero;
  public editar?: string;
  public anyadir?: string;

  get currentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;
    return hero;
  }

  public publisher = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel', desc: 'Marvel' }
  ]

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  ngOnInit(): void {
    //comprobamos que en la ruta esta edit
    if (!this.router.url.includes('edit')) {
      this.titulo = "Añadir héroe"
      this.anyadir = "Añadir héroe"
      return;
    }
    this.activatedRoute.params.pipe(
      delay(500),//le damos delay de 0.5 segundos
      switchMap(({ id }) => this.heroService.getHeroById(id))//buscamos el heroe por el id
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);//sino hay un heroe nos direcciona

      this.hero = hero;//guardamos el heroe en nuestra variable
      console.log(hero);
      this.heroForm.reset(hero)//limpiamos el formulario y establezco sus campos
      this.titulo = "Editar "
      this.editar = `Editar ${this.currentHero.superhero}`
      this.heroeName = this.hero.superhero
      return;
    })
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`Héroe ${this.currentHero.superhero} actualizado`)
        })
      return
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackBar(`Héroe ${this.currentHero.superhero} actualizado`)
      })
    /* console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value
    }) */
  }

  private showSnackBar(message: string){
    this.snackBar.open(message, 'OK',{
      duration: 2500
    })
  }

  public onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero id is required')

    const DIALOGREF = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    DIALOGREF.afterClosed().subscribe( result => {
      if (!result) return;
      if (result === true){
        this.heroService.deleteHeroById(this.currentHero.id).subscribe( valor => {
          if(valor === true){
            this.showSnackBar(`Héroe eliminado`)

          }else{
            this.showSnackBar(`Error al eliminado`)
          }
          this.router.navigate(['/heroes/list']);
        })

      }else{
        this.showSnackBar(`No quiere eliminar`)
      }
    })

  }
}
