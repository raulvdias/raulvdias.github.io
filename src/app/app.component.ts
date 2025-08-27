import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { gsap } from 'gsap';
import {
  TextPlugin,
  ScrollToPlugin,
  ScrollSmoother,
  ScrollTrigger,
  MotionPathPlugin,
} from 'gsap/all';
import { bounceInOnEnterAnimation } from 'angular-animations';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [bounceInOnEnterAnimation({ duration: 500, delay: 200 })],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Raul V. Dias';
  @ViewChild('smoothWrapper') smoothWrapper!: ElementRef;
  @ViewChild('smoothContent') smoothContent!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let header = document.querySelector('header');
    if (window.pageYOffset !== 0) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  rocket: any;
  rocketTimeline: any;
  form: any;

  constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    gsap.registerPlugin(
      TextPlugin,
      ScrollToPlugin,
      ScrollSmoother,
      ScrollTrigger,
      MotionPathPlugin
    );

    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.textAnimations();
    this.nameMainAnimation();
    this.aboutAnimation();
    this.animateRockets();
    this.skillsAnimations();
    this.scrollBottomAnimations();
  }

  textAnimations() {
    gsap.from('span', {
      duration: 1.5,
      text: '',
    });
  }

  nameMainAnimation() {
    let animation = gsap.set('#name', {
      scale: 1.1,
      y: -30,
      paused: true,
      ease: 'power1.inOut',
    });

    let rotate = gsap.to('#name', {
      duration: 1,
      ease: 'power1.inOut',
      paused: true,
    });

    let a = document.getElementById('name');
    if (a != null) {
      a.addEventListener('mouseenter', () => {
        animation.play();
        rotate.play();
      });

      a.addEventListener('mouseleave', () => {
        animation.reverse();
        rotate.reverse();
      });
    }
  }

  aboutAnimation() {
    let item = document.getElementById('about');
    gsap.fromTo(
      item,
      {
        xPercent: -50,
        opacity: 0,
      },
      {
        duration: 2,
        xPercent: 0,
        opacity: 1,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom 50%',
        },
      }
    );
  }

  animateRockets() {
    this.rocket = document.getElementById('rocket');

    this.rocketTimeline = gsap.timeline();

    this.rocketTimeline
      .to(this.rocket, { x: 50, rotate: 60, duration: 1 })
      .to(this.rocket, {
        duration: 10,
        x: window.screen.width - 70,
        y: 120,
        delay: 0,
        rotate: 180,
      })
      .to(this.rocket, {
        duration: 10,
        x: window.screen.width / 4,
        y: 550,
        rotate: 260,
      })
      .to(this.rocket, { duration: 1, x: -100, y: 100 })
      .to(this.rocket, {
        duration: 10,
        x: window.innerWidth - 100,
        y: 100,
        rotate: -160,
        visibility: 'hidden',
      })
      .to(this.rocket, { duration: 10, x: -100, y: 450, visibility: 'visible' })
      .to(this.rocket, { visibility: 'hidden' });

    if (this.rocket != null) {
      this.rocket.addEventListener('click', () => {
        this.rocketTimeline.kill();
        this.rocket.style.visibility = 'hidden';
      });
    }
  }

  scrollToElement(elem: any): void {
    let item = document.getElementById(elem);
    if (item) {
      let scroll = item.offsetTop < 500 ? 0 : item.offsetTop - 200;
      if (elem == 'timeline') {
        scroll = item.offsetTop - 500;
      }
      gsap.to(window, {
        duration: 2.5,
        scrollTo: scroll,
      });
    }
  }

  resetRocket() {
    this.rocketTimeline.restart();
    this.rocket.style.visibility = 'visible';
  }

  skillsAnimations() {
    const element = document.getElementById('skills');
    gsap.fromTo(
      element,
      {
        xPercent: -50,
        opacity: 0,
      },
      {
        duration: 0.5,
        xPercent: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom 50%',
        },
      }
    );
  }

  scrollBottomAnimations() {
    const element = document.querySelectorAll('#scroll-bottom');

    gsap.fromTo(
      element,
      {
        opacity: 0,
      },
      {
        duration: 0.8,
        opacity: 1,
        repeat: -1,
        yoyo: true,
      }
    );
  }

  redirect(url: string) {
    window.open(url, '_blank');
  }
}
