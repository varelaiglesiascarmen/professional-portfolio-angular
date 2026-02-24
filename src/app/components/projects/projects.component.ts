import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: number;
  title: string;
  role: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  activeProjectId = signal<number | null>(null);

  projects: Project[] = [
    {
      id: 1,
      title: 'Proyecto | TFG Chef Pro',
      role: 'Frontend Engineer & Database Designer',
      company: 'TFG, Freelance',
      date: '2026 - Actualidad',
      description: 'Chef Pro es una aplicación web TFG que conecta a chefs autónomos con comensales, gestionando reservas, disponibilidad y reseñas. La plataforma aplica una arquitectura modular, un diseño adaptativo y una integración completa del frontend, el backend y la base de datos. \nEn este proyecto mi rol principal es la responsable del diseño UI/UX y todo el frontend además de la creación de la base de datos.',
      technologies: ['Angular', 'Angular CLI', 'HTML 5', 'CSS', 'TypeScript', 'MySQL', 'Git', 'GitHub', 'Figma'],
      imageUrl: 'assets/img/chef-pro.png',
      link: 'https://github.com/varelaiglesiascarmen/ChefPro'
    },
    {
      id: 2,
      title: 'Proyecto | Portfolio Porfesional',
      role: 'Frontend Developer & UI Engineer',
      company: 'Proyecto Académico | Freelance',
      date: '2026',
      description: 'Refactorización completa de portafolio personal, migrando de una arquitectura estática basada en Bootstrap a una SPA moderna con Angular 17. Integración de componentes reactivos (Signals) manteniendo la consistencia visual del sistema de diseño original mediante SCSS modular.',
      technologies: ['Angular', 'Angular CLI', 'Bootstrap 5', 'HTML 5', 'SCSS (Sass)', 'CSS3 Animations', 'TypeScript', 'Git', 'GitHub', 'Figma'],
      imageUrl: 'assets/img/portfolio.png',
      link: 'https://github.com/varelaiglesiascarmen/professional-portfolio-angular'
    },
    {
      id: 3,
      title: 'Proyecto | Mimi Rex',
      role: 'Lead Game Developer & UI Designer',
      company: 'Proyecto Colaborativo Extra-Académico | Freelance',
      date: '2025',
      description: 'Videojuego de plataformas 2D inspirado en los clásicos del género. Desarrollé el motor de físicas desde cero, incluyendo el sistema de gravedad, detección de colisiones por ejes (AABB) y mecánicas de salto parabólico. Programé el ciclo de vida de los enemigos y la lógica de scroll lateral infinito, priorizando una experiencia de juego fluida y una respuesta de control precisa mediante JavaScript Vanilla.',
      technologies: ['HTML 5', 'CSS 3', 'JavaScript', 'Sprite Animation', 'Game Mechanics', 'Git', 'GitHub'],
      imageUrl: 'assets/img/mimi-rex.png',
      link: 'https://varelaiglesiascarmen.github.io/Mimi_Rex_VideoGame/'
    },
    {
      id: 4,
      title: 'Proyecto | Andalugeeks',
      role: 'Lead UI/UX Designer & Frontend Developer | FCTs 1º',
      company: 'Andalugeeks',
      date: '2025',
      description: 'Diseño integral de una plataforma digital para una ONG dedicada a la preservación y enriquecimiento del dialecto andaluz. El proyecto consiste en un diccionario normativo (estilo RAE) de términos autónomos andaluces con sus equivalencias al castellano. \nMi propuesta visual fue seleccionada como el diseño oficial por su capacidad para modernizar la identidad del dialecto sin perder su esencia. Creé el sistema de diseño completo en Figma, priorizando la accesibilidad y la rapidez de consulta, e inicié la implementación de los componentes frontend.',
      technologies: ['HTML 5', 'CSS 3', 'JavaScript', 'Git', 'GitHub', 'Figma'],
      imageUrl: 'assets/img/mock-up-andalugeeks.png',
      link: 'https://www.figma.com/design/jUHx00vHbrKeLB0BXUfpLJ/Diccionario?node-id=0-1&p=f&t=LaveCngpnTDgaAjp-0'
    }
  ];

  toggleProject(id: number) {
    this.activeProjectId.update(current => current === id ? null : id);
  }

  trackByProject(index: number, project: Project): number | null {
    return project?.id ?? null;
  }
}
