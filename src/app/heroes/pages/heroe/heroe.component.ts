import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesRoutingModule } from '../../heroes-routing.module';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`

  img{
    width:100%;
    border-radius: 5px
  }

  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activateRouted: ActivatedRoute , private heroeService: HeroesService) { }

  ngOnInit(): void {
    this.activateRouted.params
    .pipe(
      switchMap((param)=> this.heroeService.getHeroePorId(param.id)),
    )
    .subscribe(heroe => this.heroe=heroe  );

  }

}
