package com.jcm.convite.security;

public record RegisterDto(String login, String password, UserRole role) {

}
