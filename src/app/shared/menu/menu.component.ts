import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  exibindoMenu = false;
  constructor(private router: Router) {}
  menu: MenuItem[] = [];
  mostrarMenu() {
    this.exibindoMenu = !this.exibindoMenu;
  }
  closeSidebar() {
    this.exibindoMenu = !this.exibindoMenu;
    console.log(this.exibindoMenu);
  }
  checkActiveState(givenLink: any) {
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
            icon: PrimeIcons.USER,
            routerLinkActiveOptions: { exact: true },
          },

          {
            label: 'Produtos',
            icon: ' fa-solid fa-boxes-packing fa-xl"',
            routerLink: ['/produtos'],

            command: () => this.closeSidebar(),
          },
        ],

      },

      {
        label: 'Estoque',
        icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
        items: [
          {
            label: 'Estoque Movimento',
            icon: 'fa-solid fa-warehouse fa-xl',
          },
          {
            label: 'Importar Nota fiscal',
            icon: 'fa-solid fa-file-invoice fa-xl',
            expanded: true,
            routerLink: ['/importarnotalfiscal'],
            command: () => this.closeSidebar(),
          },
          {
            label: 'Kits/Combos',
            icon: PrimeIcons.TICKET,
          },
        ],
      },
      {
        label: 'Financeiro',
        icon: PrimeIcons.DOLLAR,
        items: [
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
          },
          {
            label: 'Caixa',
            icon: 'fa-solid fa-cash-register fa-xl',
            //      routerLink: ['/contaspagar'],
          },
        ],
      },
      {
        label: 'Vendas',
        icon: ' fa-solid fa-cart-shopping fa-xl',
        items: [
          {
            label: 'Vendas',
            icon: 'fa-solid fa-cart-plus fa-xl',
            routerLink: ['/vendas'],
          },
          {
            label: 'Compras',
            icon: 'pi pi-shopping-bag',
            routerLink: ['/compras'],
          },
        ],
      },
    ];
  }
}
