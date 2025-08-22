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

@Component({
  selector: 'app-root',
  imports: [MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {}

  ngOnInit(): void {
    gsap.registerPlugin(
      TextPlugin,
      ScrollToPlugin,
      ScrollSmoother,
      ScrollTrigger,
      MotionPathPlugin
    );
  }

  ngAfterViewInit(): void {
    this.textAnimations();
    this.nameMainAnimation();
    this.aboutAnimation();
    this.animateRockets();
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
    let item = document.getElementById('sobre');
    gsap.to(item, {
      duration: 3,
      opacity: 1,
      scale: 1,
      scrollTrigger: {
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    });
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
      let scroll = item.offsetTop < 500 ? 0 : item.offsetTop;
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
}
