package com.jcm.convite;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
public class Convite implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_convite")
	private Integer id;
	
	@Column(length = 50, nullable = false)
	private String nomeCliente;
	
	@Column(length = 50, nullable = false)
	private String usuarioCadastro;
	
	@Column(length = 50)
	private String usuarioPagamento;
	
	@Column(length = 50)
	private String nomeVendedor;
	
	@Column(length = 10)
	private int quantidade;
	
	@JsonFormat(pattern = "dd-MM-yyy")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(iso=ISO.DATE,pattern = "dd-MM-yyy")
	private LocalDate dataPagamento;

	@Column(length = 5)
	private boolean pago = false;
	
	@Column(length = 5)
	private boolean entregue = false;
	
	@Column(length = 50)
	private String observacaoCadastro;
	
	@Column(length = 50)
	private String observacaoPagamento;

}
