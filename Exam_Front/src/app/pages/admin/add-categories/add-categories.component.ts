import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  standalone: false,
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
 
  constructor(private category_: CategoryService,private _snak:MatSnackBar){}
  category={
    title:'',
    description:'',
  }

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null){
      this._snak.open("Title required!!",'',{duration:2000});
      return;
    }

    this.category_.addcategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("success!!","category added succesfully","success");
      },
      (Error)=>{
        Swal.fire("Error!!","server error","error");
      }
    )
    
  }

  clear(){
    this.category.title='';
    this.category.description='';
  }
}
