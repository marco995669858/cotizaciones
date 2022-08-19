import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArchivoI } from '@data/interfaces/api/ArchivoI.interface';
import { RevisionI } from '@data/interfaces/api/RevisionI.interface';
import { ArchivoService } from '@data/services/archivo/archivo.service';
import { CotizacionService } from '@data/services/cotizacion/cotizacion.service';
import { FileService } from '@data/services/file/file.service';
import { RevisionService } from '@data/services/revision/revision.service';
import { environment } from 'environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-estructura-revision',
  templateUrl: './estructura-revision.component.html',
  styleUrls: ['./estructura-revision.component.scss']
})
export class EstructuraRevisionComponent implements OnInit {

  @Output() modalRevisiones = new EventEmitter<boolean>();
  @Input() estructura;

  public revisiones: RevisionI[];
  public archivos: ArchivoI[];
  public archivoEstructura: ArchivoI;
  public nombreArchivo: string;
  public rutaImagen: string;

  constructor(
    private archivoService: ArchivoService,
    private revisionService: RevisionService,
    private cotizacionService: CotizacionService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.archivoService.getArchivoEstructura(this.estructura.id).subscribe( r => {
      if(!r.error){
        this.archivoEstructura = r.data;
        this.rutaImagen = environment.uri + this.archivoEstructura.nombre + ".png";
      }
    })
    this.revisionService.getRevisionesEstructura(this.estructura.id).subscribe( r => {
      if(!r.error){
        this.revisiones = r.data;
      }
    })
    this.archivoService.getArchivosEstructura(this.estructura.id).subscribe( r => {
      if(!r.error){
        this.archivos = r.data;
      }
    })
  }

  onCerrarModal(){
    this.modalRevisiones.next(true);
  }

  
}
