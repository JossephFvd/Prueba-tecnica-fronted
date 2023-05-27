import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchCocktails(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.search.emit(inputValue);
  }
}
