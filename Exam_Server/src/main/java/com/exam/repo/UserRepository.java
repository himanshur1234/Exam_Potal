package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.exam.entity.User;

@Component
public interface UserRepository extends JpaRepository<User,Long> {

	public User findByUsername(String username); 

}
