import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ModalServiceService } from './service/modal-service.service';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskListComponent,TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-work-list';
  constructor(private modalService: ModalServiceService) { }
  openTaskForm() {
    this.modalService.open('taskFormModal');
  }
  reload(){
    window.location.reload();
  }
  
}
