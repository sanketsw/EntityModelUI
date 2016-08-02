import { Injectable } from '@angular/core';

// Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
@Injectable()
export class StorageService {

  storageMap: string[] = [];

  getItem(key: string) {
    return this.storageMap[key];
  }

  setItem(key: string, value: string) {
    this.storageMap[key] = value;
  }
}
