import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  constructor(private _route:ActivatedRoute,private _ques:QuestionService){}

  qId:number=-1;
  title="";
  question={
    quiz:{
     qid:-1,
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  ngOnInit():void{
    this.qId=this._route.snapshot.params['qid'];
    this.title=this._route.snapshot.params['title'];
   this.question.quiz['qid']=this.qId;
  }

  formSumbit(){
    
    if(this.question.content.trim()=='' || this.question.content==null)return;
    if(this.question.option1.trim()=='' || this.question.option1==null)return;
    if(this.question.option2.trim()=='' || this.question.option2==null)return;
    if(this.question.answer.trim()=='' || this.question.answer==null)return;
    this._ques.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('success',"Question Added Successfully",'success');

        this.question.content='';
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4='',
        this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error',"Error in adding Question",'error');
      }
    )
    
  }

}
