import { Component, Input } from '@angular/core';
import { ModalServiceService } from '../../service/modal-service.service';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Input() task: any; // Task data passed from the parent component
  taskForm: FormGroup;
  constructor(private modalService: ModalServiceService,private fb: FormBuilder) { 
    this.taskForm = this.fb.group({
      user: [''],
      status: [''],
      dueDate: [''],
      priority: [''],
      description: [''],
    });
  }

  ngOnChanges() {
    // When the task input changes, update the form with the task data
    if (this.task) {

      this.taskForm.patchValue({
        user:this.task.name,
        status: this.task.name,
        dueDate: this.task.name,
        priority: this.task.name,
        description: this.task.name,
      });
    }
  }

  //Save or update task
  saveTask() {
    const formData = this.taskForm.value;
    if (this.task) {
      this.modalService.editeTask(this.task.id,formData).subscribe((res)=>{
        this.modalService.close('taskFormModal');
      })
    } else {
      this.modalService.addtask(formData).subscribe((res)=>{
        this.modalService.close('taskFormModal');
  
      })
    }
  }

  closeModal() {
    this.modalService.close('taskFormModal');
  }

}
