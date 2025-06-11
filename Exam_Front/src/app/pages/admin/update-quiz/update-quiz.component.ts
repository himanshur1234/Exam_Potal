import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  standalone: false,
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _snak:MatSnackBar ,private _router:Router){}

  qid=-1;
  quiz:any;
  categories:any;
  ngOnInit():void{
    this.qid=this._route.snapshot.params['qid'];
    //alert(this.qid);
    this._quiz.getquiz(this.qid).subscribe(
      (data)=>{
        this.quiz=data;
        //console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._cat._categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        alert("Error in loading categories");
      }
    )
  }

  
  public updateData(){
    //validation

    if(this.quiz.title.trim()=='' || this.quiz.title==null){
    this._snak.open("Title Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quiz.description.trim()=='' || this.quiz.description==null){
    this._snak.open("Description Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks==null){
    this._snak.open("MaxMarks Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quiz.numberOfQuestions.trim()=='' || this.quiz.numberOfQuestions==null){
    this._snak.open("Number of Questions Requied !!","",{
      duration:3000,
    });
    return;
  }
  if (!this.quiz.category || !this.quiz.category.cid) {
  this._snak.open("Category Required !!", "", {
    duration: 3000,
  });
  return;
}


this._quiz.updateQuiz(this.quiz).subscribe(
  (data)=>{
    Swal.fire('Success!!',"Data is Updated ",'success').then(()=>{
      this._router.navigate(['/admin/quizzes']);
    });
    
    
  },(error)=>{
    Swal.fire('Error',"Error in updating quiz",'error');
  }
)


  }
}
