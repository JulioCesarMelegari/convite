import { Component, OnInit } from '@angular/core';
import { ConviteService } from '../convite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../evento.service';
import { Cadastro } from '../cadastro';
import { Convite } from '../convite';

@Component({
  selector: 'app-card-convite',
  templateUrl: './card-convite.component.html',
  styleUrls: ['./card-convite.component.css']
})


export class CardConviteComponent implements OnInit{

  convite: Convite;
  idParam: any;

  constructor(private service: ConviteService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
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
        alert('erro, convite sem id')
      }
    });
  }



}
