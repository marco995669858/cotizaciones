import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EstructuraI } from '@data/interfaces/api/EstructuraI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { EstructuraService } from '@data/services/estructura/estructura.service';
import { SharedService } from '@data/services/shared/shared.service';

@Component({
  selector: 'app-estructura-list',
  templateUrl: './estructura-list.component.html',
  styleUrls: ['./estructura-list.component.scss'],
})
export class EstructuraListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['nombre', 'estado', 'cliente', 'precioNoIgv','precioIgv','fkUsuario', 'opciones'];
  dataSource: MatTableDataSource<EstructuraI> = new MatTableDataSource<EstructuraI>([]);

  public estructuras: EstructuraI[];
  public estructura: EstructuraI;
  public usuarioSession: UsuarioI;

  constructor(
    private router: Router,
    private estructuraService: EstructuraService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.estructuras = []
  }


  ngOnInit(): void {
    this.sharedService.nabvarOption.emit("estructura");
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
        if(this.usuarioSession.fkRol.nombre == 'Administrador'){
          this.cargarTabla();
        }else{
          this.cargarTablaUsuario();
        }
      }
    })
  }

  cargarTabla(){
    this.estructuraService.getEstructuras().subscribe(r => {
      if(!r.error){
        this.estructuras = r.data;
        this.dataSource.data = this.estructuras;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  cargarTablaUsuario(){
    this.estructuraService.getEstructurasUsuario(this.usuarioSession.id).subscribe( r => {
      if(!r.error){
        this.estructuras = r.data;
        this.dataSource.data = this.estructuras;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  onNuevaEstructura(){
    this.router.navigate(['inicio/estructuras/estructura']);
  }
  onDetalles(idEstructura:number){
    this.router.navigate(['inicio/estructuras/estructura/' + idEstructura]);
  }

}
