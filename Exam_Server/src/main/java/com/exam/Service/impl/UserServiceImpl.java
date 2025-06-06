package com.exam.Service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.Service.UserService;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	
	//user creation
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception  {
		
		User local=this.userRepository.findByUsername(user.getUsername());
		if(local!=null)
		{
			System.out.println("user is already there");
			throw new Exception("user already present !!");
		}else {

			// save the roles in role table
			for(UserRole u:userRoles) {
				roleRepository.save(u.getRole());
			}
			// setting roles to the user
			user.getUserRoles().addAll(userRoles);
			// saving user
			local =this.userRepository.save(user);
		}
		return local;
	}

	
	// getting user by username
	@Override
	public User getUser(String UserName) {
		return this.userRepository.findByUsername(UserName);
		
	}


	
	//deleting user based on userName
	@Override
	public String deleteUser(Long userId) {
		
		this.userRepository.deleteById(userId);
		return null;
	}

	
	
	//update user 
	@Override
	public User updateUser(User user) throws Exception {
		
		User local=this.userRepository.findByUsername(user.getUsername());
		if(local==null) {
			System.out.println("user not present");
			throw new Exception("user not found");
		}else {
			if(user.getEmail()!=null)local.setEmail(user.getEmail());
			if(user.getFirstName()!=null)local.setFirstName(user.getFirstName());
			if(user.getLastName()!=null)local.setLastName(user.getLastName());
			if(user.getPassword()!=null)local.setPassword(user.getPassword());
			if(user.getPhone()!=null)local.setPhone(user.getPhone());
			if(user.getProfile()!=null)local.setProfile(user.getProfile());
			
		}
		
		return userRepository.save(local);
	}

}
