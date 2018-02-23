import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Contact} from './contacts';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http: Http) { };

  getContacts(){
    return this.http.get('http://localhost:3000/api/contacts')
    .map(res=> res.json());
      
  }

  addContact(newContact){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/contact',newContact,{headers:headers})
     .map(res=>res.json());
  }

  updateContact(newContact){
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/contact/'+newContact._id,newContact,{headers:headers})
    .map(res=>res.json());
  }

  deleteContact(id:any)
  {
      return this.http.delete('http://localhost:3000/api/contact/'+id)
      .map(res=>res.json());
  }
  
}
