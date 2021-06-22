import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss'],
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType: [];
  pokemonImg: '';

  constructor(
    private pokeServices: PokemonService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activateRouter.params.subscribe((params) => {
      this.getPokemon(params['id']);
    });
  }

  ngOnInit(): void {}

  getPokemon(id) {
    this.pokeServices.getPokemons(id).subscribe(
      (res) => {
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
      },
      (err) => {}
    );
  }

  home(){
    this.router.navigateByUrl('/home');
  }

  onGoBack():void{
    this.location.back();
  }
}
