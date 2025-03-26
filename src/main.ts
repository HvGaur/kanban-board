import { bootstrapApplication } from '@angular/platform-browser';
import { KanbanComponent } from './app/kanban/kanban.component';
// Create a root container dynamically
const root = document.createElement('app-kanban');
document.body.appendChild(root);

// Bootstrap the application
bootstrapApplication(KanbanComponent).catch(err => console.error(err));