import { Injectable } from '@angular/core';
import { Baby, BabyParentMap } from '../model/baby';
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
    return this.getBabys().then(babys => {
      console.log('babys');
      console.log(babys);
      let current: Baby[] = babys;
      let newList: Baby[] = [];
      for (let c of current) {
        if (c.crn !== baby.crn) {
          newList.push(c);
        }
      }
      newList.push(baby);
      console.log('newList');
      console.log(newList);
      amplify.store('babys', JSON.stringify(newList));
      return Promise.resolve(newList);
    });
  }

  removeBaby(baby: Baby) {
    console.log('removeBaby');
    return this.getBabys().then(babys => {
      let index = -1;
      for(let b of babys) {
        if(b.crn === baby.crn) {
          index = babys.indexOf(b, 0);
          break;
        }
      }
      if (index > -1) {
        babys.splice(index, 1);
      }
      amplify.store('babys', JSON.stringify(babys));
      return Promise.resolve(babys);
    });
  }

  getBabyParentMaps() {
    console.log('babyParentMaps' + amplify.store('babys'));
    let babyParentMaps: BabyParentMap[] = JSON.parse(amplify.store('babyParentMaps') === undefined ?
      null : amplify.store('babyParentMaps'));
    console.log('babyParentMaps');
    console.log(babyParentMaps);
    if (babyParentMaps === null || babyParentMaps.length < 1) {
      console.log('Get from mock babys array');
      babyParentMaps = [];
      amplify.store('babyParentMaps', JSON.stringify(babyParentMaps));
    }
    return Promise.resolve(babyParentMaps);
  }

  getParents(baby: Baby) {
    return this.getBabyParentMaps().then(babyParentMaps => {
      let ret: BabyParentMap[] = [];
      for (let b of babyParentMaps) {
        if (b.baby_crn === baby.crn) {
          ret.push(b);
        }
      }
      return Promise.resolve(ret);
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
