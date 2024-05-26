package com.jcm.convite.security;

public record RegisterDTO(String login, String password, UserRole role) {
}
