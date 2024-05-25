import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormRecebimento } from '../formRecebimento';
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

  conviteEdit: Convite;

  entrega: FormEntrega;

  usuario: Usuario;
  idParam: any;

  constructor(private service: ConviteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.entrega = new FormEntrega();
    this.conviteEdit = new Convite();
    this.usuario = new Usuario();
    this.usuario.nome = 'julio';
    this.formularioEntrega = this.formBuilder.group({
      usuarioEntrega: [this.usuario.nome],
      entregue: [''],
      observacao: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.conviteEdit = response;
          console.log('atualizar entrega');
          console.log(this.conviteEdit);
          this.formularioEntrega.patchValue(this.conviteEdit);
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
        this.service.entregar(this.idParam, this.formularioEntrega.value)
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
