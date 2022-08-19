import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CostoI } from '@data/interfaces/api/CostoI.interface';
import { EstructuraI } from '@data/interfaces/api/EstructuraI.interface';
import { GastoI } from '@data/interfaces/api/GastoI.interface';
import { ItemI } from '@data/interfaces/api/ItemI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { FileI } from '@data/interfaces/api/utility/FileI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { CostoService } from '@data/services/costo/costo.service';
import { EstructuraService } from '@data/services/estructura/estructura.service';
import { FileService } from '@data/services/file/file.service';
import { GastoService } from '@data/services/gasto/gasto.service';
import { ItemService } from '@data/services/item/item.service';
import { environment } from 'environments/environment';
import { concat, concatMap, forkJoin, of } from 'rxjs';
import { saveAs } from 'file-saver';
import { ArchivoService } from '@data/services/archivo/archivo.service';
import { ArchivoI } from '@data/interfaces/api/ArchivoI.interface';
import { SharedService } from '@data/services/shared/shared.service';
import { SnackBar } from '@data/interfaces/shared/snackbarI.interface';
import { UsuarioService } from '@data/services/usuario/usuario.service';
import { CotizacionService } from '@data/services/cotizacion/cotizacion.service';
import { CotizacionI } from '@data/interfaces/api/CotizacionI.interface';

@Component({
  selector: 'app-estructura-detail',
  templateUrl: './estructura-detail.component.html',
  styleUrls: ['./estructura-detail.component.scss']
})
export class EstructuraDetailComponent implements OnInit {

  public idEstructura: number;
  public estructuraActual: EstructuraI;
  public title: string;
  public estructuraForm: FormGroup;
  public revisionForm: FormGroup;
  public items: ItemI[];
  public gastos: GastoI[];
  public costos: CostoI[];
  public usuarioSession: UsuarioI;
  public estructuraFile:FileI;
  public inputEnabled:boolean = true;
  public archivoEstructura:ArchivoI;
  public modalRevision:boolean = false;
  public modalRevisiones:boolean = false;
  public snackbar: SnackBar;
  public turno: boolean;
  public editar: boolean;
  public opciones: boolean;
  public cotizacionActual: CotizacionI;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private estructuraService: EstructuraService,
    private authService: AuthService,
    private itemService: ItemService,
    private gastoService: GastoService,
    private costoService: CostoService,
    private fileService: FileService,
    private archivoService: ArchivoService,
    private sharedService: SharedService,
    private usuarioService: UsuarioService,
    private cotizacionService: CotizacionService
  ) {
    if(this.route.snapshot.params['id']){
      this.idEstructura = +this.route.snapshot.params['id'];
    }
    // Se crean las listas que se asignarán a la estructura de costo
    this.items = [];
    this.gastos = [];
    this.costos = [];
    // Se inicializa la estructura actual
    this.estructuraActual = new EstructuraI;
    this.archivoEstructura = new ArchivoI;
    this.turno = false;
    this.editar = false;
    this.opciones = false;
    // Se inicializa la cotización actual
    this.cotizacionActual = new CotizacionI;
  }

  ngOnInit(): void {
    // Se construye el formulario
    this.estructuraForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      ruc_cliente: ['', [Validators.required]],
      tipoCambio: ['', [Validators.required]],
      igv: ['18', [Validators.required],],
      moneda: ['', [Validators.required]],
      forma_pago: ['', [Validators.required]],
      plazo_implementacion: ['', [Validators.required]],
      validez_cotizacion: ['', [Validators.required]]
    });
    this.revisionForm = this.formBuilder.group({
      observacion: ['', [Validators.required]]
    });
    // Se obtiene al usuario de la sesión
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
        this.sharedService.nabvarOption.emit("estructura");
        // Se muestra el título dependiendo de si se quiere editar o crear una estructura
        if(!this.idEstructura){
          this.title = 'Nueva estructura de costo';
        }else{
          this.title = 'Estructura de costo';
          // Se verifica si el usuario tiene que revisar la estructura de costo
          this.usuarioService.verificarTurno(this.usuarioSession.id, this.idEstructura).subscribe( r => {
            if(!r.error){
              r.data.turno==1 ? this.turno=true : this.turno=false
            }
          })
          // Se obtiene la información de la estructura
          this.estructuraService.getEstructura(this.idEstructura).subscribe( r => {
            if(!r.error){
              this.estructuraActual = r.data;
              this.estructuraForm.controls['nombre'].setValue(this.estructuraActual.nombre);
              this.estructuraForm.controls['descripcion'].setValue(this.estructuraActual.descripcion);
              this.estructuraForm.controls['cliente'].setValue(this.estructuraActual.cliente);
              this.estructuraForm.controls['igv'].setValue(this.estructuraActual.igv);
              this.estructuraForm.controls['tipoCambio'].setValue(this.estructuraActual.tipoCambio);
              this.estructuraForm.controls['moneda'].setValue(this.estructuraActual.moneda);
              this.estructuraForm.controls['forma_pago'].setValue(this.estructuraActual.formaPago);
              this.estructuraForm.controls['plazo_implementacion'].setValue(this.estructuraActual.plazoImplementacion);
              this.estructuraForm.controls['validez_cotizacion'].setValue(this.estructuraActual.validezCotizacion);
              this.disableForm();

              if((this.estructuraActual.fkUsuario.id == this.usuarioSession.id || this.usuarioSession.fkRol.nombre == 'Administrador') &&
                (this.estructuraActual.estado == 'Pendiente de inicio de revisión' || this.estructuraActual.estado == 'Estructura de costo observada')){
                this.opciones = true;
              }
              this.itemService.getItemEstructura(this.estructuraActual.id).subscribe( r => {
                if(!r.error){
                  this.items = r.data;
                }
              });
              this.gastoService.getGastoEstructura(this.estructuraActual.id).subscribe( r => {
                if(!r.error){
                  this.gastos = r.data
                }
              });
              this.costoService.getCostoEstructura(this.estructuraActual.id).subscribe( r => {
                if(!r.error){
                  this.costos = r.data
                }
              });
              this.archivoService.getArchivoEstructura(this.estructuraActual.id).subscribe( r => {
                if(!r.error){
                  this.archivoEstructura = r.data
                }
              });
            }
          })
        };
        // Se crean un elemento de cada tipo para mostrar en el formulario
        this.onAgregarItem();
        this.onAgregarGasto();
        this.onAgregarCosto();
      }
    })
  }

  onAgregarItem(){
    if(this.estructuraActual.id == 0 || this.editar){
      let item: ItemI = new ItemI()
      this.items.push(item);
    }
  }
  onRemoveItem(i: any){
    if(this.estructuraActual.id == 0 || this.editar){
      this.items.splice(i,1);
    }
  }
  onAgregarGasto(){
    if(this.estructuraActual.id == 0 || this.editar){
      let gasto: GastoI = new GastoI();
      this.gastos.push(gasto);
    }
  }
  onRemoveGasto(i: number){
    if(this.estructuraActual.id == 0 || this.editar){
      this.gastos.splice(i,1);
    }
  }
  onAgregarCosto(){
    if(this.estructuraActual.id == 0 || this.editar){
      let costo: CostoI = new CostoI();
      this.costos.push(costo);
    }
  }
  onRemoveCosto(i: number){
    if(this.estructuraActual.id == 0 || this.editar){
      this.costos.splice(i,1);
    }
  }
  onSave(){
    if(this.estructuraActual.id == 0 || this.estructuraActual.estado == 'Estructura de costo observada'){
      this.onDisplaySnackbar("Espere, por favor...", 0, false);
      let estructura:EstructuraI = new EstructuraI;
      if(this.estructuraActual.id == 0){
        const fechaCreacion = formatDate(new Date(), 'hh:mm yyyy-MM-dd', 'en-US');
        estructura.fechaCreacion = fechaCreacion;
      }
      if(this.estructuraActual.id!=0){
        estructura = this.estructuraActual;
      }
      estructura.nombre = this.estructuraForm.value.nombre;
      estructura.descripcion = this.estructuraForm.value.descripcion;
      estructura.cliente = this.estructuraForm.value.cliente;
      estructura.rucCliente = this.estructuraForm.value.ruc_cliente;
      estructura.tipoCambio = Number(this.estructuraForm.value.tipoCambio);
      estructura.igv = Number(this.estructuraForm.value.igv,);
      estructura.moneda = this.estructuraForm.value.moneda;
      estructura.fkUsuario = this.usuarioSession;
      estructura.estado = environment.estado_creado;
      estructura.formaPago = this.estructuraForm.value.forma_pago;
      estructura.plazoImplementacion = this.estructuraForm.value.plazo_implementacion;
      estructura.validezCotizacion = this.estructuraForm.value.validez_cotizacion;

      this.estructuraService.postEstructura(estructura).subscribe( r => {
        if(!r.error){
          this.items.map( item => {
            item.fkEstructura = r.data
          });
          this.gastos.map( gasto => {
            gasto.fkEstructura = r.data
          });
          this.costos.map( costo => {
            costo.fkEstructura = r.data
          });
          forkJoin(
            this.itemService.postItems(this.items),
            this.gastoService.postGastos(this.gastos),
            this.costoService.postCostos(this.costos),
          ).subscribe( () => {
            this.estructuraService.postEstructuraExcel(r.data).pipe(
              concatMap( (res1) => {
                console.log(res1)
                this.estructuraActual = res1.data;
                return this.archivoService.getArchivoEstructura(r.data.id)
              })
            ).subscribe( res => {
              this.archivoEstructura = res.data;
              this.editar = false;
              this.disableForm();
              this.onDisplaySnackbar("Operación exitosa!", 1, true);
            })
          });

        }
      });
    }
  }
  onEditarEstructura(){
    if(this.estructuraActual.estado == environment.estado_observada || this.estructuraActual.estado == environment.estado_creado){
      this.editar = true;
      this.enableForm();
    }
  }
  onEliminarEstructura(){
    this.estructuraService.deleteEstructura(this.estructuraActual.id).subscribe( r => {
      if(!r.error){
        this.onDisplaySnackbar("Operación exitosa!", 1, true);
        this.router.navigate(['/inicio/estructuras']);
      }
    });
  }
  onCancelar(){
    this.router.navigate(['inicio/estructuras']);
  }

  onVerDetalles(){
    if(this.estructuraActual.id != 0){
      this.modalRevisiones = true;
    }
}
  onDescargar(){
    if(this.estructuraActual.id != 0){
      this.fileService.getFile(this.archivoEstructura.nombre + '.xlsx').subscribe(blob => saveAs(blob, this.archivoEstructura.nombre + ".xlsx"));
    }
  }
  onEnviarRevision(){
    if(this.estructuraActual.id != 0 && this.estructuraActual.estado == environment.estado_creado){
      this.onDisplaySnackbar("Espere, por favor...", 0, false);
      this.estructuraService.enviarRevision(this.estructuraActual).subscribe( r => {
        if(!r.error){
          this.estructuraActual = r.data;
          this.onDisplaySnackbar("Operación exitosa!", 1, true);
        }
      });
    }
  }
  onRevisarEstructura(){
    this.modalRevision = true;
  }
  onCloseRevisarEstructura(){
    this.modalRevision = false;
  }
  onAprobar(){
    if(this.revisionForm.value.observacion==''){
      this.onDisplaySnackbar("Espere, por favor...", 0, false);
      this.estructuraService.aprobarRevision(this.estructuraActual.id, this.usuarioSession.id).subscribe( r => {
        if(!r.error){
          this.turno = false;
          this.estructuraActual = r.data;
          this.onCloseModalRevisiones();
          this.onDisplaySnackbar("Operación exitosa!", 1, true);
        }
      })
    }else{
      this.onDisplaySnackbar("Existen observaciones", 2, false )
    }
  }
  onObservar(){
    if(this.revisionForm.value.observacion.length > 0){
      this.onDisplaySnackbar("Espere, por favor...", 0, false);
      this.estructuraService.observarRevision(this.estructuraActual.id, this.usuarioSession.id, this.revisionForm.value.observacion).subscribe( r => {
        if(!r.error){
          this.turno = false;
          this.estructuraActual = r.data;
          this.onCloseModalRevisiones();
          this.onDisplaySnackbar("Operación exitosa!", 1, true);
        }
      })
    }else{
      this.onDisplaySnackbar("No existen observaciones", 2, false);
    }
  }
  onCloseModalRevisiones(){
    this.modalRevision = false;
  }
  customTB(item, index) {
    return `${item.id}-${index}`;
  }
  enableForm(){
    this.estructuraForm.controls['nombre'].enable();
    this.estructuraForm.controls['descripcion'].enable();
    this.estructuraForm.controls['cliente'].enable();
    this.estructuraForm.controls['ruc_cliente'].enable();
    this.estructuraForm.controls['igv'].enable();
    this.estructuraForm.controls['tipoCambio'].enable();
    this.estructuraForm.controls['moneda'].enable();
    this.estructuraForm.controls['forma_pago'].enable();
    this.estructuraForm.controls['plazo_implementacion'].enable();
    this.estructuraForm.controls['validez_cotizacion'].enable();
    this.inputEnabled = true;
  }
  disableForm(){
    this.estructuraForm.controls['nombre'].disable();
    this.estructuraForm.controls['descripcion'].disable();
    this.estructuraForm.controls['cliente'].disable();
    this.estructuraForm.controls['ruc_cliente'].disable();
    this.estructuraForm.controls['igv'].disable();
    this.estructuraForm.controls['tipoCambio'].disable();
    this.estructuraForm.controls['moneda'].disable();
    this.estructuraForm.controls['forma_pago'].disable();
    this.estructuraForm.controls['plazo_implementacion'].disable();
    this.estructuraForm.controls['validez_cotizacion'].disable();
    this.inputEnabled = false;
  }
  onDisplaySnackbar(mensaje: string, tipo: number, button: boolean){
    this.snackbar = new SnackBar(mensaje, tipo, button);
    this.sharedService.snackBar.emit(this.snackbar);
    this.sharedService.showSnackBar.emit(true);
    if(tipo!=0){
      this.sharedService.showSnackBar.emit(false);
    }
  }
  cerrarModalRevisiones(event: any){
    this.modalRevisiones = false;
  }
  onGenerarCotizacion(){
    if(this.estructuraActual.estado == 'Estructura de costo aprobada'){
      this.onDisplaySnackbar("Espere, por favor...", 0, false);
      this.cotizacionService.generarCotizacion(this.estructuraActual).subscribe( r => {
        if(!r.error){
          this.cotizacionActual = r.data;
          this.onDisplaySnackbar("Operación exitosa!", 1, true);
          this.router.navigate(['/inicio/cotizaciones']);
        }
      })
    }
  }
}
