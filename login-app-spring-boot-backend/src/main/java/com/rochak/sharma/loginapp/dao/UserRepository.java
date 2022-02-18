package com.rochak.sharma.loginapp.dao;

import com.rochak.sharma.loginapp.model.UserClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "users", itemResourceRel = "user", path = "users")
public interface UserRepository extends JpaRepository<UserClass, Long> {
    public UserClass findByUsername(String username);
}
