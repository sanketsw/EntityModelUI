import {Component, OnInit} from '@angular/core';
import {Button, InputText, Checkbox, TabView, TabPanel, Panel, DataGrid,
  Calendar, DataTable, Column, Menubar, MenuItem} from 'primeng/primeng';
import {Router} from '@angular/router';
import { ParentService } from '../services/parent.service';
import { Parent } from '../model/Parent';
import { BabyParentLink } from '../model/Baby';
import { Address } from '../model/Address';
import { User } from '../model/user';
declare var amplify: any;



@Component({
  selector: 'as-parent',
  templateUrl: 'app/parent/parent.html',
  styleUrls: [
    'app/parent/parent.css'
  ],
  directives: [Button, InputText, Checkbox, TabView, TabPanel, Panel, DataGrid, Calendar, DataTable, Column, Menubar],
  providers: [ParentService]
})

export class ParentComponent implements OnInit {

  items: MenuItem[];
  globalItems: MenuItem[];
  entityItems: MenuItem[];

  parents: Parent[];

  selectedParent: Parent;

  user: User;

  selectedAddress: Address;

  selectedBabyParentLink: BabyParentLink;

  babyParentLinks: BabyParentLink[];

  constructor(private router: Router, private parentService: ParentService) {
    // amplify.store('loggedIn', 'false');
  }


  ngOnInit() {
    this.globalItems = [
      { label: 'Search', icon: 'fa-search', command: (event) => { this.searchParent(); } },
      { label: 'New', icon: 'fa-plus', command: (event) => { this.newParent(); } }
    ];
    this.entityItems = [
      { label: 'Save', icon: 'fa-save', command: (event) => { this.saveParent(); } },
      { label: 'Discard changes', icon: 'fa-undo', command: (event) => { this.clearParent(); } },
      { label: 'Delete', icon: 'fa-trash', command: (event) => { this.removeParent(this.selectedParent); } }
    ];
    this.refreshMenuBar();
    this.user = JSON.parse(amplify.store('loggedUser'));
    this.parentService.getParents().then(parents => {
      this.parents = parents;
    });
    if (amplify.store('parent') !== undefined) {
      this.parentService.getParent(amplify.store('parent')).then(parent => {
        this.editParent(parent);
        amplify.store('parent', null);
      });
    }
  }

  refreshMenuBar() {
    this.items = [];
    this.items = this.globalItems;
    console.log('items');
    console.log(this.items);
    if (this.selectedParent) {
      this.items = this.items.concat(this.entityItems);
    }
  }

  newParent() {
    this.selectedParent = { 'crn': 'enter crn' };
    this.selectedParent.addresss = [];
    this.refreshMenuBar();
  }

  searchParent() {
    this.selectedParent = null;
    this.refreshMenuBar();
  }

  saveParent() {
    this.parentService.updateParent(this.selectedParent).then(parents => {
      this.parents = parents;
    });
    // TODO Growl saved
  }

  clearParent() {
    this.selectedParent = null;
    amplify.store('parent', null);
    this.parentService.getParents().then(parents => {
      this.parents = parents;
    });
    this.refreshMenuBar();
  }

  editParent(entry: Parent) {
    this.selectedParent = entry;
    this.parentService.getBabies(this.selectedParent).then(babyParentLinks => this.babyParentLinks = babyParentLinks);
    this.selectedAddress = null;
    this.selectedBabyParentLink = null;
    this.refreshMenuBar();
  }

  removeParent(entry: Parent) {
    this.parentService.removeParent(entry).then(parents => {
      this.parents = parents;
    });
    this.selectedParent = null;
    this.refreshMenuBar();
  }

  // Composite Relationship

  newAddress() {
    this.selectedAddress = { 'parent_crn': this.selectedParent.crn };
    this.selectedParent.addresss.push(this.selectedAddress);
    // TODO show form
  }

  searchAddress() {
    this.selectedAddress = null;
    // TODO show form
  }

  editAddress(entry: Address) {
    this.selectedAddress = entry;
  }

  removeAddress(entry: Address) {
    console.log(entry);
    let index = this.selectedParent.addresss.indexOf(entry, 0);
    if (index > -1) {
      this.selectedParent.addresss.splice(index, 1);
    }

  }

  // Many to Many relationship Not owner

  viewBaby(entry: BabyParentLink) {
    amplify.store('baby', entry.baby_crn);
    this.router.navigate(['/baby']);
  }



}
