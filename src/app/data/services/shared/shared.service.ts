import { Injectable, EventEmitter } from '@angular/core';
import { SnackBar } from '@data/interfaces/shared/snackbarI.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  snackBar = new EventEmitter<SnackBar>();
  showSnackBar = new EventEmitter<boolean>();
  nabvarOption = new EventEmitter<String>();
  constructor() { }
}
