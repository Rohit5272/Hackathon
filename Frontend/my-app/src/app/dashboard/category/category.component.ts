import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  show:boolean = true;
  category:any = []

  constructor(private _category:CategoryService) { }
  
  ngOnInit() {
    this.reload()
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
      console.log(data);
      this.category = data
    })
  }

  change(){
    this.show = !this.show
  }

}
