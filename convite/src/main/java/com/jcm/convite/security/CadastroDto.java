package com.jcm.convite.security;

public record CadastroDto(String login, String password, UserRole role) {
}
