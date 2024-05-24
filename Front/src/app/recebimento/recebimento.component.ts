import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { ConviteService } from '../convite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormPagamento } from '../formPagamento';
import { Convite } from '../convite';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})
export class RecebimentoComponent implements OnInit {

  formularioPagamento: FormGroup;
  success: boolean = false;

  conviteEdit: Convite;

  pagamento: FormPagamento;

  usuario: Usuario;
  idParam: any;

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.pagamento = new FormPagamento();
    this.conviteEdit = new Convite();
    this.usuario = new Usuario();
    this.usuario.nome = 'julio';
    this.formularioPagamento = this.formBuilder.group({
      usuarioPagamento: [this.usuario.nome],
      dataPagamento: ['', Validators.required],
      pago: [''],
      entregue: [''],
      observacaoPagamento: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteEdit = response;
          console.log('atualizar pagamento');
          console.log(this.conviteEdit);
          this.formularioPagamento.patchValue(this.conviteEdit);
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }

  onSubmit() {
    if (this.formularioPagamento.valid && this.idParam == null) {
      console.log("Formulario inválido ou Id nulo!");
    } else {
      if (!this.formularioPagamento.valid) {
        console.log('formulario invalido')
        console.log(this.formularioPagamento.value)
      } else {
        console.log('idParam nao nulo')
        console.log(this.idParam)
        this.service.pagar(this.idParam, this.formularioPagamento.value)
          .subscribe(response => {
            this.success = true;
            console.log(response);
            this.formularioPagamento.reset(new FormPagamento());
            setTimeout(() => { this.success = false; this.returnList() }, 700);
          });
      }
    }
  }

  returnList() {
    this.router.navigate(['/home'])
  }
}
