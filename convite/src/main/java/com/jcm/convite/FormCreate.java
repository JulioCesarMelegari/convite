package com.jcm.convite;

public record FormCreate(
		String nomeCliente,
		String nomeVendedor,
		int quantidade,
		String usuarioCadastro,
		String observacaoCadastro
		) {

}
