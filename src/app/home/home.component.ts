import {Component, OnInit} from '@angular/core';
import {Accordion} from 'primeng/primeng';
import {AccordionTab} from 'primeng/primeng';
import {Message, Growl, DataTable, Column, Dialog, Button} from 'primeng/primeng';

import { UserService } from '../services/user.service';
import { User } from '../model/user';


@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    directives: [Accordion, AccordionTab, Growl, DataTable, Column, Dialog, Button],
    providers: [UserService]
})

export class HomeComponent implements OnInit {
    msgs: Message[];
    users: User[];

    displayDialog: boolean;

    user: User = new User();

    selectedUser: User;

    newUser: boolean;

    constructor(private userService: UserService) { }

    getUsers() {
        this.userService.getUsers().then(users => this.users = users);
    }

    ngOnInit() {
        this.getUsers();
    }


    onTabClose(event) {
        this.msgs = [];
        console.log('Tab Closed');
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    }

    onTabOpen(event) {
        this.msgs = [];
        console.log('Tab Opened');
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    }

    showDialogToAdd() {
        this.newUser = true;
        this.user = new User();
        this.displayDialog = true;
    }

    save() {
        if (this.newUser) {
            this.users.push(this.user);
        } else {
            this.users[this.findSelectedUserIndex()] = this.user;
        }
        this.user = null;
        this.displayDialog = false;
    }

    delete() {
        this.users.splice(this.findSelectedUserIndex(), 1);
        this.user = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newUser = false;
        this.user = this.cloneUser(event.data);
        this.displayDialog = true;
    }

    cloneUser(c: User): User {
        let user = new User();
        for (let prop in c) {
            if (c[prop] != null) {
                user[prop] = c[prop];
            }
        }
        return user;
    }

    findSelectedUserIndex(): number {
        return this.users.indexOf(this.selectedUser);
    }
}
