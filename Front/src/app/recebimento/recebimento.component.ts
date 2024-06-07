import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../usuario';
import { ConviteService } from '../convite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormRecebimento } from '../formRecebimento';
import { Convite } from '../convite';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})

export class RecebimentoComponent implements OnInit {

  formularioRecebimento: FormGroup;
  success: boolean = false;

  conviteResponse:Convite;
  conviteEdit: FormRecebimento;
  usuario: Usuario;
  idParam: any;

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.conviteEdit = new Convite();
    this.usuario = new Usuario();
    this.conviteEdit=new FormRecebimento();
    this.conviteResponse=new Convite();
    this.formularioRecebimento = this.formBuilder.group({
      usuarioPagamento: [this.usuario.name],
      pago: [''],
      observacao: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteResponse = response;
          console.log('atualizar recebimento');
          console.log(this.conviteResponse);
          this.formularioRecebimento.patchValue(this.conviteResponse);//seta formulario com os dados do response
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }

  onSubmit() {
    if (this.idParam == null) {
      console.log("Id nulo!");
    } else {
        console.log('idParam nao nulo')
        console.log(this.idParam)
        console.log('dados formulario')
        this.conviteEdit.usuarioPagamento=this.usuario.name;
        this.conviteEdit.pago=this.formularioRecebimento.value.pago;
        this.conviteEdit.observacao=this.formularioRecebimento.value.observacao;
        console.log(this.conviteEdit);
        this.service.pagar(this.idParam, this.conviteEdit)
          .subscribe(response => {
            this.success = true;
            console.log(response);
            this.formularioRecebimento.reset(new FormRecebimento());
            setTimeout(() => { this.success = false; this.returnList()}, 700);
          });
      }
    }

  returnList() {
    this.router.navigate(['/home'])
  }
}
