import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  standalone: false,
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
constructor(private _cat:CategoryService,private _route:ActivatedRoute,private _snak:MatSnackBar,private _rouetes:Router){}
  cid=-1;
  category:any;
  ngOnInit():void{
    this.cid=this._route.snapshot.params['cid'];
    //alert(this.cid);

    this._cat.getCategory(this.cid).subscribe(
      (data)=>{
        this.category=data;
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    )
  }


  public updateData(){
    //validation
    if(this.category.title.trim()==''|| this.category.title==null){
      this._snak.open("Title is Required!!","",{
        duration:3000,
      });
      return;
    }

     if(this.category.description.trim()==''|| this.category.description==null){
      this._snak.open("Description is Required!!","",{
        duration:3000,
      });
      return;
    }

    this._cat.updatecategory(this.category).subscribe(
      (data)=>{
        Swal.fire('Success!',"Data is Updated",'success');
        this._rouetes.navigate(['/admin/categories']);
      },(error)=>{
        Swal.fire('Error',"Error in updating the category",'error');
      }
    )


  }

}
