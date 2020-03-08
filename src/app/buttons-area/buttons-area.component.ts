import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-area',
  templateUrl: './buttons-area.component.html',
  styleUrls: ['./buttons-area.component.css']
})
export class ButtonsAreaComponent implements OnInit {
  @Input() actions = ['Save', 'Exit'];
  @Input() isDisabled = false;
  @Output() actionSelected = new EventEmitter<string>();
  selectedAction: '';

  constructor() {}

  ngOnInit() {}

  triggerAction() {
    this.actionSelected.emit(this.selectedAction);
  }
}
