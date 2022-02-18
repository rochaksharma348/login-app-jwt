package com.rochak.sharma.loginapp.model;

import lombok.Data;

@Data
public class UserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
}
