import { Injectable } from '@angular/core';
import { USERS } from './mock-users';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class UserService {
    getUsers() {
        return Promise.resolve(USERS);
    }

    autheticateUser(name:string, password: string) {
      return this.getUsers().then(users => {
        for(let u of users) {
          if(u.username === name && u.password === password) {
            return Promise.resolve(u);
          }
        }
        throw 'invalid user credentials';
      });
    }
}
