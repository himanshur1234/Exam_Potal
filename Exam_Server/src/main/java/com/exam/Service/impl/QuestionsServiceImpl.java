package com.exam.Service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Service.QuestionService;
import com.exam.entity.exam.Questions;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuestionRepository;

@Service
public class QuestionsServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;
	@Override
	public Questions addQuestion(Questions questions) {
		// TODO Auto-generated method stub
		return this.questionRepository.save(questions);
	}

	@Override
	public Questions updateQuestion(Questions questions) {
		// TODO Auto-generated method stub
		return this.questionRepository.save(questions);
	}

	@Override
	public Set<Questions> getQuestions() {
		// TODO Auto-generated method stub
		return new HashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Questions getQuestion(Long questionId) {
		// TODO Auto-generated method stub
		return this.questionRepository.findById(questionId).get();
	}

	@Override
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long quesId) {

		Questions qs=new Questions();
		qs.setQuesId(quesId);
		this.questionRepository.delete(qs);
	}

}
