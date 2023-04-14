import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(
    private http :HttpClient,
  ) {}

  getPokemonList(): Observable<Pokemon[]> {
    //return POKEMONS;
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handlerError(error, []) )
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handlerError(error, {}))
    );
  }

  updatePokemon(pokemon : Pokemon) : Observable<null>{
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'Application/json'})
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handlerError(error, null))
    )
  }

  private log(response: any){
    console.table(response);
  }

  private handlerError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte',
      'Normal',
      'Electrik', 
      'Poison', 
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
