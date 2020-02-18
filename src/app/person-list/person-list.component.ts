import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

 constructor(private personservice:PersonService) { }

  personsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  persons: Observable<Person[]>;
  person : Person=new Person();
  deleteMessage=false;
  personlist:any;
  isupdated = false;    
 
  public skillset: string[] = [
    'Badminton', 'Basketball', 'Cricket',
    'Football' , 'Golf' , 'Snooker' , 'photography' ,
    'travel' , 'music' , 'dance' , 'fishing',
    'jogging' , 'stalking'
];

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
    this.personservice.getPersonList().subscribe(data =>{
    this.persons =data;
    this.dtTrigger.next();
    })
  }
  
  deletePerson(id: number) {
    this.personservice.deletePerson(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.personservice.getPersonList().subscribe(data =>{
            this.persons =data
            })
        },
        error => console.log(error));
  }


  updatePerson(id: number){
    this.personservice.getPerson(id)
      .subscribe(
        data => {
          this.personlist=data           
        },
        error => console.log(error));
  }
  
  personupdateform=new FormGroup({
    id:new FormControl(),
    firstName:new FormControl(),
    lastName:new FormControl(),
    age:new FormControl(),
    favouriteColour:new FormControl(),
    hobby:new FormControl()
  });

  updatePer(updstu){
    this.person=new Person();   
    this.person.id = this.PersonId.value;
    this.person.firstName=this.PersonFirstName.value;
    this.person.lastName=this.PersonLastName.value;
    this.person.age=this.PersonAge.value;
    this.person.favouriteColour=this.PersonFavouriteColour.value;
    this.person.hobby=this.PersonHobby.value;
    console.log(this.PersonHobby.value);
   

   this.personservice.updatePerson(this.person.id,this.person).subscribe(
    data => {     
      this.isupdated=true;
      this.personservice.getPersonList().subscribe(data =>{
        this.persons =data
        })
    },
    error => console.log(error));
  }

  get PersonId(){
    return this.personupdateform.get('id');
  }

  get PersonFirstName(){
    return this.personupdateform.get('firstName');
  }

  get PersonLastName(){
    return this.personupdateform.get('lastName');
  }

  get PersonAge(){
    return this.personupdateform.get('age');
  }

  get PersonFavouriteColour(){
    return this.personupdateform.get('favouriteColour');
  }

  get PersonHobby(){
    return this.personupdateform.get('hobby');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
