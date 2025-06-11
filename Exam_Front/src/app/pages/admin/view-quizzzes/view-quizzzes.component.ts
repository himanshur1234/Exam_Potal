import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-quizzzes',
  standalone: false,
  templateUrl: './view-quizzzes.component.html',
  styleUrl: './view-quizzzes.component.css'
})
export class ViewQuizzzesComponent {
constructor(private _quiz:QuizService){}

ngOnInit():void{

  this._quiz.quizzes().subscribe(
    (data:any)=>{
      this.quizzes=data;
      //console.log(this.quizzes);
    
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error..!',"Error in loading data..",'error');
    }
  )
}

deleteQuiz(qid: number): void{
  Swal.fire({
    'icon':'info',
    'title': "Are you sure ?",
    confirmButtonText: 'Delete',
    showCancelButton:true,
  }).then((result)=>{
    if(result.isConfirmed)
    {
      this._quiz.deleteQuiz(qid).subscribe(
   (data)=> {
    this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
    Swal.fire("success","Quiz deleted succesfully",'success')},
   (error)=>Swal.fire("Error","Quiz can't be deleted",'error')
  )
    }
  })
}


   quizzes: any[] = [];
}

