import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-area',
  templateUrl: './buttons-area.component.html',
  styleUrls: ['./buttons-area.component.css']
})
export class ButtonsAreaComponent {
  @Input() actions = ['Save', 'Exit'];
  @Input() isDisabled = false;
  @Output() actionSelected = new EventEmitter<string>();
  selectedAction: '';

  triggerAction() {
    this.actionSelected.emit(this.selectedAction);
  }
}
