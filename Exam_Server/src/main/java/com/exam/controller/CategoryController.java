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

import com.exam.Service.CategoryService;
import com.exam.entity.exam.Category;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	//add category
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<Category>addcategory(@RequestBody Category category){
		
		Category category1 = this.categoryService.addCategory(category);
		
		return ResponseEntity.ok(category1);
	}
	
	//get category
	
	@GetMapping("/{categoryId}")
	public Category getcategory(@PathVariable("categoryId") Long categoryId) {
		
		return this.categoryService.getCategory(categoryId);
	}
	
	// get all categories
	@GetMapping("/")
	public ResponseEntity<?> getcategory() {
		
		return ResponseEntity.ok(this.categoryService.getCategories());
	}

	//update category
	@PutMapping("/")
	public Category upateCategory(@RequestBody Category category) {
		return this.categoryService.updateCategory(category);
	}
	
	//delete
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
		this.categoryService.deleteCategory(categoryId);
	}
}
