import { Component, ElementRef, viewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'crud'

  studentobj: student = new student();
  studentList: student[]=[];

  ngOnInit(): void {
  const localData=localStorage.getItem("crud")
  if(localData != null){
    this.studentList=JSON.parse(localData);
  }
  }

  openModel() {
    
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    this.studentobj=new student();
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'none'
    }
  }
 onDelete(item:student){
 const isDelete= confirm("are you sure want to delete");
 if(isDelete){
  const currentRecord=this.studentList.findIndex(m=> m.id === this.studentobj.id);
  this.studentList.splice(currentRecord,1);
  localStorage.setItem('crud', JSON.stringify(this.studentList));
 }
 }
 

  onEdit(item:student){
  this.studentobj=item;
  this.openModel();
  }
  
  updateStudent(){
   const currentRecord=this.studentList.find(m=> m.id === this.studentobj.id);
   if(currentRecord != undefined){
    currentRecord.name=this.studentobj.name;
    currentRecord.address=this.studentobj.address;
    currentRecord.mobileno=this.studentobj.mobileno;
   };
   localStorage.setItem('crud', JSON.stringify(this.studentList));
   this.closeModel();
  }
  saveStudent() {
    debugger;
    const islocalPresent = localStorage.getItem("crud");
    if (islocalPresent != null) {

      const oldArray = JSON.parse(islocalPresent);
      this.studentobj.id=oldArray.length + 1;
      oldArray.push(this.studentobj);
      this.studentList=oldArray;
      localStorage.setItem('crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentobj);
      this.studentobj.id=1;
      this.studentList=newArr;
      localStorage.setItem('crud', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}

export class student {
  id:number;
  name: string;
  mobileno: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id=0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileno = '';
    this.state = '';
    this.pincode = '';
    this.name = '';
  }
}