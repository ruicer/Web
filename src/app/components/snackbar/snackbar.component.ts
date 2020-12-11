import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'snack-app',
  templateUrl: './snackbar.component.html'
})
export class SnackComponent {
  Message;
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.Message = data;
  }
 }
