package com.jcm.convite;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping()
@CrossOrigin("http://localhost:4203")
public class ConviteController {
	
	@Autowired
	private ConviteRepository repository;
	
	@PostMapping
	public ResponseEntity<Convite> salvar(@RequestBody Convite convite){
		repository.save(convite);
		return ResponseEntity.status(HttpStatus.CREATED).body(convite);	
	}
	
	@GetMapping
	public ResponseEntity<List<Convite>> listar(){
		List<Convite> list = repository.listaOrdenada();
		return ResponseEntity.ok(list);
	}
	
	@DeleteMapping("{id}")
	public void deletar(@PathVariable Integer id){
		if(repository.findById(id) !=null) {
			repository.deleteById(id);
		}
			ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Convite> update(@PathVariable Integer id, @RequestBody Convite conviteUpdate){
		var convite = repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Convite não encontrado"));
		BeanUtils.copyProperties(convite, conviteUpdate);
		repository.save(convite);
		return ResponseEntity.status(HttpStatus.OK).body(convite);
	}

}
