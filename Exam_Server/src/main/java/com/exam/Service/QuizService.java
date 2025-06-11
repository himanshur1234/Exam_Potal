package com.exam.Service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.entity.exam.Quiz;

@Service
public interface QuizService {

	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Set<Quiz> getQuizzes();
	
	public Quiz getQuiz(Long quizId);
	
	public void deleteQuiz(Long quizId);
}
