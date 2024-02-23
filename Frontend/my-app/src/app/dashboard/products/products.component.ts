import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  show:boolean = true;
  products:any = [];
  productForm:FormGroup;
  options:any = 'Submit'
  selectedFile: File | null = null;

  constructor(private _products: ProductsService,private fb:FormBuilder) {
    this.productForm = this.fb.group({
      name:['', Validators.required],
      packSize:['', Validators.required],
      category:['', Validators.required],
      MRP:['', Validators.required],
      image:[''],
      status:['', Validators.required]
    })
   }

  ngOnInit() {
    this.reload()
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  
  submit(data:any){
    if(this.options == 'Submit') {
      console.log(data);
      this._products.createProducts(data).subscribe({
        next:(data) => {
          this.reload()
        },
        error: (e) => console.error(e)
      })
    }
    if(this.options == 'Edit') {
      console.log(data);
      this._products.updateProduct(data).subscribe({
        next:(data) => {
          this.reload()
        },
        error: (e) => console.error(e)
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
    this._products.getProducts().subscribe({
      next:(data) => {
        this.products = data;
        this.refresh()
      },
      error: (e) => console.error(e)
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
