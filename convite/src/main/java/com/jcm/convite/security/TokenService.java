package com.jcm.convite.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.jcm.convite.Usuario;

@Service
public class TokenService {
	
	@Value("my-secret-key")
	private String secret;
	
	public String generateToken(Usuario usuario) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("auth-api")
					.withSubject(usuario.getLogin())
					.withExpiresAt(genExpirationDate())
					.sign(algorithm);
			return token;
		} catch (JWTCreationException e) {
			throw new RuntimeException("Error while generatin token",e);
		}
	}
	
	private Instant genExpirationDate() {
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	}

}
