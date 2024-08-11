import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalServiceService } from '../../service/modal-service.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;

  constructor(private modalService: ModalServiceService) {}

  tasks: any[] = [];

  searchTerm: string = '';
  currentPage: number = 0;
  rowsPerPage: number = 5;
  paginatedTasks: any[] = [];
  selectedTask: any;
  isModalVisible = false; // Flag to control modal visibility
  deleteId!:number;

  ngOnInit(): void {
    this.getAllTask();

  }
  getAllTask(){
    this.modalService.getAllTasks().subscribe((res: any) => {
      this.tasks=res;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  goToFirstPage(): void {
    this.currentPage = 0;
    this.updatePagination();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage(): void {
    if (
      this.currentPage <
      Math.ceil(this.tasks.length / this.rowsPerPage) - 1
    ) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToLastPage(): void {
    this.currentPage = Math.ceil(this.tasks.length / this.rowsPerPage) - 1;
    this.updatePagination();
  }

  searchTasks(): void {
    const filteredTasks = this.tasks.filter(
      (task) =>
        task.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.comments.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 0; // Reset to first page after search
    this.tasks = filteredTasks;
    this.updatePagination();
  }

  //edit task form open
  editTask(task: any) {
    this.taskFormComponent.task = task; // Pass the selected task to the form
    this.modalService.open('taskFormModal');
  }

  openDeleteConfirmation(task: any) {
   
    this.selectedTask = task;
    this.deleteId=task.id
    this.isModalVisible = true; // Show the modal
  }

  confirmDelete() {
    // this.tasks = this.tasks.filter((t) => t.id !== this.selectedTask.id);
    this.closeModal();

    
    this.modalService.deleteTask(this.deleteId).subscribe((res)=>{
      this.getAllTask();
    });
    
  }

  closeModal() {
    this.isModalVisible = false; // Hide the modal
    this.selectedTask = null; // Reset selected task
  }
}
