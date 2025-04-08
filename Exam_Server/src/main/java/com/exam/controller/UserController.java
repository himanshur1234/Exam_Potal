package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.Service.UserService;
import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userservice;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	// creating user
	@PostMapping
	public User CreateUser(@RequestBody User user) throws Exception {
		Set<UserRole> roles=new HashSet<>();
		
		user.setProfile("default.png");
		
		//encoding password wth bcrypt
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Role role=new Role();
		role.setRoleId(45l);
		role.setRoleName("NORMAL");
		
		UserRole userRole=new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		
		roles.add(userRole);
		
		return this.userservice.createUser(user,roles);
	}
	
	
	//get user data
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		
		return this.userservice.getUser(username);
		
	}
	
	//delete user
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId) {
		
		this.userservice.deleteUser(userId);
	}
	
	
	// update user
	@PatchMapping
	public User updateUser(@RequestBody User user) throws Exception {
		
		return this.userservice.updateUser(user);
		
	}
}
