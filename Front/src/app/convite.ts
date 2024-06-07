export class Convite {
  id!:number|null;
  nomeEvento!: String;
  nomeCliente!: String;
  usuarioCadastro!: String;
  usuarioPagamento!: String;
  usuarioEntrega!: String;
  nomeVendedor!: String;
  quantidade!: number;
  dataPagamento!: Date;
  dataEntrega!: Date;
  pago!: boolean;
  entregue!: boolean;
  observacao!: String;
}
