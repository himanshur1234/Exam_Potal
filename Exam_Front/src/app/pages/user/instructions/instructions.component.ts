import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  standalone: false,
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {
  qid:number=-1;
  quiz:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router){}

  ngOnInit():void{
    this.qid= this._route.snapshot.params['qid'];

    this._quiz.getquiz(this.qid).subscribe(
      (data)=>{
        this.quiz=data;
      },(error)=>{
        console.log(error);
        alert("Error in loading quiz data");
      }
    )
  }

  startQuiz(){
   Swal.fire({
  title: "Do you want to Start the Quiz?",
  showCancelButton: true,
  confirmButtonText: "Start",
  icon:'info'
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    this._router.navigate(['/start/'+this.qid]);
  } 
});

  }

}
