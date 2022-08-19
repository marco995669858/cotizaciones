import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotizacionI } from '@data/interfaces/api/CotizacionI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { CotizacionService } from '@data/services/cotizacion/cotizacion.service';
import { SharedService } from '@data/services/shared/shared.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EstructuraI } from '@data/interfaces/api/EstructuraI.interface';
import { EstructuraService } from '@data/services/estructura/estructura.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cotizacion-flow',
  templateUrl: './cotizacion-flow.component.html',
  styleUrls: ['./cotizacion-flow.component.scss']
})
export class CotizacionFlowComponent implements OnInit {

  public usuarioSession: UsuarioI;
  public cotizaciones: CotizacionI[];
  public etapa_1: EstructuraI[];
  public etapa_2: CotizacionI[];
  public etapa_3: CotizacionI[];
  public etapa_4: CotizacionI[];
  public etapa_5: CotizacionI[];
  public monto_1: number;
  public monto_2: number;
  public monto_3: number;
  public monto_4: number;
  public monto_5: number;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private cotizacionService: CotizacionService,
    private estructuraService: EstructuraService,
    private authService: AuthService
  ) {
    this.etapa_1 = [];
    this.etapa_2 = [];
    this.etapa_3 = [];
    this.etapa_4 = [];
    this.etapa_5 = [];
   }

  ngOnInit(): void {
    this.sharedService.nabvarOption.emit('estadistica');
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
        if(this.usuarioSession.fkRol.nombre == 'Administrador'){
          this.cargarDataAdministrador();
        }else{
          this.cargarDataUsuario(this.usuarioSession.id);
        }
        this.calcularMontoEtapas();
      }
    })
  }

  cargarDataAdministrador(){
    this.estructuraService.getEstructuras().subscribe( r => {
      if(!r.error){
        r.data.map( e => {
          if(e.estado != 'Estructura de costo aprobada'){
            this.etapa_1.push(e);
          }
        })
      }
    })
    this.cotizacionService.getCotizacionesEtapa(2).subscribe( r => {
      if(!r.error){
        this.etapa_2 = r.data;
      }
    });
    this.cotizacionService.getCotizacionesEtapa(3).subscribe( r => {
      if(!r.error){
        this.etapa_3 = r.data;
      }
    });
    this.cotizacionService.getCotizacionesEtapa(4).subscribe( r => {
      if(!r.error){
        this.etapa_4 = r.data;
      }
    });
    this.cotizacionService.getCotizacionesEtapa(5).subscribe( r => {
      if(!r.error){
        this.etapa_5 = r.data;
      }
    });
  }

  /**
   * Función que se encarga de mostrar solo las cotizaciones y estructuras que le pertenecen al usuario.
   * @param idUsuario Id del usuario de sesión
   */
  cargarDataUsuario(idUsuario: number){
    // Se cargan los datos de cada etapa.
    forkJoin(this.estructuraService.getEstructurasUsuario(idUsuario), this.cotizacionService.getCotizacionesUsuario(idUsuario))
    .subscribe( r => {
      if(!r[0].error && !r[1].error){
        // Se obtienen las estructuras que no han sido aprobadas para la etapa 1
        r[0].data.map( e => {
          if(e.estado != 'Estructura de costo aprobada'){
            this.etapa_1.push(e);
          }
        })
        // Se obtienen las cotizaciones y se colocan a partir de la etapa 2
        r[1].data.map( c => {
          switch(c.etapa){
            case 2:
              this.etapa_2.push(c);
              break;
            case 3:
              this.etapa_3.push(c);
              break;
            case 4:
              this.etapa_4.push(c);
              break;
            case 5:
              this.etapa_5.push(c);
              break;
          }
        })
        this.calcularMontoEtapas();
      }
    })
  }

  onDrop(event: CdkDragDrop<CotizacionI[]>){
    let etapa: number = 0;
    let cotizacion: CotizacionI;
    // Se mueve el elemento en la misma lista
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event)
      switch(event.container.id){
        case "etapa_2":
          etapa = 2;
          break;
        case "etapa_3":
          etapa = 3;
          break;
        case "etapa_4":
          etapa = 4;
          break;
        case "etapa_5":
          etapa = 5;
          break;
      }
      this.calcularMontoEtapas();
      cotizacion = event.item.data[0];
      cotizacion.etapa = etapa;
      this.cotizacionService.putCotizacion(cotizacion).subscribe();
    }
  }

  onClickCotizacion(){
    console.log("Detalles");
  }

  /**
   * Función que se encarga de calcular el monto total de cada etapa para mostrarlo en la vista
   */
  calcularMontoEtapas(){
    this.monto_1 = 0;
    this.monto_2 = 0;
    this.monto_3 = 0;
    this.monto_4 = 0;
    this.monto_5 = 0;
    // Monto parcial de la etapa 1
    this.etapa_1.map( x => {
      x.moneda == 'sol' ? this.monto_1 += x.precioNoIgv : this.monto_1 += x.precioNoIgv * x.tipoCambio;
    })
    // Monto parcial de cada etapa a partir de la etapa 2
    this.monto_2 = this.calcularMontoEtapa(2);
    this.monto_3 = this.calcularMontoEtapa(3);
    this.monto_4 = this.calcularMontoEtapa(4);
    this.monto_5 = this.calcularMontoEtapa(5);
  }

  /**
   * Esta función se encarga de calcular el monto total por cada etapa
   * @param etapa Número de la etapa de la que se quiere calcular el monto
   * @returns Devuele el monto calculado de la etapa
   */
  calcularMontoEtapa(etapa: number): number{
    let array: CotizacionI[] = [];
    let monto: number = 0;
    switch(etapa){
      case 2:
        array = this.etapa_2;
        break;
      case 3:
        array = this.etapa_3;
        break;
      case 4:
        array = this.etapa_4;
        break;
      case 5:
        array = this.etapa_5;
        break;
    }
    array.map( x => {
      x.fkEstructura.moneda == 'sol' ? monto += x.fkEstructura.precioNoIgv : monto += x.fkEstructura.precioNoIgv * x.fkEstructura.tipoCambio;
    })
    return monto;
  }

}
