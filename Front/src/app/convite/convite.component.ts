import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Convite } from '../convite';
import { ConviteService } from '../convite.service';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  formConvite!: FormGroup;
  success: boolean = false;

  conviteEdit:Convite;

  ngOnInit(): void {
    this.createForm(new Convite());
  }

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder){
    this.conviteEdit = new Convite();
  }

  createForm(convite:Convite){
    this.formConvite = this.formBuilder.group({
      nomeCliente: [convite.nomeCliente],
      dataPagamento: [convite.dataPagamento],
      nomeVendedor: [convite.nomeVendedor],
      observacao: [convite.observacao],
      quantidade: [convite.quantidade]
    });
  }

  onSubmit(){
    this.service.salvarConvite(this.formConvite.value)
        .subscribe(response =>{
          this.success = true;
          console.log(response);
          this.formConvite.reset(new Convite());
        })
  }




}
