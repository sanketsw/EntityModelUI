import { Injectable } from '@angular/core';
import { COMMENTS } from './mock-messages';
import { Message } from '../model/message';
declare var amplify: any;


// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class MessageService {
  getMessages() {
    let storedData = amplify.store('messages');
    storedData = storedData === undefined ? null : storedData;
    let messages: Message[] = JSON.parse(storedData);
    console.log('messages');
    console.log(messages);
    if (messages != null && messages.length > 0) {
      return Promise.resolve(messages);
    } else {
      amplify.store('messages', JSON.stringify(COMMENTS));
      return Promise.resolve(COMMENTS);
    }
  }

  getMessagesForCustomer(customerName: string) {
    return this.getMessages().then(messages => {
      let messageList: Message[] = [];
      for (let c of messages) {
        if (c.customer === customerName) {
          messageList.push(c);
        }
      }
      return Promise.resolve(messageList);
    });
  }

  updateMessage(message: Message) {
    this.getMessages().then(messages => {
      messages.push(message);
      amplify.store('messages', JSON.stringify(messages));
    });
  }

  clear() {
    amplify.store('messages', null);
  }
}
