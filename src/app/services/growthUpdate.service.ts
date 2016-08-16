import { Injectable } from '@angular/core';
import { GrowthUpdate } from '../model/growthUpdate';
declare var amplify: any;

// let amplify = require('amplify-1.1.2');
// let amplify = require('/assets/amplify-1.1.2/individual/amplify.core.js');
// require('/assets/amplify-1.1.2/individual/amplify.store.js');

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class GrowthUpdateService {
  getGrowthUpdates(baby_crn: string) {
    console.log('growthUpdates=' + amplify.store('growthUpdates_' + baby_crn));
    let growthUpdates: GrowthUpdate[] = JSON.parse(
      amplify.store('growthUpdates_' + baby_crn) === undefined ? null : amplify.store('growthUpdates_' + baby_crn));
    console.log('growthUpdates');
    console.log(growthUpdates);
    if (growthUpdates === null || growthUpdates.length < 1) {
      console.log('Get from mock growthUpdates array');
      growthUpdates = [];
      amplify.store('growthUpdates_' + baby_crn, JSON.stringify(growthUpdates));
    }
    return Promise.resolve(growthUpdates);
  }

  getGrowthUpdate(baby_crn: string, timestamp: string) {
    return this.getGrowthUpdates(baby_crn).then(growthUpdates => {
      for (let c of growthUpdates) {
        if (c.timestamp === timestamp) {
          return Promise.resolve(c);
        }
      }
    });
  }

  updateGrowthUpdate(growthUpdate: GrowthUpdate) {
    console.log('updateGrowthUpdate');
    let baby_crn = growthUpdate.baby_crn;
    this.getGrowthUpdates(baby_crn).then(growthUpdates => {
      console.log('growthUpdates');
      console.log(growthUpdates);
      let current: GrowthUpdate[] = growthUpdates;
      let newList: GrowthUpdate[] = [];
      for (let c of current) {
        if (c.timestamp === growthUpdate.timestamp) {
          newList.push(growthUpdate);
        } else {
          newList.push(c);
        }
      }
      console.log('newList');
      console.log(newList);
      amplify.store('growthUpdates_' + baby_crn, JSON.stringify(newList));
    });
  }

  clear(baby_crn: string) {
    amplify.store('growthUpdates_' + baby_crn, null);
  }
}
