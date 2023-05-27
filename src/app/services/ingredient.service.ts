import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cocktail } from '../models/cocktail.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

  constructor(private http: HttpClient) {}

  getIngredientByName(name: string): Observable<Ingredient | undefined> {
    const url = `${this.apiUrl}search.php?i=${name}`;
    return this.http.get<any>(url).pipe(
      map(response => response.ingredients && response.ingredients[0])
    );
  }

  getCocktailsByIngredient(ingredientName: string): Observable<Cocktail[]> {
    const url = `${this.apiUrl}filter.php?i=${ingredientName}`;
    return this.http.get<any>(url).pipe(
      map(response => response.drinks || [])
    );
  }
}
