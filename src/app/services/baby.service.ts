import { Injectable } from '@angular/core';
import { Baby, BabyParentLink } from '../model/baby';
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
      for (let b of babys) {
        if (b.crn === baby.crn) {
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

  getBabyParentLinks() {
    console.log('babyParentLinks' + amplify.store('babys'));
    let babyParentLinks: BabyParentLink[] = JSON.parse(amplify.store('babyParentLinks') === undefined ?
      null : amplify.store('babyParentLinks'));
    console.log('babyParentLinks');
    console.log(babyParentLinks);
    if (babyParentLinks === null || babyParentLinks.length < 1) {
      console.log('Get from mock babys array');
      babyParentLinks = [];
      amplify.store('babyParentLinks', JSON.stringify(babyParentLinks));
    }
    return Promise.resolve(babyParentLinks);
  }

  updateBabyParentLinks(latest: BabyParentLink[]) {
      return this.getBabyParentLinks().then(babyParentLinks => {
      for (let l of latest) {
        let found = false;
        let index = -1;
        for (let b of babyParentLinks) {
        if (b.baby_crn === l.baby_crn && b.parent_crn === l.parent_crn) {
            found = true;
            index = babyParentLinks.indexOf(b);
            break;
          }
        }
        if (found) {
          babyParentLinks.splice(index, 1);
        }
        babyParentLinks.push(l);
      }
      amplify.store('babyParentLinks', JSON.stringify(babyParentLinks));
      return Promise.resolve(true);
    });
  }

  getParents(baby: Baby) {
    return this.getBabyParentLinks().then(babyParentLinks => {
      let ret: BabyParentLink[] = [];
      for (let b of babyParentLinks) {
        if (b.baby_crn === baby.crn) {
          ret.push(b);
        }
      }
      return Promise.resolve(ret);
    });
  }


  clear() {
    amplify.store('babys', null);
    amplify.store('babyParentLinks', null);
  }
}
