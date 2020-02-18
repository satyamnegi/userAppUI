import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Person } from '../person';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(private personservice:PersonService) { }

  person : Person=new Person();
  submitted = false;

  public skillset: string[] = [
    'Badminton', 'Basketball', 'Cricket',
    'Football' , 'Golf' , 'Snooker' , 'photography' ,
    'travel' , 'music' , 'dance' , 'fishing',
    'jogging' , 'stalking'
];
public placeholder: String = 'Hobby';

  ngOnInit() {
    this.submitted=false;
  }

  personsaveform=new FormGroup({
    firstName:new FormControl('' , [Validators.required] ),
    lastName:new FormControl('' , [Validators.required] ),
    age:new FormControl('' , [Validators.required]),
    favouriteColour:new FormControl('',[Validators.required]),
    hobby:new FormControl('' , [Validators.required] )
  });

  savePerson(savePerson){
    this.person=new Person();   
    this.person.firstName=this.PersonFirstName.value;
    this.person.lastName=this.PersonLastName.value;
    this.person.age=this.PersonAge.value;
    this.person.favouriteColour=this.PersonFavouriteColour.value;
    this.person.hobby=this.PersonHobby.value;
    this.submitted = true;
    this.save();
  }

  

  save() {
    this.personservice.createPerson(this.person)
      .subscribe(data => console.log(data), error => console.log(error));
    this.person = new Person();
  }

  get PersonFirstName(){
    return this.personsaveform.get('firstName');
  }

  get PersonLastName(){
    return this.personsaveform.get('lastName');
  }

  get PersonAge(){
    return this.personsaveform.get('age');
  }

  get PersonFavouriteColour(){
    return this.personsaveform.get('favouriteColour');
  }

  get PersonHobby(){
    return this.personsaveform.get('hobby');
  }

  addPersonForm(){
    this.submitted=false;
    this.personsaveform.reset();
  }
}
