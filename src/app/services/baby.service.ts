import { Injectable } from '@angular/core';
import { Baby } from '../model/baby';
// import { GrowthUpdateService } from '../services/growthUpdate.service';
declare var amplify: any;


// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class BabyService {

  // constructor(private growthUpdateService: GrowthUpdateService) {
  //
  // }

  getBabys() {
    console.log('babys' + amplify.store('babys'));
    let babys: Baby[] = JSON.parse(amplify.store('babys') === undefined ? null : amplify.store('babys'));
    console.log('babys');
    console.log(babys);
    if (babys === null || babys.length < 1) {
      console.log('Get from mock babys array');
      babys = [];
      amplify.store('babys', JSON.stringify(babys));
    }
    return Promise.resolve(babys);
  }

  getBaby(crn: string) {
    return this.getBabys().then(babys => {
      for (let c of babys) {
        if (c.crn === crn) {
          return Promise.resolve(c);
        }
      }
    });
  }

  updateBaby(baby: Baby) {
    console.log('updateBaby');
    this.getBabys().then(babys => {
      console.log('babys');
      console.log(babys);
      let current: Baby[] = babys;
      let newList: Baby[] = [];
      for (let c of current) {
        if (c.crn === baby.crn) {
          newList.push(baby);
        } else {
          newList.push(c);
        }
      }
      console.log('newList');
      console.log(newList);
      amplify.store('babys', JSON.stringify(newList));
    });
  }

  clear() {
    this.getBabys().then(babys => {
      // for (let c of babys) {
      //   this.growthUpdateService.clear(c.crn);
      // }
      amplify.store('babys', null);
    });

  }
}
