package com.jcm.convite;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConviteRepository extends JpaRepository<Convite, Integer> {

	@Query(value = "select * from convite order by `nomeCliente` asc", nativeQuery = true)
	List<Convite> listaOrdenada();

}
