import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  show:boolean = true;
  category:any = [];
  categoryForm:FormGroup;
  options:any = 'Submit';

  constructor(private _category:CategoryService,private fb:FormBuilder,
    private _dialog:DialogService) { 
    this.categoryForm = this.fb.group({
      id:'',
      name:['', Validators.required],
      description:['', Validators.required],
      status:['', Validators.required],
    })
  }
  
  ngOnInit() {
    this.reload()
  }
  submit(data:any){
    if(this.categoryForm.valid) {
      if(this.options == 'Submit' ) {
      this._category.createCategory(data).subscribe({
        next:(data) => {
          this.reload()
        },
        error: (e) => console.error(e)
      })
    } 
    if(this.options == 'Edit') {
      console.log(data);
      this._category.updateCategory(data).subscribe({
        next:(data) => {
          this.reload()
        },
        error: (e) => console.error(e)
      })
    }
    this.show = true
    }
  }

  edit(data:any){
    this.show = false
    this.categoryForm = this.fb.group({
      id:data._id,
      name:data.name,
      description:data.description,
      status:data.status,
    })
    this.options = 'Edit'
  }

  delete(id:any){
    console.log(id);
    this._dialog.openConfirmDialog("Are you sure you want to delete ?","Delete")
    .afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this._category.deleteProducts(id).subscribe(data => {
        console.log(data);
        this.reload();
      })
      }
    })
  }

  reload() {
    this._category.getCategory().subscribe({
      next:(data) => {
        this.category = data;
        this.refresh()
      },
      error: (e) => console.error(e)
    })
  }
  refresh() {
    this.categoryForm = this.fb.group({
      name:'',
      description:'',
      status:'',
    })
  }
  change(){
    this.show = !this.show
    this.reload();
    this.options = 'Submit'
  }

}
