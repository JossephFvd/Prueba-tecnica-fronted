import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  onSearch(value: string) {
    // Redirige a la página de resultados de búsqueda con el valor ingresado como parámetro
    this.router.navigate(['/search-results', { query: value }]);
  }
}
