import { Component } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  standalone: false,
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent {

  constructor(private _Question:QuestionService,private _route:ActivatedRoute,private _routes:Router){}
  question:any;
  quesId=-1;
  qId=-1;
  qTitle:undefined;

  ngOnInit():void{
    this.quesId=this._route.snapshot.params['quesId'];
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._Question.getOneQuestion(this.quesId).subscribe(
      (data)=>{
        this.question=data;
        console.log(this.question);
      }
    );
    
    
  }

  submit():void{
    if(this.question.content.trim()=='' || this.question.content==null)return;
    if(this.question.option1.trim()=='' || this.question.option1==null)return;
    if(this.question.option2.trim()=='' || this.question.option2==null)return;
    if(this.question.answer.trim()=='' || this.question.answer==null)return;

    this._Question.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success',"Question Updated Succesfully",'success');
       this._routes.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);
      },(error)=>{
        Swal.fire('Error',"Error in Updating",'error');
      }
    );
  }


}
