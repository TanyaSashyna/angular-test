import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  lessEightCharacters,
  moreEightCharacters,
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
  imports: [ FormsModule ],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  public isShowPassword: boolean = false;
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
  protected password: string = '';

  public handleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  public handleEnterPassword() {
    // If the password is empty
    if (emptyField(this.password)) {
      this.messageList = this.defaultMessageList;
    }
    
    // If the password has less than 8 characters
    if (lessEightCharacters(this.password)) {
      this.messageList = this.messageList.map((item: MessageList) => {
        return {
          ...item,
          className: 'red'
        }
      })
    } 
    
    // If the password has more than 7 characters
    if (moreEightCharacters(this.password)) {

      // If the password has only letters/digits/symbols
      if( oneTypeCharacters(this.password) ) {
        this.messageList = this.messageList.map((item: MessageList, ind: number) => {
          if(ind == 0) {
            return {
              ...item,
              className: 'red'
            }
          } else {
            return {
              ...item,
              className: ''
            }
          };
        })
      } 
      // If the password has only letters-digits/letters-symbols/digits-symbols
      else if (twoTypesCharacters(this.password)) {
        this.messageList = this.messageList.map((item: MessageList, ind: number) => {
          if(ind == this.messageList.length -1) {
            return {
              ...item,
              className: ''
            }
          } else {
            return {
              ...item,
              className: 'yellow'
            }
          };
        })
      } 
      // If the password has letters, symbols and numbers
      else {
        this.messageList = this.messageList.map((item: MessageList) => {
          return {
            ...item,
            className: 'green'
          }
        })
      }
    }
  }
}
