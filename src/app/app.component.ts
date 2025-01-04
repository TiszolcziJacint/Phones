import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhoneModel } from './models/phone-model';
import { DataService } from './services/data.service';
import { PhoneComponent } from './phone/phone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  phones: PhoneModel[] = [];
  modify: PhoneModel | undefined = undefined;
  new: PhoneModel | undefined = undefined;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPhones().subscribe({
      next: (data: PhoneModel[]) => {
        this.phones = data;
      },
      error: (err) => console.log(err)
    })
  }

  newPhone() {
    this.new = {
      id: undefined,
      brand: '',
      model: '',
      storage: '',
      ram: '',
      price: 1
    }
  }

  saveNew(ph: PhoneModel) {
    this.dataService.addPhone(ph).subscribe({
      next: (data: PhoneModel) => {
        this.phones.push(data);
        this.new = undefined;
      },
      error: (err) => console.log(err)
    });
  }

  modifyPhone(ph: PhoneModel) {
    this.modify = JSON.parse(JSON.stringify(ph));
  }

  deletePhone(ph: PhoneModel) {
    this.dataService.deletePhone(ph).subscribe({
      next: (data: PhoneModel) => {
        const index = this.phones.findIndex(r => r.id == data.id);
        this.phones.splice(index, 1);
      },
      error: (err) => console.log(err)
    });
  }

  saveModify(ph: PhoneModel) {
    this.dataService.modifyPhone(ph).subscribe({
      next: (data: PhoneModel) => {
        const index = this.phones.findIndex(r => r.id == data.id);
        this.phones[index] = data;
        this.modify = undefined;
      },
      error: (err) => console.log(err)
    });
  }
}
