package com.icounseling.web.rest.vm;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * View Model object for storing a user's credentials.
 */
public class LoginVM {

    @NotNull
    @Digits(integer=11, fraction=2)
    @Size(min = 11, max = 16)
    private String username;

    @NotNull
    @Size(min = 4, max = 100)
    private String password;

    private Boolean rememberMe;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(Boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

    @Override
    public String toString() {
        return "LoginVM{" +
            "username='" + username + '\'' +
            ", rememberMe=" + rememberMe +
            '}';
    }
}
