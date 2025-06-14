package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.Service.QuizService;
import com.exam.entity.exam.Quiz;


@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	// add quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> add(@RequestBody Quiz quiz){
		

		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//update quiz
	
	@PutMapping("/")
	public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
		

		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	//get quiz
	
	@GetMapping("/")
	public ResponseEntity<?> getQuizes(){
		
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable("quizId") Long quizId) {

		return this.quizService.getQuiz(quizId);
	}
	
	// delete quiz
	
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable("quizId") Long quizId) {
		
		this.quizService.deleteQuiz(quizId);
	}
	

}
