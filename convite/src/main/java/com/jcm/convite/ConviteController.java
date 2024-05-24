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
	
	@PostMapping("/cadastrar")
	public ResponseEntity<Convite> cadastrar(@RequestBody FormCreate formCreate){
		var convite = new Convite();
		BeanUtils.copyProperties(formCreate, convite);
		repository.save(convite);
		return ResponseEntity.status(HttpStatus.CREATED).body(convite);	
	}
	
	@PutMapping("/pagar/{id}")
	public ResponseEntity<Convite> receber(@PathVariable Integer id, @RequestBody FormRecebiment formRecebiment){
		var convite = repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Convite não encontrado"));
		BeanUtils.copyProperties(formRecebiment, convite);
		repository.save(convite);
		return ResponseEntity.status(HttpStatus.CREATED).body(convite);	
	}
	
	@PutMapping("/cadastrar/{id}")
	public ResponseEntity<Convite> updateCadastrar(@PathVariable Integer id, @RequestBody FormCreate formCreate){
		var convite = repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Convite não encontrado"));
		BeanUtils.copyProperties(formCreate, convite);
		repository.save(convite);
		return ResponseEntity.status(HttpStatus.OK).body(convite);
	}
	
	@GetMapping()
	public ResponseEntity<List<Convite>> listarCadastrados(){
		List<Convite> list = repository.ListaOrdenada();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/pendentes")
	public ResponseEntity<List<Convite>> listarPendentes(){
		List<Convite> list = repository.ConvitesPendentes();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/pagos")
	public ResponseEntity<List<Convite>> listarPagos(){
		List<Convite> list = repository.ConvitesPagos();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/naoentregues")
	public ResponseEntity<List<Convite>> listarNaoEntregues(){
		List<Convite> list = repository.ConvitesNaoEntreges();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/entregues")
	public ResponseEntity<List<Convite>> listarEntregues(){
		List<Convite> list = repository.ConvitesEntreges();
		return ResponseEntity.ok(list);
	}
	
	@DeleteMapping("{id}")
	public void deletar(@PathVariable Integer id){
		var convite = new Convite();
		
		if(repository.findById(id) !=null) {
			convite = repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Convite não encontrado"));	
		}
		if(convite.isPago()) {
			ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}else {
			repository.deleteById(id);
		}
			ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
	}
	


}
