import { bootstrapApplication } from '@angular/platform-browser';
import { KanbanComponent } from './app/kanban/kanban.component';

const root = document.createElement('app-kanban');
document.body.appendChild(root);

bootstrapApplication(KanbanComponent).catch(err => console.error(err));