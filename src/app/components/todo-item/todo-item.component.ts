import { Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { EventEmitter } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state('active', style({ fontSize: '18px', color: 'black' })),
  state(
    'completed',
    style({
      fontSize: '17px',
      color: 'lightgrey',
    // thêm line-through
    })
  ),
  transition('active <=> completed', [animate(250)]),
]);
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThroughAnimation],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() delTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;
  constructor() {}

  ngOnInit(): void {}

  deleteTodo() {
    this.delTodo.emit(this.todo);
  }

  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
}
