import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/aboutMe/aboutMe.component';
import { CVComponent } from './components/cv/cv.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';


export const routes: Routes = [

  // Routes
  { path: '' , component: HomeComponent },
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'CV', component: CVComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },

  // Default route
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
