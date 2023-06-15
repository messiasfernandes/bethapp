import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  exibindoMenu=false;
  constructor( ) { }
  menu :MenuItem[]=[]
  mostrarMenu(){
    this.exibindoMenu = !this.exibindoMenu;
  }
  closeSidebar(){

    this.exibindoMenu = !this.exibindoMenu;
    console.log(this.exibindoMenu)
  }
  ngOnInit(): void {
    this.menu = [
      {
        label: 'Cadastro',
        icon: PrimeIcons.FILE,


            items: [
              {
                label: 'Clientes',
                icon: PrimeIcons.USER_PLUS,
              },
              {
                label: 'Fornecedores',
                icon: PrimeIcons.USER_MINUS,

              //  routerLink: ['/fornecedores'],
                routerLinkActiveOptions: { exact: true },
              },

              {
                label: 'Funicionários',
                 icon :PrimeIcons.USER
              },
              {
                label: 'Produtos',
                icon: PrimeIcons.BRIEFCASE,
             //  routerLink: ['/produtos'],
               routerLinkActiveOptions: { exact: true },
                command: () => this.closeSidebar(),
              }

            ],

          },



      {
        label:"Estoque",
        icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
        items:[
         {
            label:'Estoque Movimento',
            icon:PrimeIcons.WALLET,
          },
          {
            label: 'Importar Nota fiscal',
            icon: 'pi pi-file-import',
          //  routerLink:['/importarnotalfiscal'],
            command: () => this.closeSidebar(),
          }

        ]
      },
      {
        label:"Financeiro",
        icon: PrimeIcons.DOLLAR,
        items:[
          {
            label: 'Contas Receber',
            icon: PrimeIcons.MONEY_BILL,
           // routerLink: ['/contasreceber'],

          },
          {
            label: 'Contas Pagar',
            icon: 'pi pi-calculator',
      //      routerLink: ['/contaspagar'],
          }

        ]

      },
      {
        label:"Vendas",
        icon: ' pi pi-compass',
        items:[
          {
            label: 'Vendas',
            icon: 'pi pi-shopping-cart',
            routerLink: ['/vendas'],

          },
          {
            label: 'Compras',
            icon:'pi pi-shopping-bag',
            routerLink: ['/compras'],
          }

        ]

      }
    ];
  }

}
