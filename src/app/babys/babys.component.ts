import {Component, OnInit} from '@angular/core';
import {Button, InputText, Password, Panel, DataList} from 'primeng/primeng';
import {Router} from '@angular/router';

import { BabyService } from '../services/baby.service';
import { Baby } from '../model/baby';
import { User } from '../model/user';
declare var amplify: any;



@Component({
  selector: 'as-babys',
  templateUrl: 'app/babys/babys.html',
  styleUrls: [
    'app/babys/babys.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList],
  providers: [BabyService]
})

export class BabysComponent implements OnInit {

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
      console.log('Loading babys');
    });
  }

  viewBaby(baby: Baby) {
    this.selectedBaby = baby;
    amplify.store('baby', JSON.stringify(this.selectedBaby));
    this.router.navigate(['/babyDetail']);
  }


}
