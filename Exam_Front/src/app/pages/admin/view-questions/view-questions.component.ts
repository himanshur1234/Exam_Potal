import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-questions',
  standalone: false,
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent {

  constructor(private _route:ActivatedRoute,private _question:QuestionService){}

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
        console.log(data);
      },(error)=>{
        console.log(error);
      }
    )
  }

}
