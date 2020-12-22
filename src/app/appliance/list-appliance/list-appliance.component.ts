import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Appliance } from "src/app/model/appliance.model";
import { ApiService } from "../../service/api.service";
import { Status } from "../appliance.constant";

@Component({
  selector: "app-list-appliance",
  templateUrl: "./list-appliance.component.html",
  styleUrls: ["./list-appliance.component.scss"],
})
export class ListApplianceComponent implements OnInit {
  appliances: Appliance[];
  searchForm: FormGroup;
  submitted: boolean;
  statusList = Status;
  keys: string[];
  ngDatePikckermodel: NgbDateStruct;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.keys = Object.keys(this.statusList);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.searchForm = this.formBuilder.group({
      serialNumber: "",
      model: "",
      brand: "",
      status: "",
      boughtDate: null,
    });
    this.searchForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
    this.onSubmit();
  }

  get f() {
    return this.searchForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.apiService.getList(this.searchForm.value).subscribe((data) => {
      this.appliances = data.result;
    });
  }

  deleteAppliance(appliance: Appliance): void {
    this.apiService.deleteAppliance(appliance.id).subscribe((data) => {
      this.appliances = this.appliances.filter((u) => u !== appliance);
    });
  }

  editAppliance(appliance: Appliance): void {
    this.router.navigate(["edit-appliance", { id: appliance.id }]);
  }

  addAppliance(): void {
    this.router.navigate(["add-appliance"]);
  }

  onReset() {
    this.submitted = false;
    this.searchForm.reset();
    this.searchForm.patchValue({
      serialNumber: "",
      model: "",
      brand: "",
      status: "",
      boughtDate: "",
    });
    this.onSubmit();
  }
}
