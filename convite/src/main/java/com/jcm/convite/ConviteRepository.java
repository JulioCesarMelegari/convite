package com.jcm.convite;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConviteRepository extends JpaRepository<Convite, Integer> {

	@Query(value = "select * from convite order by `nome_cliente` asc", nativeQuery = true)
	List<Convite> ListaOrdenada();
	
	@Query(value = "select * from convite where pago=true order by `nome_cliente` asc", nativeQuery = true)
	List<Convite> ConvitesPagos();
	
	@Query(value = "select * from convite where pago=false order by `nome_cliente` asc", nativeQuery = true)
	List<Convite> ConvitesPendentes();
	
	@Query(value = "select * from convite where entregue=false order by `nome_cliente` asc", nativeQuery = true)
	List<Convite> ConvitesNaoEntreges();
	
	@Query(value = "select * from convite where entregue=true order by `nome_cliente` asc", nativeQuery = true)
	List<Convite> ConvitesEntreges();

}
