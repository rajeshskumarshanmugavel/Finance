import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerService } from 'ngx-color-picker';
import {FormGroup, FormControl} from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { FormElementsService, Person } from './data.service';

@Component({
  selector: 'app-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss']
})
export class FormElementsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  today = this.calendar.getToday();
  placement = 'bottom';
  public color: string = '#2889e9';
  public color14: string = 'rgba(120,29,7,0.5)';
  public color13: string = 'rgba(0,255,0,0.5)';
  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';
  public color16: string = '#a51ad633';
  
  people$!: Observable<Person[]>;
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  constructor(private cpService: ColorPickerService, private calendar: NgbCalendar, private dataService: FormElementsService) { }

  ngOnInit(): void { 
    this.people$ = this.dataService.getPeople();


    //
    let toggleBtn = document.querySelectorAll('.main-toggle');
    toggleBtn.forEach((e,i)=>{
      fromEvent(e,'click').subscribe(()=>{
        if(e.classList.contains('on')){
          e.classList.remove('on')
        }
        else{
          e.classList.add('on')
        }
      })
    })
  }
  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  cities = [
    {
        id: 1,
        name: 'Vilnius',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Pavilnys',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Siauliai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];

  selectedCity = this.cities[0].name;

  
}
