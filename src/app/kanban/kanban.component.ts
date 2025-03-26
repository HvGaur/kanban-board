import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnComponent } from '../column/column.component';
import { SupabaseService } from '../supabase.service';

interface Column {
  id: number;
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
  columns: Column[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    const { data, error } = await this.supabaseService.client.from('columns').select('*');
    if (error) console.error('Error loading tasks:', error);
    else this.columns = data || [];
  }

  async saveTasks() {
    for (const column of this.columns) {
      await this.supabaseService.client.from('columns').upsert(column);
    }
  }

  async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    await this.saveTasks();
  }

  async addTask(task: string, columnId: number) {
    const column = this.columns.find(col => col.id === columnId);
    if (column) {
      column.tasks.push(task);
      await this.saveTasks();
    }
  }

  async deleteTask(task: string, columnId: number) {
    const column = this.columns.find(col => col.id === columnId);
    if (column) {
      column.tasks = column.tasks.filter(t => t !== task);
      await this.saveTasks();
    }
  }
}
