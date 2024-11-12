import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent {
  pdfMaterials = [
    {
      title: 'Angular Guide',
      description: 'A comprehensive PDF guide to get started with Angular.',
      link: 'path/to/angular-guide.pdf',
    },
    {
      title: 'JavaScript Essentials',
      description: 'PDF covering the essentials of JavaScript.',
      link: 'path/to/javascript-essentials.pdf',
    },
    {
      title: 'TypeScript Basics',
      description: 'Introduction to TypeScript, a superset of JavaScript.',
      link: 'path/to/typescript-basics.pdf',
    },
    {
      title: 'CSS Styling Guide',
      description: 'Learn the fundamentals of CSS and how to style web pages.',
      link: 'path/to/css-styling-guide.pdf',
    },
    {
      title: 'HTML5 Overview',
      description: 'An overview of HTML5 features and best practices.',
      link: 'path/to/html5-overview.pdf',
    },
    {
      title: 'Advanced Angular',
      description: 'Deep dive into advanced Angular topics and techniques.',
      link: 'path/to/advanced-angular.pdf',
    },
    {
      title: 'JavaScript Essentials',
      description: 'PDF covering the essentials of JavaScript.',
      link: 'path/to/javascript-essentials.pdf',
    },
    {
      title: 'TypeScript Basics',
      description: 'Introduction to TypeScript, a superset of JavaScript.',
      link: 'path/to/typescript-basics.pdf',
    },
    {
      title: 'CSS Styling Guide',
      description: 'Learn the fundamentals of CSS and how to style web pages.',
      link: 'path/to/css-styling-guide.pdf',
    },
    {
      title: 'HTML5 Overview',
      description: 'An overview of HTML5 features and best practices.',
      link: 'path/to/html5-overview.pdf',
    }
  ];

  pptMaterials = [
    {
      title: 'CSS Basics',
      description: 'A PowerPoint presentation on CSS fundamentals.',
      link: 'path/to/css-basics.pptx',
    },
    {
      title: 'Advanced JavaScript',
      description: 'PowerPoint on advanced JavaScript topics.',
      link: 'path/to/advanced-javascript.pptx',
    },
    {
      title: 'Angular Components',
      description: 'Detailed presentation on Angular components.',
      link: 'path/to/angular-components.pptx',
    },
    {
      title: 'Responsive Design',
      description: 'PowerPoint covering the basics of responsive design.',
      link: 'path/to/responsive-design.pptx',
    },
    {
      title: 'Web Accessibility',
      description: 'Overview of web accessibility practices.',
      link: 'path/to/web-accessibility.pptx',
    },
    {
      title: 'Front-end Development',
      description: 'Presentation on best practices in front-end development.',
      link: 'path/to/frontend-development.pptx',
    }
  ];

  youtubeMaterials = [
    {
      title: 'Intro to Angular',
      description: 'An introductory video about Angular on YouTube.',
      link: 'https://www.youtube.com/watch?v=video-id-1',
    },
    {
      title: 'JavaScript Basics',
      description: 'A video covering JavaScript basics.',
      link: 'https://www.youtube.com/watch?v=video-id-2',
    },
    {
      title: 'CSS Flexbox Guide',
      description: 'YouTube video on using Flexbox in CSS.',
      link: 'https://www.youtube.com/watch?v=video-id-3',
    },
    {
      title: 'HTML Semantic Tags',
      description: 'An overview of semantic HTML tags on YouTube.',
      link: 'https://www.youtube.com/watch?v=video-id-4',
    },
    {
      title: 'Advanced Angular Services',
      description: 'Detailed video about using services in Angular.',
      link: 'https://www.youtube.com/watch?v=video-id-5',
    },
    {
      title: 'JavaScript Promises',
      description: 'Explains JavaScript promises in detail.',
      link: 'https://www.youtube.com/watch?v=video-id-6',
    }
  ];

  showMore = {
    pdf: false,
    ppt: false,
    youtube: false,
  };

  toggleShowMore(type: 'pdf' | 'ppt' | 'youtube') {
    this.showMore[type] = !this.showMore[type];
  }
}
