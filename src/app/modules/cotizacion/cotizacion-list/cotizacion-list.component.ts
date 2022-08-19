import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CotizacionI } from '@data/interfaces/api/CotizacionI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { CotizacionService } from '@data/services/cotizacion/cotizacion.service';
import { FileService } from '@data/services/file/file.service';
import { SharedService } from '@data/services/shared/shared.service';

@Component({
  selector: 'app-cotizacion-list',
  templateUrl: './cotizacion-list.component.html',
  styleUrls: ['./cotizacion-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CotizacionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['nombre', 'cliente', 'fechaCreacion', 'idUsuario', 'opciones'];
  dataSource: MatTableDataSource<CotizacionI> = new MatTableDataSource<CotizacionI>([]);

  public cotizaciones: CotizacionI[];
  public cotizacion: CotizacionI;
  public modalPdf: boolean;
  public pdfSrc: string;
  public usuarioSession: UsuarioI;


  constructor(
    private router: Router,
    private fileService: FileService,
    private cotizacionService: CotizacionService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    this.modalPdf = false;
  }

  ngOnInit(): void {
    this.sharedService.nabvarOption.emit("cotizacion");
    this.cargarTabla();
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
    this.cotizacionService.getCotizaciones().subscribe(r =>{
      if(!r.error){
        this.cotizaciones = r.data;
        this.dataSource.data = this.cotizaciones;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  cargarTablaUsuario(){
    this.cotizacionService.getCotizacionesUsuario(this.usuarioSession.id).subscribe( r => {
      if(!r.error){
        this.cotizaciones = r.data;
        this.dataSource.data = this.cotizaciones;
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
  onNuevaCotizacion(){
    this.router.navigate(['inicio/estructuras/estructura']);
  }
  onOpenPdfView(nombreCotizacion: string){
    this.fileService.getFile(nombreCotizacion+".pdf").subscribe( blob => {
      this.pdfSrc = URL.createObjectURL(blob);
      this.modalPdf = true;
    })
  }
  onClosePdfView(){
    this.modalPdf = false;
  }

}
