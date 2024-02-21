import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  show:boolean = true;
  products:any = []
  productForm:FormGroup;

  constructor(private _products: ProductsService,private fb:FormBuilder) {
    this.productForm = this.fb.group({
      name:'',
      packSize:'',
      category:'',
      MRP:'',
      image:'',
      status:''
    })
   }

  ngOnInit() {
    this.reload()
  }
  
  submit(data:any){
    console.log(data);
    this._products.createProducts(data).subscribe(data => {
      console.log(data);
    })
  }

  delete(id:any){
    console.log(id);
    this._products.deleteProducts(id).subscribe(data => {
      console.log(data);
      this.reload();
    })
  }
  reload() {
    this._products.getProducts().subscribe(data => {
      this.products = data
    })
  }
  change(){
    this.show = !this.show
  }

}
