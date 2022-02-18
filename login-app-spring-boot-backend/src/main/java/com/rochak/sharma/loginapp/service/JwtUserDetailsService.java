package com.rochak.sharma.loginapp.service;

import com.rochak.sharma.loginapp.dao.UserRepository;
import com.rochak.sharma.loginapp.model.UserClass;
import com.rochak.sharma.loginapp.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserClass userClass = userRepository.findByUsername(username);
        if (userClass != null) {
            System.out.println("Username: " + userClass.getUsername()  + ", Password: " + userClass.getPassword());
            return new User(userClass.getUsername(), userClass.getPassword(), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User with name: " + username + " not found");
        }
    }

    @Transactional
    public UserClass saveUser(UserDto userDto) {

        UserClass userClass = new UserClass();
        userClass.setFirstName(userDto.getFirstName());
        userClass.setLastName(userDto.getLastName());
        userClass.setEmail(userDto.getEmail());
        userClass.setPassword(bcryptPasswordEncoder.encode(userDto.getPassword()));
        userClass.setUsername(userDto.getUsername());

        return userRepository.save(userClass);
    }
}
