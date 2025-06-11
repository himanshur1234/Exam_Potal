import { Component,OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-categories',
  standalone: false,
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  categories: any = [];

  constructor (private category:CategoryService,private dialog:MatDialog){
  }
  
  ngOnInit():void{
    this.categories=this.category._categories().subscribe((data:any)=>
    {
      this.categories=data;
      console.log(this.categories);
    },
    (Error)=>{
      console.log(Error);
      Swal.fire("Error!!","Error in loading data","error")
    }
    )
  }

  // openEditDialog(category: any): void {
  //   const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
  //     width: '500px',
  //     data: { ...category }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.categoryService.updateCategory(result).subscribe({
  //         next: () => {
  //           Swal.fire('Success', 'Category updated successfully', 'success');
  //           this.loadCategories();
  //         },
  //         error: (error) => {
  //           console.error('Error updating category:', error);
  //           Swal.fire('Error', 'Failed to update category', 'error');
  //         }
  //       });
  //     }
  //   });
  // }




  // delete category 
  deleteCategory(cid:number):void{
    Swal.fire({
      'icon':'info',
      'title':'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.category.deletecategory(cid).subscribe(
          (data)=>{
            this.categories=this.categories.filter((category:any)=>category.cid!=cid);
            Swal.fire('Success','Category Deleted succesfully','success')
          },
          (error)=>{
            Swal.fire('Error',"Category can't be Deleted",'error');
          }
        )
      }
    })
  }
}
