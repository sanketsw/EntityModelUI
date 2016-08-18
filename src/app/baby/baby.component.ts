import {Component, OnInit} from '@angular/core';
import {Button, InputText, TabView, TabPanel, Panel, DataList, Calendar, DataTable, Column} from 'primeng/primeng';
import {Router} from '@angular/router';
import { BabyService } from '../services/baby.service';
import { Baby, BabyParentMap } from '../model/Baby';
import { GrowthUpdate } from '../model/GrowthUpdate';
import { User } from '../model/user';
declare var amplify: any;



@Component({
  selector: 'as-baby',
  templateUrl: 'app/baby/baby.html',
  styleUrls: [
    'app/baby/baby.css'
  ],
  directives: [Button, InputText, TabView, TabPanel, Panel, DataList, Calendar, DataTable, Column],
  providers: [BabyService]
})

export class BabyComponent implements OnInit {

  babys: Baby[];

  selectedBaby: Baby;

  user: User;

  constructor(private router: Router, private babyService: BabyService) {
    // amplify.store('loggedIn', 'false');
  }


  ngOnInit() {
    this.user = JSON.parse(amplify.store('loggedUser'));
    this.babyService.getBabys().then(babys => {
      this.babys = babys;
    });
  }

  newBaby() {
    this.selectedBaby = { 'crn': 'enter crn' };
    this.selectedBaby.growthUpdates = [];
    this.selectedBaby.babyParentMaps = [];
    // TODO show form
  }

  searchBaby() {
    this.selectedBaby = null;
    // TODO show form
  }

  onBabySelect(event) {
    this.babyService.getParents(event.data).then(babyParentMaps => this.selectedBaby.babyParentMaps = babyParentMaps);
  }


  saveBaby() {
    this.babyService.updateBaby(this.selectedBaby).then(babys => {
      this.babys = babys;
    });
    // TODO Growl saved
  }

  clearBaby() {

    this.selectedBaby = null;
    amplify.store('baby', null);
    this.babyService.getBabys().then(babys => {
      this.babys = babys;
    });
  }

  removeBaby(entry: Baby) {
    this.babyService.removeBaby(entry).then(babys => {
      this.babys = babys;
    });
  }

  newGrowthUpdate() {
    this.selectedBaby.selectedGrowthUpdate = { 'baby_crn': this.selectedBaby.crn };
    this.selectedBaby.growthUpdates.push(this.selectedBaby.selectedGrowthUpdate);
    // TODO show form
  }

  searchGrowthUpdate() {
    this.selectedBaby.selectedGrowthUpdate = null;
    // TODO show form
  }

  removeGrowthUpdate(entry: GrowthUpdate) {
    console.log(entry);
    let index = this.selectedBaby.growthUpdates.indexOf(entry, 0);
    if (index > -1) {
      this.selectedBaby.growthUpdates.splice(index, 1);
    }

  }


  newBabyParentMap() {
    this.selectedBaby.selectedBabyParentMap = { 'baby_crn': this.selectedBaby.crn };
    this.selectedBaby.babyParentMaps.push(this.selectedBaby.selectedBabyParentMap);
    // TODO show form
  }

  searchBabyParentMap() {
    this.selectedBaby.selectedBabyParentMap = null;
    // TODO show form
  }

  removeBabyParentMap(entry: BabyParentMap) {
    let index = this.selectedBaby.babyParentMaps.indexOf(entry, 0);
    if (index > -1) {
      this.selectedBaby.babyParentMaps.splice(index, 1);
    }

  }


}
