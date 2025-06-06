package com.exam.Service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;

@Service
public interface UserService {

	// create user
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	
	//get user by username
	
	public User getUser(String UserName);
	
	//delete user by usrename
	public String deleteUser(Long userId);
	
	//update user 
	public User updateUser(User user) throws Exception;
}
