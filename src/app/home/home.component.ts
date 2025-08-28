import { Component } from '@angular/core';
import { Metas } from '../models/meta.model';
import { MetaServiceService } from '../services/meta-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  itemCount: number = 0;
  btnxt: string = "Agregar"
  goalText: string = "";
  metaList: Metas[] = [];
  myMeta: Metas = new Metas();

  constructor(public metaService: MetaServiceService){
    console.log(this.metaService)
    this.metaService.getMeta().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.metaList = data;
      console.log(this.metaList)
    })
  }

  AgregarMeta(){
    console.log(this.myMeta)
    this.metaService.createMeta(this.myMeta).then(() => {
      console.log("Created new meta successfully!")
    })
  }

  deleteMeta(id?: string){
    this.metaService.deleteMeta(id).then(() => {
      console.log("delete meta successfully!")
    }),
    console.log(id)
  }
}
