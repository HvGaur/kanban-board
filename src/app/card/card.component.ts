import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() task!: string;
  @Input() columnId!: number;
  @Output() delete = new EventEmitter<{ task: string, columnId: number }>();

  deleteTask() {
    this.delete.emit({ task: this.task, columnId: this.columnId });
  }
  
}
