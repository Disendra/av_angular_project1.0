import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  carouselItems = [
    {
      name: 'Anna Trevor',
      role: 'Customer',
      description: 'Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.',
      imageUrl: '/assets/img/client.jpg'
    },
    {
      name: 'Anna Trevor',
      role: 'Customer',
      description: 'Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.',
      imageUrl: '/assets/img/client.jpg'
    },
  ];
}
