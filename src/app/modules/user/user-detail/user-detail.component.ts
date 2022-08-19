import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaI } from '@data/interfaces/api/AreaI.interface';
import { Rol } from '@data/interfaces/api/RolI.interface';
import { UsuarioI } from '@data/interfaces/api/UsuarioI.interface';
import { AreaService } from '@data/services/area/area.service';
import { AuthService } from '@data/services/auth/auth.service';
import { FileService } from '@data/services/file/file.service';
import { RolService } from '@data/services/rol/rol.service';
import { SharedService } from '@data/services/shared/shared.service';
import { UsuarioService } from '@data/services/usuario/usuario.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public idUsuario: number;
  public usuarioActual: UsuarioI;
  public title: string;
  public usuarioForm: FormGroup;
  public rutaImagen: String | ArrayBuffer;
  public imagen: File;
  public areas: AreaI[];
  public roles: Rol[];
  public area: AreaI;
  public rol: Rol;
  public idArea: number;
  public idRol: number;
  public editar: boolean;
  public usuarioSession: UsuarioI;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private areaService: AreaService,
    private rolService: RolService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    if(this.route.snapshot.params['id']){
      this.idUsuario = +this.route.snapshot.params['id'];
    }
    this.rutaImagen = "";
    this.editar = false;
    this.usuarioActual = new UsuarioI;
  }

  ngOnInit(): void {
    this.authService.session_user().subscribe( r => {
      if(!r.error){
        this.usuarioSession = r.data;
        if(this.usuarioSession.fkRol.nombre != 'Administrador'){
          this.router.navigate(['inicio']);
        }else{
          this.sharedService.nabvarOption.emit('administracion');

          this.usuarioForm = this.formBuilder.group({
            nombre: ['', [Validators.required]],
            correo: ['', [Validators.required]],
            dni: ['', [Validators.required]],
            cargo: ['', [Validators.required]],
            area: ['', [Validators.required]],
            rol: ['', [Validators.required]]
          });
          if(this.idUsuario){
            this.title = 'Usuario';
            this.editar = false;
            this.usuarioService.getUsuario(this.idUsuario).subscribe( r => {
              if(!r.error){
                this.usuarioActual = r.data;
                this.usuarioForm.controls['nombre'].setValue(this.usuarioActual.nombre);
                this.usuarioForm.controls['correo'].setValue(this.usuarioActual.correo);
                this.usuarioForm.controls['dni'].setValue(this.usuarioActual.dni);
                this.usuarioForm.controls['cargo'].setValue(this.usuarioActual.cargo);
                this.usuarioForm.controls['area'].setValue(this.usuarioActual.fkArea.id);
                this.usuarioForm.controls['rol'].setValue(this.usuarioActual.fkRol.id);
                if(this.usuarioActual.imagen != null && this.usuarioActual.imagen != ""){
                  this.rutaImagen = environment.uri + this.usuarioActual.imagen;
                }
                this.area = this.usuarioActual.fkArea;
                this.rol = this.usuarioActual.fkRol;
                this.disableForm();
              }
            });
          }else{
            this.title = 'Nuevo Usuario';
            this.editar = true;
          };

          // Se obtienen las áreas
          this.areaService.getAreas().subscribe( r => {
            if(!r.error){
              this.areas = r.data;
            }
          })
          // Se obtienen los roles
          this.rolService.getRoles().subscribe( r => {
            if(!r.error){
              this.roles = r.data;
            }
          })
        }
      }
    })
  }
  onSave(): any {
    if(this.editar){
      var nuevoUsuario: UsuarioI = this.usuarioActual;
      nuevoUsuario.nombre = this.usuarioForm.value.nombre;
      nuevoUsuario.correo = this.usuarioForm.value.correo;
      nuevoUsuario.dni = this.usuarioForm.value.dni;
      nuevoUsuario.fkRol = this.rol;
      nuevoUsuario.fkArea = this.area;
      nuevoUsuario.cargo = this.usuarioForm.value.cargo;
      if(!this.idUsuario){
        nuevoUsuario.id = this.idUsuario;
      }

      this.usuarioService.postUsuario(nuevoUsuario).subscribe( r => {
        if(!r.error){
          nuevoUsuario = r.data;
          if(this.imagen!=undefined && this.imagen != null){
            let nombreImagen: string = `usuario_${r.data.id}`;
            this.fileService.uploadFile(this.imagen, nombreImagen).subscribe( r2 => {
              nuevoUsuario.imagen = r2.nombreArchivo;
              this.usuarioService.putUsuario(nuevoUsuario).subscribe( r3 => {
                if(!r3.error){
                  this.disableForm()
                }
              });
            })
          }
          this.disableForm();
        }
      });
    }
  }
  onEditarUsuario(){
    this.enableForm();
    this.editar = true;
  }
  onEliminarUsuario(){

  }
  onCancelar(){
    this.router.navigate(['inicio/usuarios']);
  }

  onPreviewImg(event: any){
    this.imagen  = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.rutaImagen = reader.result;
    reader.readAsDataURL(this.imagen);
  }

  onRolSelected(){
    this.rol = this.roles.find( rol => rol.id == this.usuarioForm.value.rol);
  }

  onAreaSelected(){
    this.area = this.areas.find( area =>  area.id == this.usuarioForm.value.area);
  }
  disableForm(){
    this.usuarioForm.controls['nombre'].disable();
    this.usuarioForm.controls['correo'].disable();
    this.usuarioForm.controls['dni'].disable();
    this.usuarioForm.controls['cargo'].disable();
    this.usuarioForm.controls['area'].disable();
    this.usuarioForm.controls['rol'].disable();
    this.editar = false;
  }

  enableForm(){
    this.usuarioForm.controls['nombre'].enable();
    this.usuarioForm.controls['correo'].enable();
    this.usuarioForm.controls['dni'].enable();
    this.usuarioForm.controls['cargo'].enable();
    this.usuarioForm.controls['area'].enable();
    this.usuarioForm.controls['rol'].enable();
    this.editar = true;
  }
}
