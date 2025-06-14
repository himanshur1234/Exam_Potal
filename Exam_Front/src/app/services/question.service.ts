import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }


  public getQuestionsOfQuiz(qid:number){
   return  this._http.get(`${baseUrl}/questions/quiz/all/${qid}`)
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/questions/`,question);
  }

  public deleteQuestion(quesId:number){
    return this._http.delete(`${baseUrl}/questions/${quesId}`);
  }

  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/questions/`,question);
  }

  // single question
  public getOneQuestion(quesId:number){
    return this._http.get(`${baseUrl}/questions/${quesId}`);
  }

}
