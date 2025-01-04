import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhoneModel } from '../models/phone-model';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent {
  @Input() Pmodel: PhoneModel | undefined = undefined;
  @Output() saved = new EventEmitter<PhoneModel>();

  getValue(event: any): string {
    return event.target.value;
  }

  getNumberValue(event: any): number {
    return Number(event.target.value);
  }

  save() {
    this.saved.emit(this.Pmodel);
  }
}
