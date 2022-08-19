import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionI } from '@data/interfaces/api/CotizacionI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { CotizacionService } from '@data/services/cotizacion/cotizacion.service';
import { UsuarioService } from '@data/services/usuario/usuario.service';

@Component({
  selector: 'app-cotizacion-detail',
  templateUrl: './cotizacion-detail.component.html',
  styleUrls: ['./cotizacion-detail.component.scss']
})
export class CotizacionDetailComponent implements OnInit {

  public idCotizacion: number;
  public cotizacionActual: CotizacionI;
  public title: string;
  public cotizacionForm: FormGroup;
  public usuarios: UsuarioI[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cotizacionService: CotizacionService
  ) {
    if(this.route.snapshot.params['id']){
      this.idCotizacion = +this.route.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.cotizacionForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
    if(!this.idCotizacion){
      this.title = 'Nueva Cotización';
    }else{
      this.title = 'Cotización';
    };


  }
  onSave(){

  }

  onEditarCotizacion(){

  }
  onEliminarCotizacion(){

  }
  onCancelar(){

  }

}
