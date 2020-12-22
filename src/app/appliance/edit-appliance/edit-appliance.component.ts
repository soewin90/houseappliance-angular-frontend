import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { Status } from "../appliance.constant";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-appliance",
  templateUrl: "./edit-appliance.component.html",
  styleUrls: ["./edit-appliance.component.scss"],
})
export class EditApplianceComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  statusList = Status;
  keys: string[];
  ngDatePikckermodel: NgbDateStruct;
  errorResults: any[];
  res: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private calendar: NgbCalendar
  ) {
    this.keys = Object.keys(this.statusList);
    this.ngDatePikckermodel = this.calendar.getToday();
  }

  ngOnInit() {
    const applianceId = this.activatedRoute.snapshot.paramMap.get("id");
    if (!applianceId) {
      alert("Invalid action.");
      this.router.navigate(["list-appliance"]);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      serialNumber: ["", Validators.required],
      model: ["", Validators.required],
      brand: ["", Validators.required],
      status: ["", Validators.required],
      boughtDate: [this.calendar.getToday(), Validators.required],
    });
    this.apiService.getApplianceById(+applianceId).subscribe((data) => {
      let result = data.result;
      result.boughtDate = this.fromModel(data.result.boughtDate);
      this.editForm.setValue(data.result);
    });
  }

  get f() {
    return this.editForm.controls;
  }

  fromModel(value: string): NgbDateStruct {
    if (!value) return null;
    let parts = value.split("-");
    return { year: +parts[0], month: +parts[1], day: +parts[2].split("T")[0] };
  }

  onSubmit() {
    this.errorResults = [];
    this.submitted = true;
    const invalid = this.editForm.invalid;
    if (invalid) {
      return;
    }
    this.apiService.createAppliance(this.editForm.value).subscribe(
      (data) => {
        this.router.navigate(["list-appliance"]);
      },
      (error: any) => {
        if (error.status === 400) {
          for (const [key, value] of Object.entries(error.error.result)) {
            this.errorResults.push(value);
          }
        }
      }
    );
  }

  onCancel() {
    this.router.navigate(["list-appliance"]);
  }
}
