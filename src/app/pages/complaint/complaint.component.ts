import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../services/services/complaint.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent {
  complaintForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder ,private complaintService : ComplaintService , private toastr : ToastrService) {
    this.complaintForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      details: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get fullName() {
    return this.complaintForm.get('fullName');
  }

  get phone() {
    return this.complaintForm.get('phone');
  }

  get email() {
    return this.complaintForm.get('email');
  }

  get details() {
    return this.complaintForm.get('details');
  }

  submitComplaint() {
    if (this.complaintForm.valid) {
      this.isSubmitting = true;

      this.complaintService.sendComplaint(this.complaintForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Complaint submitted successfully!', 'Success');
          this.complaintForm.reset();
        },
        error: (error) => {
          this.toastr.error('An error occurred while submitting the complaint. Please try again.', 'Error');
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.toastr.warning('Please fill in all required fields correctly.', 'Warning');
    }
  }
}