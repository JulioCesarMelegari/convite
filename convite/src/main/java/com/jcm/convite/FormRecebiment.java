package com.jcm.convite;

import java.time.LocalDate;

public record FormRecebiment(
		LocalDate dataPagamento,
		boolean pago,
		boolean entregue,
		String usuarioPagamento,
		String observacaoPagamento
		) {

}
