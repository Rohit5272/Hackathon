import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DialogService } from 'src/app/service/dialog.service';
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
  category:any = []
  selectedFileName: string = '';

  constructor(private _products: ProductsService,private fb:FormBuilder,private _category:CategoryService,
    private _dialog:DialogService) {
    this.productForm = this.fb.group({
      name:['',Validators.required],
      image:[null,Validators.required],
      packSize:['', Validators.required],
      category:['', Validators.required],
      MRP:['', Validators.required],
      status:['', Validators.required]
    })
   }

  ngOnInit() {
    this.reload()
    this.getCategory()
  }

  preventDefaultSubmit(event: Event) {
    event.preventDefault();
  }
  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      image:file
    })
    this.productForm.get('image').updateValueAndValidity()
    this.selectedFileName = file ? file.name : '';
  }
  
  submit(data:any){
    if(this.productForm.valid) {
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
        // console.log(data);
        const { id, name, image, category,packSize, MRP, status } = data;
        const updateData = {id,name,image,category,packSize,MRP,status}
        console.log(updateData);
        this._products.updateProduct(updateData).subscribe({
          next:(data) => {
            this.reload()
          },
          error: (e) => console.error(e)
        })
      }
      this.reload();
      this.show = true;
      this.selectedFileName = '';
    }
  }

  edit(data:any){
    this.show = false
    this.productForm = this.fb.group({
      id:data._id,
      name:data.name,
      packSize:data.packSize,
      category:data.category.name,
      MRP:data.MRP,
      image:data.image,
      status:data.status
    })
    this.options = 'Edit'
  }

  delete(id:any){
    console.log(id);
    this._dialog.openConfirmDialog("Are you sure you want to delete ?","Delete")
    .afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this._products.deleteProducts(id).subscribe(data => {
        console.log(data);
        this.reload();
      })
      }
    })
    
  }
  reload() {
    this._products.getProducts().subscribe({
      next:(data) => {
        console.log(data);
        this.products = data;
        this.refresh()
        this.getCategory()
      },
      error: (e) => console.error(e)
    })
  }
  refresh() {
    this.productForm.reset()
  }
  change(){
    this.show = !this.show;
    this.reload();
    this.options = 'Submit'
  }
  getCategory(){
    this._category.getCategory().subscribe({
      next:(data) => {
        // console.log(data);
        this.category = data
      },
      error: (e) => console.log(e)
    })
  }

}
