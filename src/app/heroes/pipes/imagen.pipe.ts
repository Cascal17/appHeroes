import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(valor: Heroe, ...args: unknown[]): string {

    return "assets/heroes/"+valor.id+".jpg";
  }

}
