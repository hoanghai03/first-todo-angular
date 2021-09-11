import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Filterbutton, Filter } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: Filterbutton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Acompleted', isActive: false },
  ];

  length = 0;
  hasCompleted$: Observable<boolean> = new Observable<boolean>();
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}


  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map((todos) => todos.some((t) => t.isCompleted)),
      takeUntil(this.destroy$)
    );
    this.todoService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length: number) => {
        this.length = length;
      });
  }

  clearCompleted(){
    this.todoService.clearCompleted();
  }

  filter(type: Filter){
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  setActiveFilterBtn(type: Filter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
