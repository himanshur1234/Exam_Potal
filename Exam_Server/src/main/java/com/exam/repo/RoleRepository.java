package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.exam.entity.Role;

@Component
public interface RoleRepository extends JpaRepository<Role, Long>{

}
