import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  getCocktailsByIngredient(ingredientName: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  searchCocktails(query: string): Observable<Cocktail[]> {
    const url = `${this.apiUrl}/search.php?s=${query}`;
    return this.http.get<{ drinks: Cocktail[] }>(url).pipe(
      map(response => response.drinks)
    );
  }

  getCocktailById(id: string): Observable<Cocktail> {
    const url = `${this.apiUrl}/lookup.php?i=${id}`;
    return this.http.get<{ drinks: Cocktail[] }>(url).pipe(
      map(response => response.drinks[0])
    );
  }


  getPopularCocktails(): Observable<Cocktail[]> {
    const url = `${this.apiUrl}/popular.php`;
    return this.http.get<{ drinks: Cocktail[] }>(url)
      .pipe(
        map(response => response.drinks || [])
      );
  }
  getDrinksByIngredient(ingredientName: string): Observable<Cocktail[]> {
    const url = `${this.apiUrl}filter.php?i=${ingredientName}`;
    return this.http.get<any>(url).pipe(
      map(response => response.drinks)
    );
  }

}
