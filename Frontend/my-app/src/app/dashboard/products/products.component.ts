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
  options:any = 'Submit'

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
    if(this.options == 'Submit') {
      this._products.createProducts(data).subscribe(data => {
      console.log(data);
    })
    } else {
      console.log(data);
      this._products.updateProduct(data).subscribe(data => {
        console.log(data);
      })
    }
    this.reload();
    this.show = true
  }

  edit(data:any){
    this.show = false
    this.productForm = this.fb.group({
      id:data._id,
      name:data.name,
      packSize:data.packSize,
      category:data.category,
      MRP:data.MRP,
      image:data.image,
      status:data.status
    })
    this.options = 'Edit'
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
      this.products = data;
      this.refresh()
    })
  }
  refresh() {
    this.productForm = this.fb.group({
      name:'',
      packSize:'',
      category:'',
      MRP:'',
      image:'',
      status:''
    })
  }
  change(){
    this.show = !this.show;
    this.reload();
    this.options = 'Submit'
  }

}
