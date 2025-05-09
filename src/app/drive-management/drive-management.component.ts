import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { SchoolVaccinationPortalApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drive-management',
  templateUrl: './drive-management.component.html',
  styleUrls: ['./drive-management.component.scss'],
})
export class DriveManagementComponent {
  drives: any = [];

  driveForm: FormGroup;
  minDate: string;
  itemsPerPage = 10;
  currentPage = 1;
  driveID: any;
  driveModalInstance: any;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilService,
    private apiService: ApiService,
    private notificationService: ToastrService
  ) {
    this.driveForm = this.formBuilder.group({
      vaccine_name: ['', [Validators.required]],
      drive_date: ['', [Validators.required]],
      doses: [0, [Validators.required]],
      classes: [[], [Validators.required]],
    });
    const now = new Date();
    this.minDate = now.toISOString().split('T')[0]; // "yyyy-MM-dd"
  }

  ngOnInit() {
    console.log(this.router.url);
    this.utilService.routeURLSubject.next(this.router.url);
    this.getDriveList();
  }

  getDriveList(): void {
    this.apiService
      .get('vaccine', SchoolVaccinationPortalApis.getDrives)
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.drives = res?.data;
        }
      });
  }

  scheduleDrive(): void {
    console.log('scheduleDrive');
    const modalElement = document.getElementById('scheduleDriveModal');
    if (modalElement) {
      const bootstrap = (window as any).bootstrap;
      this.driveModalInstance = new bootstrap.Modal(modalElement);
      this.driveModalInstance.show();
    }
  }

  editDrive(drive: any): void {
    this.driveID = drive.id;
    this.driveForm.patchValue(drive);
    this.scheduleDrive();
  }

  closeDriveModal(): void {
    console.log('closeDriveModal');
    if (this.driveModalInstance) {
      this.driveModalInstance.hide();
      this.driveForm.reset();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
    }
  }

  onSubmit() {
    if (this.driveForm.valid) {
      let addRequestObj = {
        drive_date: this.utilService.formatDateToMySQL(
          this.driveForm.value.drive_date
        ),
        classes: this.driveForm.value.classes,
        vaccine_name: this.driveForm.value.vaccine_name,
        doses: parseInt(this.driveForm.value.doses),
      };

      let editedDriveForm: Object = this.getEditedDriveFormValues(this.driveForm);
        let editRequestObject = {
          id: this.driveID,
          ...editedDriveForm
        };
      this.driveID
        ? this.apiService
            .patch('vaccine', SchoolVaccinationPortalApis.scheduleDrive, editRequestObject)
            .subscribe((res: any) => {
              if (res?.data) {
                this.notificationService.success(
                  'Drive Updated Successfully',
                  'Success'
                );
                this.utilService.refreshStudentListSubject.next({ data: true });
                this.closeDriveModal();
              } else {
                this.notificationService.error(
                  'Some problem encountered',
                  'Error'
                );
              }
            })
        : this.apiService
            .post('vaccine', SchoolVaccinationPortalApis.scheduleDrive, addRequestObj)
            .subscribe((res: any) => {
              if (res?.data) {
                this.notificationService.success(
                  'Drive Added Successfully',
                  'Success'
                );
                this.closeDriveModal();
                this.getDriveList();
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

  getEditedDriveFormValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};

    Object.keys(formGroup.controls).forEach((key) => {
      console.log(key);
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
        if(key === 'drive_date') {
          dirtyValues[key] = this.utilService.formatDateToMySQL(control.value);
        }
      }
    });

    return dirtyValues;
  }

  validateForm() {
    this.onSubmit();
  }

  checkValidity() {
    return !this.driveForm.valid;
  }
}
