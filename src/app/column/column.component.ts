import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDropListGroup, CardComponent, FormsModule],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css'
})
export class ColumnComponent {
  @Input() column!: { id: number; name: string; tasks: string[] };
  @Output() drop = new EventEmitter<CdkDragDrop<string[]>>();
  @Output() addTask = new EventEmitter<{ task: string, columnId: number }>();
  @Output() deleteTask = new EventEmitter<{ task: string, columnId: number }>();

  newTask: string = '';

  get connectedDropLists(): string[] {
    return ['To Do', 'In Progress', 'Done'].map(name => name.replace(/\s/g, '-'));
  }

  addTaskToColumn() {
    if (this.newTask.trim()) {
      this.addTask.emit({ task: this.newTask, columnId: this.column.id });
      this.newTask = ''; // Reset input
    }
  }

  deleteTaskFromColumn(task: string) {
    this.deleteTask.emit({ task, columnId: this.column.id });
  }
}
