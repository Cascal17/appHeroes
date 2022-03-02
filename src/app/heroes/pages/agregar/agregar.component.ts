import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius:5px;
  }

  `
  ]
})
export class AgregarComponent implements OnInit {

  heroe:Heroe ={
    superhero:"",
    alter_ego:"",
    characters: "",
    first_appearance:"",
    publisher: Publisher.DCComics,
    alt_img:""

  }

  publishers = [
    {
      id:"DC Comics",
      desc:"DC - Comics"
    },
    {
      id:"Marvel Comics",
      desc:"Marvel - Comics"
    }
  ]
  constructor( private heroeService: HeroesService,
               private activatedRouted : ActivatedRoute,
               private router: Router,
               private snackbar: MatSnackBar,
               private dialog: MatDialog)
                { }

  ngOnInit(): void {

    if(this.router.url.includes("editar")){

      this.activatedRouted.params
      .pipe(
        switchMap(({id}) => this.heroeService.getHeroePorId(id))
      )

      .subscribe(heroe => this.heroe=heroe);

    }

  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      //Actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe( resp =>{
        this.mostrarSnackbar("Registro Actualizado!")
      })

    }else{
      //Crear
      this.heroeService.agregarHeroe(this.heroe).subscribe( resp =>{

        this.mostrarSnackbar("Registro Guardado!")
      });
    }

  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width:'250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe( resp =>{
      if(resp){
        this.heroeService.borrarHeroe(this.heroe.id!).subscribe(resp => {
      this.router.navigate(['/heroes'])
        })
      }
    })


  }

  mostrarSnackbar(mensaje:string){

    this.snackbar.open(mensaje,"Cerrar",{
      duration:2500
    } )
  }

}
