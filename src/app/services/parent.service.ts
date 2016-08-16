import { Injectable } from '@angular/core';
import { Parent } from '../model/parent';
declare var amplify: any;

// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class ParentService {
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
    this.getParents().then(parents => {
      console.log('parents');
      console.log(parents);
      let current: Parent[] = parents;
      let newList: Parent[] = [];
      for (let c of current) {
        if (c.crn === parent.crn) {
          newList.push(parent);
        } else {
          newList.push(c);
        }
      }
      console.log('newList');
      console.log(newList);
      amplify.store('parents', JSON.stringify(newList));
    });
  }

  clear() {
    amplify.store('parents', null);
  }
}
