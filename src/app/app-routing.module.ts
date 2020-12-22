import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddApplianceComponent } from "./appliance/add-appliance/add-appliance.component";
import { EditApplianceComponent } from "./appliance/edit-appliance/edit-appliance.component";
import { ListApplianceComponent } from "./appliance/list-appliance/list-appliance.component";

const routes: Routes = [
  { path: "add-appliance", component: AddApplianceComponent },
  { path: "list-appliance", component: ListApplianceComponent },
  { path: "edit-appliance", component: EditApplianceComponent },
  { path: "", component: ListApplianceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
