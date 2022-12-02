import { Component, OnInit } from '@angular/core';
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

  public piscina:number=0;
  public brincolin:boolean =false
  public mesa:boolean =false
  public futbolito:boolean =false
  public total:number=0;
  public totalR:number=0;

  constructor(private casino: CasinoService) { }

  ngOnInit() {
  }
  change(){
    let auxDate = new Date(this.date)
    let newDate = new Date()
    newDate.setDate(auxDate.getDate()+1)
    this.minDateOut = newDate.toISOString();
    //et x = this.date.getDate() + this.date.getMonth() + this.date.getDay() + '';
     console.log(auxDate.toLocaleDateString());
    // console.log(this.minDateOut,typeof(this.minDateOut));           
    //console.log(x)
  }
  onIonChange(ev:Event){
    this.total+=this.piscina*100;
    console.log(this.piscina)
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
      this.total+=this.piscina*100;
    let reservacion:Reservacion={
      nombre:this.casino.getCurrent().nombre,
      telefono:this.casino.getCurrent().telefono,
      total:this.total,
      fecha:auxDate.toLocaleDateString()
    }
    console.log(reservacion);
    this.casino.newReservacion(reservacion);
  }

}
