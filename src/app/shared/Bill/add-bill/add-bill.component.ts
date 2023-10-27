import { Component, OnInit } from '@angular/core';
// import { ServicesService } from 'src/app/core/services.service';
import { ServicesService } from'../../../core/services.service'
interface Product {
  productName: string;
  quantity: any;
  price: any;
}

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillComponent {
  selectedItem: any;
  selectedVendor: any;
  constructor(public service: ServicesService) {}
  vendor: any[] = [];
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.service.getProducts().subscribe((data) => {
      this.service.prodData = data;
      console.log('this is product data', this.service.prodData);
    });

    this.service.getEmployees().subscribe((data) => {
      this.service.empData = data;

      this.vendor = data;

      console.log('vedors', this.vendor);
    });
  }

  vendorName = '';
  customerName = '';
  billDate = '';
  selectedProduct: any;
  selectedProducts: Product[] = []; // Initialize as an empty array

  gstPercentage = 0;
  discountPercentage = 0;
  extraChargesPercentage = 0;
  purchaseNote: any;
  grandTotal: any = this.calculateTotal();

  addProduct(data: any) {
    if (this.selectedProduct) {
      const matchingProduct = this.service.prodData.find(
        (serviceProduct) => serviceProduct.product_name === data
      );

      const newProduct: Product = {
        productName: this.selectedProduct,
        quantity: 1,
        price: matchingProduct.price.product_price,
      };
      this.selectedProducts.push(newProduct);
      console.log(this.selectedProducts);
      this.selectedProduct = [];
    }
  }
  gst: any;
  extraChargesd: any;
  discount: any;
  calculateTotal(): number {
    let total = 0;

    for (const product of this.selectedProducts) {
      total += product.price * product.quantity;
    }
    this.gst = (total * this.gstPercentage) / 100;
    this.discount = (total * this.discountPercentage) / 100;
    this.extraChargesd = (total * this.extraChargesPercentage) / 100;
    return total + this.gst + this.extraChargesd - this.discount;
  }

  total(): number {
    let total = 0;
    for (const product of this.selectedProducts) {
      total += product.price;
    }
    return total;
  }
  extraCharges() {
    return this.extraChargesd;
  }

  discountFunction(): number {
    return this.discount;
  }

  productMatchesServiceData(): boolean {
    const matchingProduct = this.service.prodData.find(
      (serviceProduct) => serviceProduct.product_name === this.selectedProduct
    );
    console.log(matchingProduct);
    return !!matchingProduct;
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }
  finalData: any;
  submitForm() {
    // Handle form submission here
    this.finalData = {
      emplyeeId: this.selectedVendor,
      customerName: this.customerName,
      billDate: this.billDate,
      selectedProducts: this.selectedProducts,
      gstPercentage: this.gstPercentage,
      discountPercentage: this.discountPercentage,
      extraChargesPercentage: this.extraChargesPercentage,
      grandTotal: this.calculateTotal(),
      purchaseNote: this.purchaseNote,
    };
    console.log('Form submitted', this.finalData);
  }
}
