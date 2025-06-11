package com.exam.Service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;

@Service
public interface QuestionService {

	public Questions addQuestion(Questions questions);
	
	public Questions updateQuestion(Questions questions);
	
	public Set<Questions>getQuestions();
	
	public Questions getQuestion(Long questionId);
	
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz);
	
	public void deleteQuestion(Long quesId);
	
	
}
