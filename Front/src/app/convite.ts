export class Convite {
  id!:number|null;
  nomeEvento!: string;
  nomeCliente!: string;
  usuarioCadastro!: string;
  usuarioPagamento!: string;
  usuarioEntrega!: string;
  nomeVendedor!: string;
  quantidade!: number;
  valorUnitario!: number;
  dataPagamento!: Date;
  dataEntrega!: Date;
  pago!: boolean;
  entregue!: boolean;
  observacao!: string;
}
