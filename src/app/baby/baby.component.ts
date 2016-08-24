import {Component, OnInit} from '@angular/core';
import {Button, InputText, Checkbox, TabView, TabPanel, Panel, DataGrid,
  Calendar, DataTable, Column, Menubar, MenuItem} from 'primeng/primeng';
import {Router} from '@angular/router';
import { BabyService } from '../services/baby.service';
import { Baby, BabyParentLink } from '../model/Baby';
import { GrowthUpdate } from '../model/GrowthUpdate';
import { User } from '../model/user';
import { ParentsComponent } from '../parents/parents.component';
import { Parent } from '../model/Parent';
declare var amplify: any;



@Component({
  selector: 'as-baby',
  templateUrl: 'app/baby/baby.html',
  styleUrls: [
    'app/baby/baby.css'
  ],
  directives: [Button, InputText, Checkbox, TabView, TabPanel, Panel, DataGrid, Calendar, DataTable, Column, Menubar,
  ParentsComponent],
  providers: [BabyService]
})

export class BabyComponent implements OnInit {

  items: MenuItem[];
  globalItems: MenuItem[];
  entityItems: MenuItem[];


  babys: Baby[];

  selectedBaby: Baby;

  user: User;

  selectedGrowthUpdate: GrowthUpdate;

  selectedBabyParentLink: BabyParentLink;

  babyParentLinks: BabyParentLink[];

  constructor(private router: Router, private babyService: BabyService) {
    // amplify.store('loggedIn', 'false');
  }


  ngOnInit() {
    this.globalItems = [
      { label: 'Search', icon: 'fa-search', command: (event) => { this.searchBaby(); } },
      { label: 'New', icon: 'fa-plus', command: (event) => { this.newBaby(); } }
    ];
    this.entityItems = [
      { label: 'Save', icon: 'fa-save', command: (event) => { this.saveBaby(); } },
      { label: 'Discard changes', icon: 'fa-undo', command: (event) => { this.clearBaby(); } },
      { label: 'Delete', icon: 'fa-trash', command: (event) => { this.removeBaby(this.selectedBaby); } }
    ];
    this.refreshMenuBar();
    this.user = JSON.parse(amplify.store('loggedUser'));
    this.babyService.getBabys().then(babys => {
      this.babys = babys;
    });
    if (amplify.store('baby') !== undefined) {
      this.babyService.getBaby(amplify.store('baby')).then(baby => {
        this.editBaby(baby);
        amplify.store('baby', null);
      });
    }

  }

  refreshMenuBar() {
    this.items = [];
    this.items = this.globalItems;
    console.log('items');
    console.log(this.items);
    if (this.selectedBaby) {
      this.items = this.items.concat(this.entityItems);
    }
  }

  newBaby() {
    this.selectedBaby = { 'crn': 'enter crn' };
    this.selectedBaby.growthUpdates = [];
    this.babyService.getParents(this.selectedBaby).then(babyParentLinks => this.babyParentLinks = babyParentLinks);
    this.selectedGrowthUpdate = null;
    this.selectedBabyParentLink = null;
    this.refreshMenuBar();
    // TODO show form
  }

  searchBaby() {
    this.selectedBaby = null;
    this.refreshMenuBar();
  }

  saveBaby() {
    this.babyService.updateBaby(this.selectedBaby).then(babys => {
      this.babys = babys;
    });
    this.babyService.updateBabyParentLinks(this.babyParentLinks).then(returned => {
      this.babyService.getParents(this.selectedBaby).then(babyParentLinks => this.babyParentLinks = babyParentLinks);
    });
    // TODO Growl saved
  }

  clearBaby() {
    this.selectedBaby = null;
    this.babyService.getBabys().then(babys => {
      this.babys = babys;
    });
    this.refreshMenuBar();
  }

  editBaby(entry: Baby) {
    this.selectedBaby = entry;
    this.babyService.getParents(this.selectedBaby).then(babyParentLinks => this.babyParentLinks = babyParentLinks);
    this.selectedGrowthUpdate = null;
    this.selectedBabyParentLink = null;
    this.refreshMenuBar();
  }

  removeBaby(entry: Baby) {
    this.babyService.removeBaby(entry).then(babys => {
      this.babys = babys;
    });
    this.selectedBaby = null;
    this.refreshMenuBar();
  }

  // Composite Relationship

  newGrowthUpdate() {
    this.selectedGrowthUpdate = { 'baby_crn': this.selectedBaby.crn };
    this.selectedBaby.growthUpdates.push(this.selectedGrowthUpdate);
    // TODO show form
  }

  searchGrowthUpdate() {
    this.selectedGrowthUpdate = null;
    // TODO show form
  }

  editGrowthUpdate(entry: GrowthUpdate) {
    this.selectedGrowthUpdate = entry;
  }

  removeGrowthUpdate(entry: GrowthUpdate) {
    console.log(entry);
    let index = this.selectedBaby.growthUpdates.indexOf(entry, 0);
    if (index > -1) {
      this.selectedBaby.growthUpdates.splice(index, 1);
    }

  }

  // Many to Many relationship owner


  viewParent(entry: BabyParentLink) {
    amplify.store('parent', entry.parent_crn);
    this.router.navigate(['/parent']);
  }

  newBabyParentLink() {
    this.selectedBabyParentLink = { 'baby_crn': this.selectedBaby.crn };
    this.babyParentLinks.push(this.selectedBabyParentLink);
    // TODO show form
  }

  searchBabyParentLink() {
    this.selectedBabyParentLink = null;
    // TODO show form
  }

  editBabyParentLink(entry: BabyParentLink) {
    this.selectedBabyParentLink = entry;
  }

  removeBabyParentLink(entry: BabyParentLink) {
    let index = this.babyParentLinks.indexOf(entry, 0);
    if (index > -1) {
      this.babyParentLinks.splice(index, 1);
    }
  }

  onNotify(parent: Parent): void {
    this.selectedBabyParentLink.parent_crn =  parent.crn;
    (<any>$('#myModal')).modal('hide');
  }

}
