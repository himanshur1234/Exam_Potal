package com.exam.entity;

public class JwtRequest {

	private String username;
	private String password;
	
	public JwtRequest(String usrname, String password) {
		super();
		this.username = usrname;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String usrname) {
		this.username = usrname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
