import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddApplianceComponent } from "./appliance/add-appliance/add-appliance.component";
import { ListApplianceComponent } from "./appliance/list-appliance/list-appliance.component";
import { EditApplianceComponent } from "./appliance/edit-appliance/edit-appliance.component";
import { ApiService } from "./service/api.service";

@NgModule({
  declarations: [
    AppComponent,
    AddApplianceComponent,
    EditApplianceComponent,
    ListApplianceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
