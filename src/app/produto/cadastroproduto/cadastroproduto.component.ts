import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css']
})
export class CadastroprodutoComponent implements OnInit {
  produto = new Produto();
  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
