import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private _url: string = 'https://erp-soft-api.onrender.com/api/v1';
  // private new_url:string='http://192.168.29.20:3000/api/v1';
  // private _url1:string='http://192.168.29.20:3000/api/v1/project'
  empData:any;
  empBack:any;
  prodData:any[]=[];
  projectData:any[]=[];
  projData:any[]=[];
 public IsLoggedIn:boolean = false;
  url:string='C:\\Users\\Vikrant\\Downloads'+'\\';
  categoryData:any;
  constructor(private _http: HttpClient) {}

  logIn(data:any):Observable<any>{
    return this._http.post(`${this._url}/user/login`,data)
  }
register(data:any):Observable<any>{
  return this._http.post(`${this._url}/user/register`,data)
}
  getEmployees(): Observable<any> {
    return this._http.get(`${this._url}/employees`);
  };

   postEmployees(data:any):Observable<any>{
    // console.log("empdatafromService",this.empBack);
    return this._http.post(`${this._url}/employees`,data)
   }
   
   putEmployees(data:any,id:any):Observable<any>{
    return this._http.put(`${this._url}/employees/${id}`,data)
   }
   addCategory(data:any):Observable<any>{
    return this._http.post<any>(`${this._url}/category`,data)
   }
   getCategory():Observable<any>{
    return this._http.get<any>(`${this._url}/category`)
   }

   uploadImages(formData:any):Observable<any>{
    return this._http.post<any>(`${this._url}/products`,formData)
   }
   getProducts():Observable<any>{
    return this._http.get<any>(`${this._url}/products`)
   }
   updateProducts(data:any,id:any):Observable<any>{
    return this._http.put(`${this._url}/products/${id}`,data)
   }

   getProjects():Observable<any>{
    return this._http.get<any>(`${this._url}/project`)
   }
      
   postProjects(data:any):Observable<any>{
    return this._http.post(`${this._url}/project`,data)
   }
   putProjects(data:any,id:any):Observable<any>{
    return this._http.put(`${this._url}/project/${id}`,data)
   }
   postBill(data:any):Observable<any>{
    return this._http.post(`${this._url}/retailBilling`,data)
   }

}
