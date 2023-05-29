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
  latestDrinks: any[];
  randomDrinks: any[];

  private apiUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.fetchPopularCocktails();
    this.fetchLatestDrinks();
    this.fetchRandomDrinks();
  }

  fetchPopularCocktails(): void {
    const url = `${this.apiUrl}popular.php`;

    this.http.get<any>(url).subscribe(data => {
      this.popularCocktails = data.drinks.slice(0, 8);
    });
  }

  fetchLatestDrinks(): void {
    const url = `${this.apiUrl}latest.php`;

    this.http.get<any>(url).subscribe(data => {
      this.latestDrinks = data.drinks.slice(0, 8);
    });
  }

  fetchRandomDrinks(): void {
    const url = `${this.apiUrl}randomselection.php`;

    this.http.get<any>(url).subscribe(data => {
      this.randomDrinks = data.drinks.slice(0, 8);
    });
  }

  viewCocktailDetails(cocktailId: string): void {
    this.router.navigate(['/cocktail', cocktailId]);
  }
}
