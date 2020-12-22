import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { Status } from "../appliance.constant";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-add-appliance",
  templateUrl: "./add-appliance.component.html",
  styleUrls: ["./add-appliance.component.scss"],
})
export class AddApplianceComponent implements OnInit {
  submitted = false;
  addForm: FormGroup;
  statusList = Status;
  keys: string[];
  ngDatePikckermodel: NgbDateStruct;
  errorResults: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private calendar: NgbCalendar
  ) {
    this.keys = Object.keys(this.statusList);
    this.ngDatePikckermodel = this.calendar.getToday();
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      serialNumber: ["", Validators.required],
      model: ["", Validators.required],
      brand: ["", Validators.required],
      status: ["", Validators.required],
      boughtDate: [null, Validators.required],
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.errorResults = [];
    this.submitted = true;
    const invalid = this.addForm.invalid;
    if (invalid) {
      return;
    }
    this.apiService.createAppliance(this.addForm.value).subscribe(
      (data) => {
        this.router.navigate(["list-appliance"]);
      },
      (error: any) => {
        if (error.status === 400) {
          for (const [key, value] of Object.entries(error.error.result)) {
            this.errorResults.push(value);
            this.addForm.patchValue({ boughtDate: undefined });
          }
        }
      }
    );
  }

  onReset() {
    this.errorResults = [];
    this.submitted = false;
    this.addForm.reset();
  }

  onCancel() {
    this.router.navigate(["list-appliance"]);
  }
}
