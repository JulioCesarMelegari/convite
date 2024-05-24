import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Convite } from '../convite';
import { ConviteService } from '../convite.service';
import { Cadstro } from '../cadastro';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  formularioConvite!: FormGroup;
  success: boolean = false;

  conviteEdit:Cadstro;

  usuario:Usuario;

  ngOnInit(): void {
    this.createForm(new Convite());
  }

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder){
    this.conviteEdit = new Cadstro();
    this.usuario = new Usuario();
    this.usuario.nome='julio';
  }

  createForm(convite:Cadstro){
    this.formularioConvite = this.formBuilder.group({
      nomeCliente: [convite.nomeCliente],
      nomeVendedor: [convite.nomeVendedor],
      observacaoCadastro: [convite.observacaoCadastro],
      quantidade: [convite.quantidade],
      usuarioCadastro: [this.usuario.nome]
    });
  }

  onSubmit(){
    this.service.salvarConvite(this.formularioConvite.value)
        .subscribe(response =>{
          this.success = true;
          console.log(response);
          this.formularioConvite.reset(new Convite());
        })
  }

}
