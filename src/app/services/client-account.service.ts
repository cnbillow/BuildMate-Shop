import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientAccountService {

  constructor(private db: AngularFirestore) { }

  addClient(client: Client[]) {
    const uid = client[0].uid;
    const clientData = client[0];

    return this.db.doc(`client-account/${uid}`).set(clientData, { merge: true });
  }
}
