import { Component, ViewChild } from '@angular/core';
import { IFlash } from './flash.model';
import { NgForm } from '@angular/forms';


function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-flashcards';

  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];


  @ViewChild('flashForm', { static: false }) flashForm: NgForm;

  editing = false;
  editingId: number;

  flash = {
    question: '',
    answer: ''
  };

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    const flash = this.flashs.find(flash => flash.id === id);
    this.flash.question = flash.question;
    this.flash.answer = flash.answer;
  }
  handleUpdate() {
    const flash = this.flashs.find(flash => flash.id === this.editingId);
    flash.question = this.flash.question;
    flash.answer = this.flash.answer;
    this.handleCancel();
  }
  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleSubmit(): void {
    this.flashs.push({
      id: getRandomNumber(),
      question: this.flash.question,
      answer: this.flash.answer,
      show: false,

    })

    this.handleClear();
  }

  handleClear() {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleDelete(id: number) {
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1)
  }

  handleRememberedChange({ id, flag }) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.remembered = flag;
  }

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashs.find(flash => flash.id === id);
    flash.show = !flash.show;
  }



}
