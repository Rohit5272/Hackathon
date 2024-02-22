import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  show:boolean = true;
  category:any = []
  categoryForm:FormGroup;
  options:any = 'Submit'

  constructor(private _category:CategoryService,private fb:FormBuilder) { 
    this.categoryForm = this.fb.group({
      id:'',
      name:'',
      description:'',
      status:'',
    })
  }
  
  ngOnInit() {
    this.reload()
  }
  submit(data:any){
    if(this.options == 'Submit') {
      this._category.createCategory(data).subscribe(data => {
    })
    } else {
      console.log(data);
      this._category.updateCategory(data).subscribe(data => {
        console.log(data);
      })
    }
    this.reload();
    this.show = true
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
    this._category.deleteProducts(id).subscribe(data => {
      console.log(data);
      this.reload();
    })
  }
  reload() {
    this._category.getCategory().subscribe(data => {
      this.category = data
      this.refresh()
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
