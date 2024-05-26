package com.jcm.convite.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jcm.convite.Usuario;
import com.jcm.convite.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UsuarioRepository repository;
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationDTO> login(@RequestBody @Valid AuthenticationDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
		@SuppressWarnings("unused")
		var auth = this.authenticationManager.authenticate(usernamePassword);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/register")
	public ResponseEntity<RegisterDto> register(@RequestBody @Valid RegisterDto data){
		if(this.repository.findByLogin(data.login()) !=null) 
			return ResponseEntity.badRequest().build();	
		String encryptedPassWord = new BCryptPasswordEncoder().encode(data.password());
		Usuario newUsuario = new Usuario(data.login(), encryptedPassWord, data.role());
		this.repository.save(newUsuario);
		return ResponseEntity.ok().build();
	}
}
