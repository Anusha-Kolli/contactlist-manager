import { Component, OnInit } from '@angular/core';
import{ContactService} from '../contact.service';
import {Contact} from '../contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name:String;
  last_name:String;
  phone:String;
  selectedContact: Contact;
  toggleForm: boolean=false;

  constructor(private contactService : ContactService) { }
  

  addContact(){
    const newContact = {
      first_name : this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
     .subscribe(contact =>{
      this.contacts.push(contact);
      this.contactService.getContacts()
      .subscribe(contacts =>
      this.contacts = contacts);
      this.first_name='';
      this.last_name = '';
      this.phone = '';
     })      
  }
  

  deleteContact(id:any){
    var contacts = this.contacts;
   this.contactService.deleteContact(id)
   .subscribe(function(data){
        if(data.n == 1){
          for(var i = 0;i<contacts.length;i++){
               if(contacts[i]._id ==id){
                 contacts.splice(i,1);
               }
          }
        }
   });
  }

  showEditForm(contact){
    this.selectedContact = contact;
    this.toggleForm = !this.toggleForm;
  }
  updateContact(form){
    let newContact: Contact ={
      _id: this.selectedContact._id,
      first_name:this.selectedContact.first_name,
      last_name:this.selectedContact.last_name,
      phone:this.selectedContact.phone
    }
    this.contactService.updateContact(newContact)
      .subscribe(result =>{
        this.contactService.getContacts()
        .subscribe(contacts =>
        this.contacts = contacts);
      })
      this.toggleForm = !this.toggleForm;
  }
  
  ngOnInit() {
    this.contactService.getContacts()
    .subscribe(contacts =>
    this.contacts = contacts);
  }

}
