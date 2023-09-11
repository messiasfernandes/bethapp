import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  exibindoMenu=false;
  constructor( private router: Router) { }
  menu :MenuItem[]=[]
  mostrarMenu(){
    this.exibindoMenu = !this.exibindoMenu;
  }
  closeSidebar(){

    this.exibindoMenu = !this.exibindoMenu;
    console.log(this.exibindoMenu)
  }
  checkActiveState(givenLink:any) {
    console.log(this.router.url);
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
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

               routerLink: ['/produtos'],
                routerLinkActiveOptions: { exact: true },
              },

              {
                label: 'Funicionários',
                 icon :PrimeIcons.USER,
                 routerLinkActiveOptions: { exact: true }
              },
              {
                label: 'Produtos',
                icon: PrimeIcons.BRIEFCASE,
                routerLink: ['/produtos'],


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
            expanded: true,
           routerLink:['/importarnotalfiscal'],
            command: () => this.closeSidebar(),
          },
          {
            label:'Kits/Combos',
            icon:PrimeIcons.TICKET,
          }

        ]
      },
      {
        label:"Financeiro",
        icon: PrimeIcons.DOLLAR,
        items:[
          {
            label: 'Condições de Pagamento',
            icon: 'pi pi-tablet',
      //      routerLink: ['/contaspagar'],
          },
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
