import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tags : string[] | undefined; 

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  alltags: string[] = ['AccidenteRutiere', 'AlegeriLocale', 'AlegeriParlamentare', 'AlegeriPrezidențiale', 'CampaniiEstCurier', 'Criuleni', 'Divertisment', 'Horoscop', 'Dubăsari', 'ECJunior', 'LongRead', 'Educație', 'Cultural', 'Ecologic', 'Economic', 'Interviu', 'Politic', 'Sănătate', 'Social', 'Sportiv', 'Finanțe', 'Incidente', 'Internațional', 'Investigații', 'Justiție', 'Meteo', 'OpiniiEditorial', 'Poliție', 'Religie', 'StopFals', 'SuccesComunitar', 'Transport'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.filteredTags = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.alltags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags!.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags!.indexOf(fruit);

    if (index >= 0) {
      this.tags!.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags!.push(event.option.viewValue);
    this.fruitInput!.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
