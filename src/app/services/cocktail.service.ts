import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  getCocktailsByIngredient(ingredientName: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

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

  getCocktailIngredients(cocktailId: string): Observable<Ingredient[]> {
    const url = `${this.apiUrl}/lookup.php?i=${cocktailId}`;
    return this.http.get<{ drinks: Cocktail[] }>(url).pipe(
      map(response => {
        const cocktail = response.drinks[0];
        const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientName = cocktail['strIngredient' + i];
          const ingredientMeasure = cocktail['strMeasure' + i];
          if (ingredientName) {
            const ingredient: Ingredient = {
              name: ingredientName,
              measure: ingredientMeasure,
              imageUrl: ''
            };
            ingredients.push(ingredient);
          } else {
            break;
          }
        }
        return ingredients;
      })
    );
  }

}
