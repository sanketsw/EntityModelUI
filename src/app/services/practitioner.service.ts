import { Injectable } from '@angular/core';
import { Practitioner } from '../model/practitioner';
declare var amplify: any;

// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class PractitionerService {
  getPractitioners() {
    console.log('practitioners' + amplify.store('practitioners'));
    let practitioners: Practitioner[] = JSON.parse(amplify.store('practitioners') === undefined ? null : amplify.store('practitioners'));
    console.log('practitioners');
    console.log(practitioners);
    if (practitioners === null || practitioners.length < 1) {
      console.log('Get from mock practitioners array');
      practitioners = [];
      amplify.store('practitioners', JSON.stringify(practitioners));
    }
    return Promise.resolve(practitioners);
  }

  getPractitioner(govtId: string) {
    return this.getPractitioners().then(practitioners => {
      for (let c of practitioners) {
        if (c.govtId === govtId) {
          return Promise.resolve(c);
        }
      }
    });
  }

  updatePractitioner(practitioner: Practitioner) {
    console.log('updatePractitioner');
    this.getPractitioners().then(practitioners => {
      console.log('practitioners');
      console.log(practitioners);
      let current: Practitioner[] = practitioners;
      let newList: Practitioner[] = [];
      for (let c of current) {
        if (c.govtId === practitioner.govtId) {
          newList.push(practitioner);
        } else {
          newList.push(c);
        }
      }
      console.log('newList');
      console.log(newList);
      amplify.store('practitioners', JSON.stringify(newList));
    });
  }

  clear() {
    amplify.store('practitioners', null);
  }
}
