import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Reservacion } from '../models/reservacion';
import { CasinoService } from '../services/casino.service';
// import { format,parseISO } from 'path';

@Component({
  selector: 'app-new-reservacion',
  templateUrl: './new-reservacion.page.html',
  styleUrls: ['./new-reservacion.page.scss'],
})
export class NewReservacionPage implements OnInit {

  public today: any;
  public selectedDate: any;
  public minDate: any = new Date().toISOString();
  public date:Date;
  public showCalendarOut = false;
  public minDateOut:any;
  private reservaciones: Reservacion[] = [];
  public piscina:number=1;
  public picinaValAnterior:number=1;
  public brincolin:boolean =false
  public mesa:boolean =false
  public futbolito:boolean =false
  public total:number=1000;
  public totalR:number=0;
  public fechaValida = false;

  constructor(private casino: CasinoService,private alertController: AlertController, private router:Router) { 
    this.casino.getReservaciones().subscribe(res =>{
      this.reservaciones = res;
    })
  }

  ngOnInit() {
    if(!this.casino.getCurrent().nombre){
      this.router.navigate(['home']);
    }
  }
  change(){
    let auxDate = new Date(this.date)
    let newDate = new Date()
    newDate.setDate(auxDate.getDate()+1)
    this.minDateOut = newDate.toISOString();
    //et x = this.date.getDate() + this.date.getMonth() + this.date.getDay() + '';
     console.log(auxDate.toLocaleDateString());
     const validarLaFecha = this.validarFecha(auxDate.toLocaleDateString())
     if(validarLaFecha){
      this.fechaValida=true;
     } else{
      this.presentAlert('Esa Fecha ya se encuentra reservada, por favor elija otra');
      this.fechaValida=false;
     }
    // console.log(this.minDateOut,typeof(this.minDateOut));           
    //console.log(x)
  }
  validarFecha(date:string):boolean{
    for (let index = 0; index < this.reservaciones.length; index++) {
      if(date == this.reservaciones[index].fecha){
        return false;
      }
    }
    return true;
  }
  onIonChange(){
    // console.log('piscina val: '+this.piscina+ ' Piscina val anterior: '+this.picinaValAnterior+' total: '+this.total);
    this.total+=this.piscina*100 - this.picinaValAnterior*100;
    this.picinaValAnterior=this.piscina;
  }


  onIonChangeBrincolin(ev:Event){
    if(this.brincolin){
      this.total+=200;
    }else{
      this.total-=200;
    }
  }
  onIonChangeMesa(ev:Event){
    if(this.mesa){
      this.total+=150;
    }else{
      this.total-=150;
    }
  }
  onIonChangeFut(ev:Event){
    if(this.futbolito ){
      this.total+=100;
    }else{
      this.total-=100;
    }
  }

  newReservacion(){
      // let formattedString = format(parseISO(this.date), 'dd-MM-yyyy');
      let auxDate = new Date(this.date)
      // this.total+=this.piscina*100;
    let reservacion:Reservacion={
      nombre:this.casino.getCurrent().nombre,
      telefono:this.casino.getCurrent().telefono,
      total:this.total,
      fecha:auxDate.toLocaleDateString()
    }
    console.log(reservacion);
    if (this.casino.getCurrent().nombre){
      this.casino.newReservacion(reservacion);
      this.presentAlert('Reservación Creada!');
      this.resetValores();
      
    } else{
      this.resetValores();
      this.presentAlert('No se pudo reservar el casino porque necesitas iniciar sesión');
      this.router.navigate(['home']);
      
    }
  }

  resetValores(){
    this.total-=(this.piscina-1)*100;
    this.brincolin =false;
    this.mesa =false;
    this.futbolito =false;
    this.piscina=1;
    this.picinaValAnterior=1;
    this.fechaValida=false;
    // this.total=1000;
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
  public cerrarSesion() {
    this.router.navigate(['home']);
  }

}
