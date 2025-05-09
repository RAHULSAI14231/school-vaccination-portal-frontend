import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { SchoolVaccinationPortalApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
})
export class StudentManagementComponent {
  students: any = [];
  studentForm: FormGroup;
  studentVaccinateForm: FormGroup;
  studentSearchTerm = '';
  vaccineSearchTerm = '';
  itemsPerPage = 10;
  currentPage = 1;
  offset = 0;
  studentStats: any;
  studentID: any;
  selectedStudent: any;
  studentModalInstance: any;
  studentVaccinateModalInstance: any;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private apiService: ApiService,
    private notificationService: ToastrService
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      roll_no: ['', [Validators.required]],
      class: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone_no: ['', [Validators.required]],
    });

    this.studentVaccinateForm = this.formBuilder.group({
      drive_id: [0, [Validators.required]],
    });

    this.getPaginationUpdates();
  }

  ngOnInit() {
    console.log(this.router.url);
    this.utilService.routeURLSubject.next(this.router.url);
    this.getStudentStats();
    this.getStudentList();
  }

  getStudentStats(): void {
    this.apiService
      .get('student', SchoolVaccinationPortalApis.studentStats)
      .subscribe((res) => {
        console.log(res);
        this.studentStats = res;
      });
  }

  getStudentList(): void {
    let apiUrl;
    if (this.studentSearchTerm && this.vaccineSearchTerm) {
      apiUrl = SchoolVaccinationPortalApis.getStudentsByStudentVaccineName(
        this.itemsPerPage,
        this.offset,
        this.studentSearchTerm,
        this.vaccineSearchTerm
      );
    } else if (this.studentSearchTerm) {
      apiUrl = SchoolVaccinationPortalApis.getStudentByName(
        this.itemsPerPage,
        this.offset,
        this.studentSearchTerm
      );
    } else if (this.vaccineSearchTerm) {
      apiUrl = SchoolVaccinationPortalApis.getStudentsByVaccineName(
        this.itemsPerPage,
        this.offset,
        this.vaccineSearchTerm
      );
    } else {
      apiUrl = SchoolVaccinationPortalApis.getStudents(
        this.itemsPerPage,
        this.offset
      );
    }
    this.apiService.get('student',apiUrl).subscribe((res: any) => {
      console.log(res);
      this.students = res?.data;
      console.log(
        res.total,
        this.itemsPerPage,
        Math.ceil(res.total / this.itemsPerPage)
      );
      this.utilService.paginationConfigSubject.next({
        totalPages: Math.ceil(res?.total / this.itemsPerPage),
        currentPage: this.currentPage,
      });
    });
  }

  addStudent(mode: any): void {
    let modalComponent = document.getElementById('addStudentModal');
    if (modalComponent) {
      console.log(mode);
      const bootstrap = (window as any).bootstrap;
      this.studentModalInstance = new bootstrap.Modal(modalComponent);
      this.studentModalInstance.show();
    }
  }

  generateReports(): void {
    this.apiService
      .get('student',SchoolVaccinationPortalApis.generateReport)
      .subscribe((res: any) => {
        console.log(res);
        const originalUrl = res?.file;
        const updatedUrl = originalUrl.replace('minio-school', 'localhost');
        const link = document.createElement('a');
        link.href = updatedUrl;
        link.download = ''; // optional: set file name if needed
        link.target = '_blank'; // optional: opens in new tab
        link.click();
      });
  }

  closeAddStudentModal(): void {
    if (this.studentModalInstance) {
      this.studentModalInstance.hide();
      this.studentForm.reset();
    }
  }

  editStudent(student: any): void {
    console.log(student);
    this.studentID = student.id;
    this.studentForm.patchValue(student);
    this.addStudent('open');
  }

  getPaginationUpdates(): void {
    this.utilService.paginationSubject.subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.currentPage = res.page;
        this.offset = (res.page - 1) * this.itemsPerPage;
        this.itemsPerPage = res.limit;
        this.getStudentList();
      }
    });
  }

  vaccinateStudent(student: any): void {
    console.log(student);
    this.selectedStudent = student;
    if (!student.vaccination) {
      const modalElement = document.getElementById('studentVaccinateModal');
      if (modalElement) {
        const bootstrap = (window as any).bootstrap;
        this.studentVaccinateModalInstance= new bootstrap.Modal(modalElement);
      }
    }
  }

  closeVaccineStudentModal(): void{
    if(this.studentVaccinateModalInstance) {
      this.studentVaccinateModalInstance.hide();
      this.studentVaccinateForm.reset();
    } 
  }

  updateVaccinationStatus(): void {
    let res = {
      student_id: this.selectedStudent.id,
      drive_id: this.studentVaccinateForm.value.drive_id,
    };
    this.apiService
      .post('student',SchoolVaccinationPortalApis.updateStudentVaccinationStatus, res)
      .subscribe((res: any) => {
        console.log(res);
        this.closeVaccineStudentModal();
      });
  }

  studentRecordsUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.apiService
        .post('student',SchoolVaccinationPortalApis.bulkCreateStudentRecords, formData)
        .subscribe((res: any) => {
          console.log(res);
          if (res?.success) {
            console.log('File selected:', this.selectedFile);
          }
        });
    }
  }

  studentsVaccinatedRecordsUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.log('File selected:', this.selectedFile);

      this.apiService
        .post('student',SchoolVaccinationPortalApis.bulkUpdateVaccineRecords, formData)
        .subscribe((res: any) => {
          console.log(res);
          if (res?.success) {
            console.log('File selected:', this.selectedFile);
          }
        });
    }
  }

  bulkStudentUpload(): void {}

  onSearchStudent(): void {
    this.getStudentList();
  }

  clearStudentSearchTerm(): void {
    this.studentSearchTerm = '';
    this.getStudentList();
  }

  clearVaccineSearchTerm(): void {
    this.vaccineSearchTerm = '';
    this.getStudentList();
  }

  onSubmit() {
    console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      let requestObj = {
        id: this.studentID,
        ...this.studentForm.value,
      };
      console.log('ID', this.studentID);
      this.studentID
        ? this.apiService
            .patch('student',SchoolVaccinationPortalApis.addStudent, requestObj)
            .subscribe((res: any) => {
              if (res?.data) {
                this.notificationService.success(
                  'Student Updated Successfully',
                  'Success'
                );
                this.closeAddStudentModal()
                this.studentID = '';
                this.getStudentList();
                this.utilService.refreshStudentListSubject.next({ data: true });
              } else {
                this.notificationService.error(
                  'Some problem encountered',
                  'Error'
                );
              }
            })
        : this.apiService
            .post(
            'student',
              SchoolVaccinationPortalApis.addStudent,
              this.studentForm.value
            )
            .subscribe((res: any) => {
              if (res?.data) {
                this.notificationService.success(
                  'Student Added Successfully',
                  'Success'
                );
                this.closeAddStudentModal();
                this.getStudentList();
                this.utilService.refreshStudentListSubject.next({ data: true });
              } else {
                this.notificationService.error(
                  'Some problem encountered',
                  'Error'
                );
              }
            });
      // You can also handle your submission logic here
    }
  }

  validateForm() {
    this.onSubmit();
  }

  checkValidity() {
    console.log(this.studentForm.value);
    return !this.studentForm.valid;
  }
}
