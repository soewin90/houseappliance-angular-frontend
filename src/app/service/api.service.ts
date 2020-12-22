import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Appliance } from "../model/appliance.model";
import { Observable, of } from "rxjs/index";
import { ApiResponse } from "../model/api.response";
import { environment } from "../../environments/environment";
import { tap, map } from "rxjs/operators";

// @Injectable({
//     providedIn: 'root'
//   })
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.apiUrl + "/houseappliance/api/v1/";

  listUri: string = "list";

  dateConvertor(date: any | null): string {
    return date
      ? date.year +
          "-" +
          date.month +
          "-" +
          (date.day && date.day.toString().length === 1
            ? "0" + date.day
            : date.day)
      : "";
  }

  getList(formValue: any): Observable<ApiResponse> {
    let params = new HttpParams();
    params = params.append(
      "serialNumber",
      formValue.serialNumber ? formValue.serialNumber : ""
    );
    params = params.append("model", formValue.model ? formValue.model : "");
    params = params.append("brand", formValue.brand ? formValue.brand : "");
    params = params.append("status", formValue.status ? formValue.status : "");
    params = params.append(
      "boughtDate",
      formValue.boughtDate ? this.dateConvertor(formValue.boughtDate) : ""
    );
    return this.http.get<ApiResponse>(this.baseUrl + this.listUri, {
      params: params,
    });
  }

  getApplianceById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + id);
  }

  createAppliance(appliance: Appliance): Observable<ApiResponse> {
    appliance.boughtDate = this.dateConvertor(appliance.boughtDate);
    return this.http.post<ApiResponse>(this.baseUrl, appliance);
  }

  deleteAppliance(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }
}
