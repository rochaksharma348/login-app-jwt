package com.rochak.sharma.loginapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomersController {
    @GetMapping("/customers")
    public String helloWorld() {
        return "Hello, World!";
    }
}
