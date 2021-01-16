import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFlash } from './../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent {

  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction :)',
    show: false,
  };

  @Output() onToggleCard = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onRememberedChange = new EventEmitter();
  constructor() { }

  toggleCard() {
    this.onToggleCard.emit(this.flash.id);
  }

  deleteFlash() {
    this.onDelete.emit(this.flash.id);
  }

  editFlash() {
    this.onEdit.emit(this.flash.id);
  }

  markCorrect() {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'correct',
    });
  }

  markIncorrect() {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect',
    });
  }

}
