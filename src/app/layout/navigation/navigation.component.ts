import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { SharedService } from '@data/services/shared/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public inicioActiveOption: boolean;
  public estructuraActiveOption: boolean;
  public cotizacionActiveOption: boolean;
  public estadisticasActiveOption: boolean;
  public administracionActiveOption: boolean;
  public usuarioSession: UsuarioI;
  public nombreUsuario: string;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.inicioActiveOption = true;
    this.estructuraActiveOption = false;
    this.cotizacionActiveOption = false;
    this.estadisticasActiveOption = false;
    this.administracionActiveOption = false;
    this.usuarioSession = new UsuarioI;
  }

  ngOnInit(): void {
    /*this.sharedService.nabvarOption.subscribe((option: string) => {
      this.onSelectOption(option);
    })
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
        let nombreArray: string[] = this.usuarioSession.nombre.split(' ');
        console.log(nombreArray)
        if(nombreArray.length > 2){
          this.nombreUsuario = nombreArray[0] + ' ' + nombreArray[1] + ' ' + nombreArray[2];
        }else{
          this.nombreUsuario = this.usuarioSession.nombre;
        }
      }
    })*/
  }

  onSelectOption(ruta: string){
    switch (ruta) {
      case 'inicio':
        this.inicioActiveOption = true;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = false;
        break;
      case 'estructura':
          this.inicioActiveOption = false;
          this.estructuraActiveOption = true;
          this.cotizacionActiveOption = false;
          this.estadisticasActiveOption = false;
          this.administracionActiveOption = false;
          break;
      case 'cotizacion':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = true;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = false;
        break;
      case 'estadistica':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = true;
        this.administracionActiveOption = false;
        break;
      case 'administracion':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = true;
        break;
    }
  }

  onNabvarOptionSelected(ruta: string){
    switch (ruta) {
      case 'inicio':
        this.inicioActiveOption = true;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = false;
        this.router.navigate(['inicio']);
        break;
      case 'estructura':
          this.inicioActiveOption = false;
          this.estructuraActiveOption = true;
          this.cotizacionActiveOption = false;
          this.estadisticasActiveOption = false;
          this.administracionActiveOption = false;
          this.router.navigate(['inicio/estructuras']);
          break;
      case 'cotizacion':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = true;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = false;
        this.router.navigate(['inicio/cotizaciones']);
        break;
      case 'estadistica':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = true;
        this.administracionActiveOption = false;
        this.router.navigate(['inicio/cotizaciones/flujo']);
        break;
      case 'administracion':
        this.inicioActiveOption = false;
        this.estructuraActiveOption = false;
        this.cotizacionActiveOption = false;
        this.estadisticasActiveOption = false;
        this.administracionActiveOption = true;
        this.router.navigate(['inicio/usuarios']);
        break;
    }
  }
}
