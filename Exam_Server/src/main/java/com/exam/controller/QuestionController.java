package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.Service.QuestionService;
import com.exam.Service.QuizService;
import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@CrossOrigin("*")
@RequestMapping("/questions")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	// add question
	@PostMapping("/")
	public ResponseEntity<Questions> add(@RequestBody Questions questions){
		
		return ResponseEntity.ok(this.questionService.addQuestion(questions));
	}
	
	// update question
	@PutMapping("/")
	public ResponseEntity<Questions> update(@RequestBody Questions questions){
		
		return ResponseEntity.ok(this.questionService.updateQuestion(questions));
	}
	
	// get all questions of any quiz
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?>getQuestionOfquiz(@PathVariable("qid") Long qid){
//		Quiz quiz=new Quiz();
//		quiz.setQid(qid);
//		Set<Questions> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//		
//		return ResponseEntity.ok(questionsOfQuiz);
		
		Quiz quiz = this.quizService.getQuiz(qid);
		
		Set<Questions> questions = quiz.getQuestions();
		
		ArrayList list=new ArrayList(questions);
		
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())) {
			list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
		}
		
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
		
	}
	
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?>getQuestionOfquizAdmin(@PathVariable("qid") Long qid){
	Quiz quiz=new Quiz();
	quiz.setQid(qid);
	Set<Questions> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
		
		return ResponseEntity.ok(questionsOfQuiz);
		
	
		
	}
	
	// get single question
	@GetMapping("/{quesId}")
	public Questions getQuestion(@PathVariable("quesId") Long quesId) {
		
		return this.questionService.getQuestion(quesId);
	}
	
	
	// delete
	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") Long quesId) {
		
		 this.questionService.deleteQuestion(quesId);
	}
	
	

}
