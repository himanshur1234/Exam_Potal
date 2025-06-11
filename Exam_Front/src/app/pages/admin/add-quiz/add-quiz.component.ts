import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {

constructor(private _cat:CategoryService,private _snak:MatSnackBar ,private _quiz:QuizService){}

ngOnInit():void{
  this._cat._categories().subscribe(
    (data:any)=>{
      this.categories=data;
      //console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!',"Error in loading data ",'error');

    }
  )
}

quizData={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid:'',
  },
}

categories=[{
  cid:23,
  title:"dummy",
}]

addQuiz(){
  // console.log(this.quizData);
  if(this.quizData.title.trim()=='' || this.quizData.title==null){
    this._snak.open("Title Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quizData.description.trim()=='' || this.quizData.description==null){
    this._snak.open("Description Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null){
    this._snak.open("MaxMarks Requied !!","",{
      duration:3000,
    });
    return;
  }
  if(this.quizData.numberOfQuestions.trim()=='' || this.quizData.numberOfQuestions==null){
    this._snak.open("Number of Questions Requied !!","",{
      duration:3000,
    });
    return;
  }
  if (!this.quizData.category || !this.quizData.category.cid) {
  this._snak.open("Category Required !!", "", {
    duration: 3000,
  });
  return;
}


// call server
this._quiz.addQuiz(this.quizData).subscribe(
  (data)=>{
    Swal.fire("Success","Quiz is added",'success');
    this.quizData={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:true,
  category:{
    cid:'',
  },
}
  },
(error)=>{
  Swal.fire("Error","Error on adding ",'error');
}
)


}
}
