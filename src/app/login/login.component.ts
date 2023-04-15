import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit{

  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth:AuthService;


  constructor(
    private authService: AuthService,
    private router: Router
  ){ } 

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage(){
    if(this.authService.isLoggedIn){
      this.message = 'Vous êtes connecté.';
    }else{
      this.message = 'Indentifiant ou mot de passe incorrect.';
    }
  }

  login(){
    this.message = 'Tentative de connection en cours...';
    this.authService.login(this.name, this.password)
      .subscribe((isLoggodIn: boolean) => {
        this.setMessage();
        if(isLoggodIn){
          this.router.navigate(['/pokemons']);
        }else{
          this.password = '';
          this.router.navigate(['/login']);
        }
        
      });
  }

  logout(){
    this.authService.logout();
    this.message = 'vous êtes déconnecté.';
  }


}
