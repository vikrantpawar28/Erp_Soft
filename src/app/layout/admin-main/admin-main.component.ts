import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ServicesService } from '../../core/services.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit{
  isLoading = true;
  hideParagraphs: boolean = true;
  hideMenubar: boolean = false;
  Selected_value: any;
  currentUrl: string = '';
  IsMobile:boolean=false;
  constructor(
    private router: Router,
    private BreakpointObserver: BreakpointObserver,
    public _serviceService:ServicesService
  ) {}

  ngOnInit(): void {

    this._serviceService.getDashboard().subscribe((data) => {
      this._serviceService.dashData[0] = data;
      console.log('this is dashboard data', this._serviceService.dashData);
    });

    this.BreakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large

    ]).subscribe(result=>{
      this.IsMobile=result.matches;
    })
  }
  open() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/emp_db']);
  }
  openProductsComponent() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/inv']);
  }
  OpenPayroll() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/payroll']);
  }
  OpenProject() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/projects']);
  }
  openAddbill() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/addbill']);
  }
  openManagebill() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/managebill']);
  }
  OpenCRM() {
    this.currentUrl = this.router.url;
    this.router.navigate(['admin-main/crm']);
  }
  toggleParagraphs() {
    this.hideParagraphs = !this.hideParagraphs;
  }
  toggleMenubar() {
    this.hideMenubar = !this.hideMenubar;
    this.IsMobile=!this.IsMobile;
  }
  showDashboard() {
    this.showTable = true;
    this.router.navigate(['admin-main']);
  }
  showTable: any = true;
  getUrl() {
    this.currentUrl = this.router.url;
    const components = [
      'emp_db',
      'inv',
      'projects',
      'managebill',
      'addbill',
      'crm',
    ];
    const value = components.some((comp) => this.currentUrl.includes(comp));
    if (value) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }

    return components.some((comp) => this.currentUrl.includes(comp));
  }
  logOut() {
    localStorage.clear();
    alert('Logged Out Sucessfully');
    this.router.navigate(['/login']);
  }
 
}
