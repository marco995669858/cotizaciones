import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { SharedService } from '@data/services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public usuarioSession: UsuarioI;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.usuarioSession = new UsuarioI;
   }


  ngOnInit(): void {
    this.sharedService.nabvarOption.emit('inicio');
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
      }
    })
  }

  onEstructura(){
    this.router.navigate(['inicio/estructuras']);
  }
  onCotizaciones(){
    this.router.navigate(['inicio/cotizaciones']);
  }
  onFlujos(){
    this.router.navigate(['inicio/cotizaciones/flujo'])
  }
  onAdministracion(){
    this.router.navigate(['inicio/usuarios']);
  }
}
