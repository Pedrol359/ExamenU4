import { Component, OnInit } from '@angular/core';
import { CasinoService } from '../services/casino.service';
import { Reservacion } from '../models/reservacion';
@Component({
  selector: 'app-view-reservacion',
  templateUrl: './view-reservacion.page.html',
  styleUrls: ['./view-reservacion.page.scss'],
})
export class ViewReservacionPage implements OnInit {

  public reservaciones:Reservacion[]=[]
  public res2:Reservacion[]=[]
  public res:Reservacion[]=[]
  public tog:boolean=false;

  constructor(private casino:CasinoService) { 
    this.casino.getReservaciones().subscribe(data =>{
      //console.log(data);
      this.reservaciones=data;
      this.res2=data.slice(0,2)
      console.log(this.reservaciones)
    console.log(this.res2)
    this.res=this.reservaciones;
    })
    
  }

  ngOnInit() {
  }
  onChange(ev:Event){
    if(this.tog){
      this.res=this.res2;
    }else{
      this.res=this.reservaciones;
    }
  }

}
