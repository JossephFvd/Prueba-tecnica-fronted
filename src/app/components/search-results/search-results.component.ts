import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query: string;
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      this.searchCocktails(this.query);
    });
  }

  searchCocktails(query: string) {
    const url = `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${query}`;
    this.httpClient.get<any>(url).subscribe(data => {
      if (data && data.drinks) {
        // Filtrar los cocktails por la primera letra si se ingresa solo una letra
        if (query.length === 1) {
          this.searchResults = data.drinks.filter(cocktail =>
            cocktail.strDrink.charAt(0).toLowerCase() === query.toLowerCase()
          );
        } else {
          // Filtrar los cocktails por el término completo si se ingresa una palabra completa
          this.searchResults = data.drinks.filter(cocktail =>
            cocktail.strDrink.toLowerCase().includes(query.toLowerCase())
          );
        }
      } else {
        this.searchResults = [];
      }
    });
  }
}
