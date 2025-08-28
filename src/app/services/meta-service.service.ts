import { Injectable } from '@angular/core';
import { Metas } from '../models/meta.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
private dbPath = "/meta";
  metaRef: AngularFirestoreCollection<Metas>;

  constructor(private db: AngularFirestore) {
    this.metaRef = db.collection(this.dbPath);
   }

   getMeta(): AngularFirestoreCollection<Metas>{
    return this.metaRef;
   }

   createMeta(myJob: Metas): any {
    return this.metaRef.add({...myJob})
   }

   deleteMeta(id?: string): Promise<void>{
    return this.metaRef.doc(id).delete();
   }
}
