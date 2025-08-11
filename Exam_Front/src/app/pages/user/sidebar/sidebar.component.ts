import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  categories:any;
  constructor(private _cat:CategoryService,private _snak:MatSnackBar){}

  ngOnInit():void{
    this._cat._categories().subscribe(
      (data)=>{
        this.categories=data;
      },(error)=>{
        this._snak.open("Error in loading categories",'',{
          duration:3000,
        });
      }
    )
  }

}
