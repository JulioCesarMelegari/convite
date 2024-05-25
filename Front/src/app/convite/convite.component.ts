import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Convite } from '../convite';
import { ConviteService } from '../convite.service';
import { Cadastro } from '../cadastro';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  formularioConvite: FormGroup;
  success: boolean = false;

  conviteEdit: Convite;

  cadastro:Cadastro;

  usuario: Usuario;
  idParam: any;

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.conviteEdit = new Convite();
    this.usuario = new Usuario();
    this.cadastro = new Cadastro();
    this.usuario.nome = 'julio';
    this.formularioConvite = this.formBuilder.group({
      nomeCliente: [this.cadastro.nomeCliente, Validators.required],
      nomeVendedor: [this.cadastro.nomeVendedor, Validators.required],
      observacao: [this.cadastro.observacao],
      quantidade: [this.cadastro.quantidade, Validators.required],
      usuarioCadastro: [this.usuario.nome],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');

      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteEdit = response;
          console.log('atualizar convite');
          console.log(this.conviteEdit);
          this.formularioConvite.patchValue(this.conviteEdit);
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }

  onSubmit() {
    if (this.formularioConvite.valid && this.idParam == null) {
      this.service.salvarConvite(this.formularioConvite.value)
        .subscribe(response => {
          this.success = true;
          console.log(response);
          this.formularioConvite.reset(new Convite());
          setTimeout(() => { this.success = false; this.returnList() }, 700);
        })
    } else {
      if (!this.formularioConvite.valid) {
        console.log('formulario invalido')
        console.log(this.formularioConvite.value)
      } else {
        console.log('idParam nao nulo')
        console.log(this.idParam)
        this.service.updateCadastrar(this.idParam, this.formularioConvite.value)
          .subscribe(response => {
            this.success = true;
            console.log(response);
            this.formularioConvite.reset(new Cadastro());
            setTimeout(() => { this.success = false; this.returnList() }, 700);
          });
      }
    }
  }

  returnList() {
    this.router.navigate(['/home'])
  }

}
