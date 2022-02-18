package com.rochak.sharma.loginapp.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }
}
