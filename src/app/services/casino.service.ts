import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';
import { map } from 'rxjs/operators';
import { Reservacion } from '../models/reservacion';

@Injectable({
  providedIn: 'root'
})
export class CasinoService {
  private usersLogin = ['admin']
  constructor(private firestore: AngularFirestore) {  }

  public newReservacion(reservacion: Reservacion) {
    this.firestore.collection('Reservacion').add(reservacion);
  }
  
  public getClientes() {
    return this.firestore.collection('Clientes').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return { id, ...data }; 
        });
      })
    );
  }

  public getReservaciones() {
    return this.firestore.collection('Reservaciones').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Reservacion;
          // const id = a.payload.doc.id;
          return { ...data }; 
        });
      })
    );
  }



  

}
