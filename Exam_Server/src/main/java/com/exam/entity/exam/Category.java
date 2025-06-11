package com.exam.entity.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
 
@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long cid;
	
	private String title;
	
	private String description;

	
	//reationship
	@OneToMany(mappedBy = "category",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JsonIgnore // to avoid cycyclic loop
	private Set<Quiz>quizzes=new LinkedHashSet<>();
	
	public Category() {
		
	}
	public Category( String title, String description) {
		super();
		this.title = title;
		this.description = description;
	}



	public long getCid() {
		return cid;
	}



	public void setCid(long cid) {
		this.cid = cid;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public Set<Quiz> getQuizzes() {
		return quizzes;
	}



	public void setQuizzes(Set<Quiz> quizzes) {
		this.quizzes = quizzes;
	}
	
	
	
	
	
	

}
