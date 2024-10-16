
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
 import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})

export class PatientFormComponent {
  patientForm: FormGroup;
  responseMessage: string = '';
  cartData;
  // currentState$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
  ) {
    this.patientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required]
    });

    // this.currentState$ 
    
   this.cartData = this.router.getCurrentNavigation()?.extras.state;
console.log(this.cartData,'llllllllllllllllllll')
  }

  onSubmit() {
    if (this.patientForm.valid) {
            const formData = {
              apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3',
              ...this.patientForm.value
           };
      this.patientService.addPatient(formData).subscribe(
        (response) => {
          if (response.status_code === '1') {
            this.responseMessage = 'Patient registered successfully. Patient ID: ' + response.data.patient_id;

            console.log(response,"----------------------------")
            var boj = { ...this.cartData,...this.patientForm.value,patient_id:response.data.patient_id}
            this.router.navigate(['/place-order'], { state:boj});
            this.patientForm.reset(); 
          } else {
            this.responseMessage = 'Failed to register patient: ' + response.status_message; // Improved error message
          }
        },
        (error) => {
          this.responseMessage = 'Error occurred during registration: ' + error.message; // Show error message
          console.error(error);
        }
      );
    } else {
      this.responseMessage = 'Please fill all required fields correctly.';
    }
  }
}



















