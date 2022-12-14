import { Component } from '@angular/core';
import { CasinoService } from '../services/casino.service';
import { Cliente } from '../models/cliente';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public clientes:Cliente[] = []
  public cliNum:string ='';
  constructor(private casino: CasinoService,private route:Router,private alertController: AlertController) {
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
      let c=this.getClienteByNum(num);
      if(c){
        this.casino.currentCliente(c);
        this.goToReservacion()
        console.log('c');
        console.log(c);
      } else {
        this.presentAlert('El número no esta correcto');
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

  async presentAlert(mens: string, sub?: string) {
    const alert = await this.alertController.create({
      header: mens,
      subHeader: sub,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public precioCuarto(){
    
    return 1
  }
}


