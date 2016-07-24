import { Injectable } from '@angular/core';
import { COMMENTS } from './mock-messages';
import { Message } from '../model/message';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class MessageService {
  getMessages() {
    let messages: Message[] = JSON.parse(localStorage.getItem('messages'));
    console.log('messages');
    console.log(messages);
    if (messages != null && messages.length > 0) {
      return Promise.resolve(messages);
    } else {
      localStorage.setItem('messages', JSON.stringify(COMMENTS));
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
      localStorage.setItem('messages', JSON.stringify(messages));
    });
  }
}
