import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Convite } from '../convite';
import { Usuario } from '../usuario';
import { ConviteService } from '../convite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormEntrega } from '../formEntrega';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  formularioEntrega: FormGroup;
  success: boolean = false;

  conviteResponse: Convite;
  conviteEdit:FormEntrega;

  usuario:Usuario;

  idParam: any;

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usuario=new Usuario();
    this.conviteEdit = new FormEntrega();
    this.conviteResponse = new Convite();
    this.formularioEntrega = this.formBuilder.group({
      entregue: [''],
      observacao: [''],
    });
  }

  ngOnInit(): void {
    this.usuario = this.service.usuario;
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteResponse = response;
          console.log('atualizar entrega');
          console.log(this.conviteResponse);
          this.formularioEntrega.patchValue(this.conviteResponse);
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
        this.conviteEdit.usuarioEntrega=this.usuario.name;
        this.conviteEdit.entregue=this.formularioEntrega.value.entregue;
        this.conviteEdit.observacao=this.formularioEntrega.value.observacao;
        console.log(this.conviteEdit)
        this.service.entregar(this.idParam, this.conviteEdit)
          .subscribe(response => {
            this.success = true;
            console.log(response);
            this.formularioEntrega.reset(new FormEntrega());
            setTimeout(() => { this.success = false; this.returnList()}, 700);
          });
      }
    }

  returnList() {
    this.router.navigate(['/home'])
  }
}
