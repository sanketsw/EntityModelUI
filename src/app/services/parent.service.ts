import { Injectable } from '@angular/core';
import { Parent } from '../model/Parent';
import { BabyParentLink } from '../model/Baby';
declare var amplify: any;


// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class ParentService {

  // constructor(private growthUpdateService: GrowthUpdateService) {
  //
  // }

  getParents() {
    console.log('parents' + amplify.store('parents'));
    let parents: Parent[] = JSON.parse(amplify.store('parents') === undefined ? null : amplify.store('parents'));
    console.log('parents');
    console.log(parents);
    if (parents === null || parents.length < 1) {
      console.log('Get from mock parents array');
      parents = [];
      amplify.store('parents', JSON.stringify(parents));
    }
    return Promise.resolve(parents);
  }

  getParent(crn: string) {
    return this.getParents().then(parents => {
      for (let c of parents) {
        if (c.crn === crn) {
          return Promise.resolve(c);
        }
      }
    });
  }

  updateParent(parent: Parent) {
    console.log('updateParent');
    return this.getParents().then(parents => {
      console.log('parents');
      console.log(parents);
      let current: Parent[] = parents;
      let newList: Parent[] = [];
      for (let c of current) {
        if (c.crn !== parent.crn) {
          newList.push(c);
        }
      }
      newList.push(parent);
      console.log('newList');
      console.log(newList);
      amplify.store('parents', JSON.stringify(newList));


      return Promise.resolve(newList);
    });
  }

  removeParent(parent: Parent) {
    console.log('removeParent');
    return this.getParents().then(parents => {
      let index = -1;
      for (let b of parents) {
        if (b.crn === parent.crn) {
          index = parents.indexOf(b, 0);
          break;
        }
      }
      if (index > -1) {
        parents.splice(index, 1);
      }
      amplify.store('parents', JSON.stringify(parents));
      return Promise.resolve(parents);
    });
  }

  getBabyParentLinks() {
    console.log('babyParentLinks' + amplify.store('parents'));
    let babyParentLinks: BabyParentLink[] = JSON.parse(amplify.store('babyParentLinks') === undefined ?
      null : amplify.store('babyParentLinks'));
    console.log('babyParentLinks');
    console.log(babyParentLinks);
    if (babyParentLinks === null || babyParentLinks.length < 1) {
      console.log('Get from mock parents array');
      babyParentLinks = [];
      amplify.store('babyParentLinks', JSON.stringify(babyParentLinks));
    }
    return Promise.resolve(babyParentLinks);
  }

  getBabies(parent: Parent) {
    return this.getBabyParentLinks().then(babyParentLinks => {
      let ret: BabyParentLink[] = [];
      for (let b of babyParentLinks) {
        if (b.parent_crn === parent.crn) {
          ret.push(b);
        }
      }
      return Promise.resolve(ret);
    });
  }


  clear() {
    this.getParents().then(parents => {
      // for (let c of parents) {
      //   this.growthUpdateService.clear(c.crn);
      // }
      amplify.store('parents', null);
    });

  }
}
