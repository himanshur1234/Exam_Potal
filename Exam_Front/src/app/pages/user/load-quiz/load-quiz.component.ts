import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  standalone: false,
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent {
constructor(private _route:ActivatedRoute,private _quiz:QuizService){}

catId:number=-1;
quizzes:any;
ngOnInit():void{
  
  this._route.params.subscribe((params)=>{
   this.catId=this._route.snapshot.params['catid'];
    if(this.catId==0){
    console.log("load all the quiz");
    this._quiz.getActiveQuizzes().subscribe(
      (data)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },(error)=>{
        console.log(error);
        alert("Error in loading quizzes")
      }
    )

  }else{
    console.log("load specific quiz")
   this._quiz.getActiveQUizOfCategory(this.catId).subscribe(
    (data)=>{
      this.quizzes=data;
    },(error)=>{
      alert("Error in loading data");
    }
   )
  }
  })
 

}
}
