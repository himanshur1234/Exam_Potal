import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: false,
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']  // ✅ FIXED typo from "styleUrl" to "styleUrls"
})
export class StartComponent implements OnInit {
  qid: number = -1;
  question: any;
  marksGot: number = 0;
  correctAnswer: number = 0;
  attempted: number = 0;
  isSubmit: boolean = false;
  timer: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private platformLocation: PlatformLocation,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.preventBackButton();

    this._question.getQuestion(this.qid).subscribe(
      (data) => {
        this.question = data;
        this.timer = this.question.length * 2 * 60;
        this.question.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        this.startTimer();  // ✅ Moved inside success callback
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading the Questions', 'error');
      }
    );
  }

  preventBackButton(): void {
    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz(): void {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
        this.isSubmit = true;
        Swal.fire('Submitted', 'You have submitted the quiz!', 'success');
        console.log('Marks:', this.marksGot);
        console.log('Correct:', this.correctAnswer);
        console.log('Attempted:', this.attempted);
      }
    });
  }

  startTimer(): void {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime(): string {
    const mm = Math.floor(this.timer / 60);
    const ss = this.timer % 60;
    const formattedMM = mm.toString().padStart(2, '0');
    const formattedSS = ss.toString().padStart(2, '0');
    return `${formattedMM} min: ${formattedSS} sec`;
  }

  evalQuiz(): void {
    let totalQuestions = this.question.length;
    let marksPerQuestion = this.question[0]?.quiz?.maxMarks / totalQuestions || 1;

    this.question.forEach((q: any) => {
      if (q.givenAnswer.trim() !== '') {
        this.attempted++;
      }
      if (q.givenAnswer.trim() === q.answer.trim()) {
        this.correctAnswer++;
        this.marksGot += marksPerQuestion;
      }
    });

    this.isSubmit = true;
  }
}
