package com.example.models;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User extends AbstractEntity {

// Getting error about clashing IDs (maybe abstractentity provides
// one and User? Removing it seems to work and get the right ID
//    @Id
//    @GeneratedValue
//    private int id;

    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = false)
    @Valid
    private UserDetails userDetails;

    public User() {}

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public User(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

//    public int getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }

    public String getUsername() {
        return username;
    }

    // Static method to use the bcrypt dependency for encoding
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Instance method to use the bcrypt multi-step matcher (.equals is not enough)
    public boolean isMatchingPassword(String password) {

        return encoder.matches(password, pwHash);
    }

}