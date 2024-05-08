import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  
constructor(private router : Router) { }

  onLogin () {
      this.router.navigate(['/login-page', 'avEngineer-dashboard'])
  }

  carouselItems = [
    {
      title: 'Sale 20% Off',
      description: 'Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
      link: '#'
    },
    {
      title: 'Sale 20% Off',
      description: 'Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
      link: '#'
    },
    {
      title: 'Sale 20% Off',
      description: 'Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.',
      link: '#'
    },
  ];
}
