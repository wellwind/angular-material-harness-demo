import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-area',
  templateUrl: './buttons-area.component.html',
  styleUrls: ['./buttons-area.component.css']
})
export class ButtonsAreaComponent implements OnInit {
  selectedAction = '';

  actions = ['Save', 'Exit'];

  isDisabled = false;

  constructor() { }

  ngOnInit() { }

  go() {
    this.isDisabled = true;
  }
}
