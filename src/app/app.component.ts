import { isPlatformBrowser } from '@angular/common';
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
import { gsap } from 'gsap';
import {
  TextPlugin,
  ScrollToPlugin,
  ScrollSmoother,
  ScrollTrigger,
} from 'gsap/all';

@Component({
  selector: 'app-root',
  imports: [],
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

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {}

  ngOnInit(): void {
    gsap.registerPlugin(
      TextPlugin,
      ScrollToPlugin,
      ScrollSmoother,
      ScrollTrigger
    );
  }

  ngAfterViewInit(): void {
    ScrollSmoother.create({
      wrapper: this.smoothWrapper.nativeElement,
      content: this.smoothContent.nativeElement,
      smooth: 4,
      effects: true,
    });
    this.textAnimations();
    this.nameMainAnimation();
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
      paused: true,
    });

    let rotate = gsap.to('#name', {
      rotationX: 25,
      rotationY: 45,
      y: -30,
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
}
