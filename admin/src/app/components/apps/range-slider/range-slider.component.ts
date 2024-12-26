import { Component, OnInit } from '@angular/core';
import {  Options } from 'ngx-slider-v2';

interface modernSliderDetails {
  value: number;
  floor: number;
  ceil: number;
  showSelectionBar: boolean;
}

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
// First Slider
  // Range with single Value
  modernsliders1: modernSliderDetails[] = [
    {
      value: 10,
      floor: 10,
      ceil: 100,
      showSelectionBar: true

    },
    {
      value: 550,
      floor: 100,
      ceil: 1000,
      showSelectionBar: true
    }

  ];
  // Range with Minimum and Maximum Numbers

  minValue1: number = 200;
  maxValue1: number = 800;
  options1: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue1: string, maxValue1: string): string => {
      return 'from ' + minValue1 + ' up to ' + maxValue1;
    }
  };

   // Negative Range
   negativeValue1: number = -500;
   negativeHighValue1: number = 500;
   negativeOptions1: Options = {
     floor: -1000,
     ceil:1000
   }




  // Second Slider

  modernsliders2: modernSliderDetails[] = [
    {
      value: 10,
      floor: 10,
      ceil: 100,
      showSelectionBar: true

    },
    {
      value: 550,
      floor: 100,
      ceil: 1000,
      showSelectionBar: true
    }

  ];
  // Range with Minimum and Maximum Numbers

  minValue2: number = 200;
  maxValue2: number = 800;
  options2: Options = {
    // floor: 0,
    // showTicksValues: true,
    // tickStep: 250,
    // // tickValueStep: 10,
    ceil: 1000,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue2: string, maxValue2: string): string => {
      return 'from ' + minValue2 + ' up to ' + maxValue2;
    }
  };

   // Negative Range
   negativeValue2: number = -500;
   negativeHighValue2: number = 500;
   negativeOptions2: Options = {
     floor: -1000,
     ceil:1000
   }



  // Third Slider

  modernsliders3: modernSliderDetails[] = [
    {
      value: 10,
      floor: 10,
      ceil: 100,
      showSelectionBar: true

    },
    {
      value: 550,
      floor: 100,
      ceil: 1000,
      showSelectionBar: true
    }

  ];
  // Range with Minimum and Maximum Numbers

  minValue3: number = 200;
  maxValue3: number = 800;
  options3: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue3: string, maxValue3: string): string => {
      return 'from ' + minValue3 + ' up to ' + maxValue3;
    }
  };

   // Negative Range
   negativeValue3: number = -500;
   negativeHighValue3: number = 500;
   negativeOptions3: Options = {
     floor: -1000,
     ceil:1000
   }



  modernSliderOptions(slider: modernSliderDetails): Options {
    return {
      floor: slider.floor,
      ceil: slider.ceil,
      step:10,
      showSelectionBar: slider.showSelectionBar
    };
  }

}
