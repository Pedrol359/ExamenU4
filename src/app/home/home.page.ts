import { Component } from '@angular/core';
import { CasinoService } from '../services/casino.service';
import { Cliente } from '../models/cliente';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public clientes:Cliente[] = []
  public cliNum:string ='';
  constructor(private casino: CasinoService,private route:Router) {
    this.casino.getClientes().subscribe(data =>{
      console.log(data);
      this.clientes=data;
    })
  }
  public login(num:string){
    if (num === 'admin'){
      this.route.navigate(['view-reservacion'])
    }else{
      console.log(num)
      let c=this.getClienteByNum(num)
      if(c){
        this.casino.currentCliente(c);
        this.goToReservacion()
      }
    }

  }
  public goToReservacion(){
    this.route.navigate(['new-reservacion'])
  }
  public getClienteByNum(num:String){
    return this.clientes.find(cliente=>{
      return cliente.telefono===num;
    })
  }
}
