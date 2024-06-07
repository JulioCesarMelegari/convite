import { Component, OnInit } from '@angular/core';
import { Convite } from '../convite';
import { Observable } from 'rxjs';
import { ConviteService } from '../convite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {

  listConvites!: Observable<Convite[]>;

  constructor(private service: ConviteService, private router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
      this.listConvites = this.service.listarTodos();
  }

  getFormCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  async delete(id:number){
    this.service.deletar(id).subscribe();
    this.router.navigate(['']);
  }

}
