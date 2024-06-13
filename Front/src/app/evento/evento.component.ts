import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento';
import { ConviteService } from '../convite.service';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  success: boolean = false;
  evento:Evento;
  idParam: any;

  constructor(private service: EventoService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
      this.evento = new Evento();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
      this.idParam = params.get('id');
      if (this.idParam !== null) {
        this.service.getEventoById(this.idParam).subscribe(response => {
          this.evento = response;
        });
      } else {
        console.log('idParam nulo');
      }
    });
  }
  //PENDENTE("pendente"),
	//FINALIZADO("finalizado")

  onSubmit() {
    console.log(this.evento);
    if (this.condicaoSalvar() == true && this.idParam == null) {
      this.service.salvarEvento(this.evento)
        .subscribe(response => {
          this.success = true;
          //console.log(response);
          setTimeout(() => { this.success = false; this.returnList() }, 700);
        })
    } else {
      if (this.condicaoSalvar() == false && this.idParam != null) {
         alert('Preencher todos os campos do formulário!');
       } 
      if (this.condicaoSalvar() ==true && this.idParam != null) {
        //console.log('idParam nao nulo')
        //console.log(this.idParam)
        this.service.updateEvento(this.idParam, this.evento)
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

  condicaoSalvar(){
    var salvar: boolean
    if(this.evento.nomeEvento != null && this.evento.dados != null && this.evento.totalConvites != null){
        return salvar = true;
      }
    return salvar = false;
  }

}