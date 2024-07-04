import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import {
  lessEightCharacters,
  emptyField,
  oneTypeCharacters,
  twoTypesCharacters,
} from "../../assets/utils/utils";

type MessageList = {
  message: string,
  className: string,
}

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  public isShowPassword: boolean = false;
  protected passwordValue: FormControl = new FormControl('');

  private defaultMessageList: MessageList[] = [
    {
      message: 'Easy',
      className: '',
    },
    {
      message: 'Medium',
      className: '',
    },
    {
      message: 'Strong',
      className: '',
    },
  ];
  protected messageList: MessageList[] = this.defaultMessageList;

  public handleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  public handleEnterPassword() {
    // If the password is empty
    if (emptyField(this.passwordValue.value)) {
      this.messageList = this.defaultMessageList;
    }
    // If the password has less than 8 characters
    else if (lessEightCharacters(this.passwordValue.value)) {
      this.messageList = this.messageList.map((item: MessageList) => (
        { ...item, className: 'red' }
      ))
    }
    // If the password has only letters/digits/symbols
    else if( oneTypeCharacters(this.passwordValue.value) ) {
      this.messageList = this.messageList.map((item: MessageList, ind: number) => (
        ind === 0 ? { ...item, className: 'red' } : { ...item, className: '' }
      ))
    } 
    // If the password has only letters-digits/letters-symbols/digits-symbols
    else if (twoTypesCharacters(this.passwordValue.value)) {
      this.messageList = this.messageList.map((item: MessageList, ind: number, arr: MessageList[]) => (
        ind == arr.length -1 ? { ...item, className: '' } : { ...item, className: 'yellow' }
      ))
    } 
    // If the password has letters, symbols and numbers
    else {
      this.messageList = this.messageList.map((item: MessageList) => (
        { ...item, className: 'green' }
      ))
    }
  }
}
