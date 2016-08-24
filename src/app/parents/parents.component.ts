import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Button, InputText, Password, Panel, DataList, DataTable, Column, Growl} from 'primeng/primeng';
import {Router} from '@angular/router';
import { ParentService } from '../services/parent.service';
import { Parent } from '../model/Parent';
import {Message} from 'primeng/primeng';


@Component({
  selector: 'as-parents',
  templateUrl: 'app/parents/parents.html',
  styleUrls: [
    'app/parents/parents.css'
  ],
  directives: [Button, InputText, Password, Panel, DataList, DataTable, Column, Growl],
  providers: [ParentService]
})

export class ParentsComponent implements OnInit {
  msgs: Message[] = [];
  parents: Parent[];
  selectedParent: Parent;
  @Output() notify: EventEmitter<Parent> = new EventEmitter<Parent>();

  constructor(private router: Router, private parentService: ParentService) {
    // amplify.store('loggedIn', 'false');
  }

  ngOnInit() {
    this.parentService.getParents().then(parents => {
      this.parents = parents;
      console.log('Loading parents');
    });
  }

  onRowSelect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Parent Selected', detail: event.data.crn + ' - ' + event.data.name});
    this.notify.emit(this.selectedParent);
  }

}
