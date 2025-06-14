import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  standalone: false,
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent {

  constructor(private _route:ActivatedRoute,private _question:QuestionService ,private _routes:Router){}

  qId=-1;
  qTitle:undefined;
  questions:any;
  ngOnInit():void{

    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    // console.log(this.qId);
    // console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        //console.log(data);
      },(error)=>{
        console.log(error);
      }
    )
  }

  delete(quesId:number):void{
    
    Swal.fire({
      'icon':'info',
      'title':'Are You Sure?',
      cancelButtonText:'Cancel',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe(
          (data)=>{
            this.questions=this.questions.filter((questions:any)=>questions.quesId!=quesId);
            Swal.fire('success','Question deleted suceesfully','success');
          },(error)=>{
            Swal.fire('Error',"Question can't be deleted",'error');
          }
        )
      }
    
    })
  }


  
}
