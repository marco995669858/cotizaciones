import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RevisorI } from '@data/interfaces/api/RevisorI.interface';
import { RevisorUsuarioI } from '@data/interfaces/api/RevisorUsuarioI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { SnackBar } from '@data/interfaces/shared/snackbarI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { RevisionService } from '@data/services/revision/revision.service';
import { SharedService } from '@data/services/shared/shared.service';
import { UsuarioService } from '@data/services/usuario/usuario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements  OnInit{


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['nombre', 'dni', 'correo', 'opciones'];
  dataSource: MatTableDataSource<UsuarioI> = new MatTableDataSource<UsuarioI>([]);

  public usuarios: UsuarioI[];
  public usuario: UsuarioI;
  public revisores: RevisorUsuarioI[];
  public revisoresCopy: RevisorUsuarioI[];
  public revisor: RevisorI;
  public revisoresModal: boolean;
  public usuarioIdSelected: number;
  public usuarioSession: UsuarioI;
  public usuarioSelected: UsuarioI;
  public snackbar: SnackBar;
  public index: number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private sharedService: SharedService,
    private revisionService: RevisionService,
    private authService: AuthService
  ) {
    this.revisoresModal = false;
    this.usuarioIdSelected = 0;
    this.usuarioSelected = new UsuarioI;
    this.usuarioSession = new UsuarioI;
    this.index = 1000;
   }

  ngOnInit(): void {
     this.authService.session_user().subscribe( r => {
      console.log(r)
      if(!r.error){
       this.usuarioSession = r.data;
       if(this.usuarioSession.fkRol.nombre == 'Administrador'){
        this.sharedService.nabvarOption.emit('administracion');
        this.cargarTablaUsuarios();
        this.cargarTablaRevisores();
       }else{
        this.router.navigate(['inicio']);
       }
      }
    })
  }

  cargarTablaUsuarios(){
    this.usuarioService.getUsuarios().subscribe(r =>{
      if(!r.error){
        this.usuarios = r.data;
        this.dataSource.data = this.usuarios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  cargarTablaRevisores(){
    this.revisionService.getRevisores().subscribe( r => {
      if(!r.error){
        this.revisores = r.data;
      }
    })
  }

  filtrarTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  onNuevoUsuario(){
    this.router.navigate(['inicio/usuarios/usuario']);
  }

  onVerDetalles(idUsuario: number){
   this.router.navigate([`inicio/usuarios/usuario/${idUsuario}`]);
  }

  onEditRevisores(){
    this.revisionService.getRevisores().subscribe( r => {
      if(!r.error){
        this.revisoresCopy = r.data;
      }
    })
    this.revisoresModal = true;
  }

  onCloseRevisores(){
    this.cargarTablaRevisores();
    this.revisoresModal = false;
    this.usuarioIdSelected = 0;
  }

  onUsuarioSelected(){
    this.usuarioSelected = this.usuarios.find( usuario => usuario.id == this.usuarioIdSelected );
  }

  onCambiarRevisor(i: number){
    this.index = i;
    this.revisoresCopy.splice(i, 1);
  }

  onEliminarRevisor(i: number){
    for(let j=i+1; j<this.revisoresCopy.length; j++){
      this.revisoresCopy[j].prioridad = this.revisoresCopy[j].prioridad - 1;
    }
    this.revisoresCopy.splice(i, 1);
  }

  onAgregarRevisor(){
    if(this.usuarioSelected.id != 0){
      let revisor: RevisorUsuarioI = new RevisorUsuarioI;
      let existeRevisor: boolean = false;
      existeRevisor = this.revisoresCopy.some( r => r.fkUsuario.nombre === this.usuarioSelected.nombre );
      if(!existeRevisor){
        revisor.fkUsuario = this.usuarioSelected;
        if(this.index != 1000){
          revisor.prioridad = this.index + 1;
          this.revisoresCopy.splice(this.index, 0 , revisor);
          this.index = 1000;
        }else{
          revisor.prioridad = this.revisoresCopy.length + 1;
          this.revisoresCopy.push(revisor)
        }
      }else{
        this.onDisplaySnackBar("El usuario ya es revisor", 2, true);
      }
    }
  }

  onGuardarRevisores(){
    this.revisionService.putRevisor(this.revisores).subscribe( () => {
      this.revisionService.postRevisor(this.revisoresCopy).subscribe( () => {
        this.onCloseRevisores();
      })
    })
  }

  onDisplaySnackBar(mensaje: string, tipo: number, button: boolean){
    this.snackbar = new SnackBar(mensaje, tipo, button);
    this.sharedService.snackBar.emit(this.snackbar);
    this.sharedService.showSnackBar.emit(true);
    if(tipo != 0){
      this.sharedService.showSnackBar.emit(false);
    }
  }
}
