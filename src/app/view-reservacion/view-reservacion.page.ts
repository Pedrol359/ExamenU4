import { Reservacion } from './../models/reservacion';
import { Component, OnInit } from '@angular/core';
import { CasinoService } from '../services/casino.service';
import { Router } from '@angular/router';

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

  constructor(private casino:CasinoService,private router:Router) { 
    this.casino.getReservaciones().subscribe(data =>{
      //console.log(data);
      this.reservaciones=data;
      this.res=data;
      this.res2=this.reservacionesProximas([...data]);

      // console.log(this.reservaciones);
    // console.log(this.res2)
    })
    
  }

  getNextTwoDates(dates: Date[], date: Date): Date[] {
  // Primero, ordenamos el arreglo de fechas en orden ascendente
  dates.sort((a, b) => a.getTime() - b.getTime());

  // Luego, buscamos la posición de la fecha dada en el arreglo
  const index = dates.findIndex(d => d.getTime() === date.getTime());

  // Finalmente, devolvemos las dos siguientes fechas en el arreglo (si existen)
  return [
    dates[index + 1],
    dates[index + 2]
  ].filter(d => d != null);
}

  ngOnInit() {
  }
  reservacionesProximas(res: Reservacion[]){
    const date: Date[]=[];
    const nextReservation: Reservacion[] = [];
    res.forEach(element => {
      const temp = element.fecha.split('/');
      // console.log(+temp[2]-1,+temp[1]-1,+temp[0]);
      date.push(new Date(+temp[2],+temp[1]-1,+temp[0]));
    });

    date.forEach(element => {
      console.log(element.toLocaleDateString());
    });

    const nextReservationDate = this.getNextTwoDates(date,new Date()).map(fecha =>{
      return fecha.toLocaleDateString();
    });

    for (let index = 0; index < 2; index++) {
      for(let i = 0; i<res.length; i++){
        if(nextReservationDate[index] == res[i].fecha){
          nextReservation.push(res[i]);
        }
      }
    }
    return nextReservation;
  }

  
  onChange(ev:Event){
    if(this.tog){
      this.res=this.res2;
    }else{
      this.res=this.reservaciones;
    }
  }
  public cerrarSesion() {
    this.router.navigate(['home']);
  }
}

