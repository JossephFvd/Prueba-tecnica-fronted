import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  popularCocktails: any[];
  popularIngredients: any[];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchPopularCocktails();
    this.fetchPopularIngredients();
  }

  fetchPopularCocktails(): void {
    const apiKey = '9973533';
    const url = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`;

    this.http.get<any>(url).subscribe(data => {
      this.popularCocktails = data.drinks.slice(0, 8);
    });
  }

  fetchPopularIngredients(): void {
    const apiKey = '9973533';
    const url = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/popular.php`;

    this.http.get<any>(url).subscribe(data => {
      this.popularIngredients = data.ingredients.slice(0, 4);
    });
  }

  viewCocktailDetails(cocktailId: string): void {
    this.router.navigate(['/cocktail', cocktailId]);
  }

  // viewIngredientDetails(name: string): void {
  //   this.router.navigate(['/cocktail', name);
  // }
}
