import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Convite } from '../convite';
import { ConviteService } from '../convite.service';
import { Cadastro } from '../cadastro';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Evento } from '../evento';
import { Observable } from 'rxjs';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  success: boolean = false;
  conviteCadastro: Cadastro;
  listEvento!: Evento[];
  idParam: any;

  constructor(private service: ConviteService,
    private loginService: LoginService,
    private router: Router,
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute) {
    this.conviteCadastro = new Convite();
    console.log(this.listEvento)
    this.conviteCadastro.usuarioCadastro = this.loginService.nomeUsuarioLogin;
  }

  ngOnInit(): void {
    this.eventoService.getEventoPendente().subscribe(
      response => { this.listEvento = response });
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteCadastro = response;
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }

  onSubmit() {

    if (this.condicaoSalvar() == true && this.idParam == null) {
        this.service.salvarConvite(this.conviteCadastro)
        .subscribe(response => {
          this.success = true;
          //console.log(response);
          setTimeout(() => { this.success = false; this.returnList() }, 700);
        })
    } else {
      if (this.condicaoSalvar() == false && this.idParam != null) {
        alert('Preencher todos os campos do formulário!');
      }
      if (this.condicaoSalvar() == true && this.idParam != null) {
        //console.log('idParam nao nulo')
        //console.log(this.idParam)
        this.service.updateCadastrar(this.idParam, this.conviteCadastro)
          .subscribe(response => {
            this.success = true;
            //console.log(response);
            setTimeout(() => { this.success = false; this.returnList() }, 700);
          });
      }
    }
  }
  returnList() {
    this.router.navigate(['/home'])
  }

  condicaoSalvar() {
    var salvar: boolean
    if (this.conviteCadastro.nomeEvento != null && this.conviteCadastro.nomeCliente != null && this.conviteCadastro.nomeVendedor != null
      && this.conviteCadastro.quantidade != null) {
      return salvar = true;
    }
    return salvar = false;
  }

}
