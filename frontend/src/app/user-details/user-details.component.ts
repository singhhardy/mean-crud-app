import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  users: any[] = [];
  name: string = '';
  age!: number;
  email: string = '';
  phone!: number;
  selectedUser: any;
  page: number = 1;
  // filter
  filteredUsers: any[] = []
  searchTerm: string = '';
  // Sorting
  sortKey: string = '';
  reverse: boolean = true;
  // fileupload
  selectedFile: File | null = null;

  constructor(private userService: UsersService, private router: Router){}

  ngOnInit() {
      this.userService.getAllUsers().pipe(take(2)).subscribe(users => {
        this.users = users
        this.filteredUsers = users
        console.log(users)
      })
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
    }
  }

  AddNewUser(){
    const AddUserData = new FormData();
    AddUserData.append('name', this.name);
    AddUserData.append('age', this.age.toString());
    AddUserData.append('email', this.email);
    AddUserData.append('phone', this.phone.toString());
    if (this.selectedFile) {
        AddUserData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    this.userService.AddNewUser(AddUserData).subscribe(
      response =>{
        console.log('User Added Successfully')
        this.ngOnInit()
        this.clearInputFields()
      },
      error =>{
        console.log('Error')
      }
    )
  }

  deleteUser(userId: string){
    const confirmed = window.confirm('Are you sure ?')
    if(confirmed){
      this.userService.deleteUser(userId).subscribe(
        response => {
          console.log('User deleted successfully')
          this.ngOnInit()
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  editModal(user: any){
    this.selectedUser = {...user} 
  }

  editUser() {
    const editedUserData = new FormData();
    editedUserData.append('name', this.selectedUser.name);
    editedUserData.append('age', this.selectedUser.age.toString());
    editedUserData.append('email', this.selectedUser.email);
    editedUserData.append('phone', this.selectedUser.phone.toString());
    if (this.selectedFile) {
        editedUserData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    this.userService.updateUser(this.selectedUser._id, editedUserData).subscribe(
        response => {
            console.log('Updated Successfully');
            this.ngOnInit();
        },
        error => {
            console.log(error);
        }
    );
}

  onPageChange(page: number){
    this.page = page
  }

  clearInputFields() {
    this.name = '';
    this.age = 0; 
    this.email = '';
    this.phone = 0;
    this.selectedFile = null
  }

  searchUsers() {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredUsers)
    } else {
      this.filteredUsers = this.users;
    }
  }

  sort(key: string): void{
    this.sortKey = key;
    this.reverse = !this.reverse
    this.filteredUsers = this.sortData(this.filteredUsers);
  }
 
  sortData(data: any[]): any[]{
    if(!this.sortKey){
      return data;
    }

    return data.sort((a, b) =>{
      const x = a[this.sortKey]
      const y = b[this.sortKey]

      if(x < y){
        return this.reverse ? 1 : -1
      } else if(x > y){
        return this.reverse ? -1 : 1
      } else{
        return 0
      }

    })

  }

}
