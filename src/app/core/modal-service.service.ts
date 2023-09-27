import { ComponentFactoryResolver, Injectable, Injector, TemplateRef } from '@angular/core';
import { EmployeeDbComponent } from '../shared/employee-db/employee-db.component';


@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private resolver:ComponentFactoryResolver,private injector:Injector) { }

  // open(content:TemplateRef<any>,options:{size: string; title: string}){
  //   const emp_dbFactory=this.resolver.resolveComponentFactory(EmployeeDbComponent);
  //   const contentViewRef= content.createEmbeddedView(null);
  //   const emp_db= EmployeeDbComponentFactory.create(this.Injector,[])
  // }
}
