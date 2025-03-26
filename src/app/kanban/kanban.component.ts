import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnComponent } from '../column/column.component';

interface Column {
  name: string;
  tasks: string[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, ColumnComponent, CdkDropListGroup],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit {
  columns: Column[] = [ // ✅ Type explicitly defined
    { name: 'To Do', tasks: [] },
    { name: 'In Progress', tasks: [] },
    { name: 'Done', tasks: [] },
  ];

  ngOnInit() {
    this.loadTasks();
  }

  saveTasks() {
    localStorage.setItem('kanbanTasks', JSON.stringify(this.columns));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
      this.columns = JSON.parse(savedTasks);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.saveTasks();
  }

  addTask(task: string, columnName: string) {
    const column = this.columns.find(col => col.name === columnName);
    if (column) {
      column.tasks.push(task); // ✅ Now TypeScript knows tasks is a string[]
      this.saveTasks();
    }
  }

  deleteTask(task: string, columnName: string) {
    const column = this.columns.find(col => col.name === columnName);
    if (column) {
      column.tasks = column.tasks.filter(t => t !== task); // ✅ Type is clear now
      this.saveTasks();
    }
  }
}