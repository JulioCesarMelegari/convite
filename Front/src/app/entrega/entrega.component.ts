import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Convite } from '../convite';
import { Usuario } from '../usuario';
import { ConviteService } from '../convite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormEntrega } from '../formEntrega';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  success: boolean = false;
  convite: Convite;
  nomeUsuarioLogin:string;
  
  idParam: any;

  constructor(private loginService: LoginService ,private service: ConviteService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.nomeUsuarioLogin= this.loginService.nomeUsuarioLogin;
    this.convite = new Convite();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getConviteById(this.idParam).subscribe(response => {
          this.convite = response;
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }

  onSubmit() {
    if (this.idParam == null) {
      alert('Id nulo!')
      //console.log("Id nulo!");
    } else {
        //console.log('dados formulario');
        //console.log(this.convite);
        this.convite.usuarioEntrega=this.nomeUsuarioLogin;
        this.service.entregar(this.idParam, this.convite)
          .subscribe(response => {
            this.success = true;
            //console.log(response);
            setTimeout(() => { this.success = false; this.returnList()}, 700);
          });
      }
    }

  returnList() {
    this.router.navigate(['/home'])
  }
}
