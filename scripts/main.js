(function() {
  'use strict';

  /* ------------------------------------- */

  /* animations mixin */

  /* ------------------------------------- */
  var animationsMixin = {
    mounted() {
      /* preloader screen */
      this.animPreloaderScreen(); // initialize animation effects

      window.addEventListener('load', () => this.initAnimation());
    },

    methods: {
      // preloader screen
      animPreloaderScreen() {
        let count = 0;
        const preloader = this.$refs.preloader;

        if (!preloader) {
          return;
        }

        const preloaderContent = preloader.querySelector(".preloader-content");
        const imgs = [...document.images];
        const imgsLength = imgs.length;

        const hidePreloader = () => {
          preloader.setAttribute("style", "--loading-percentage: 100%");
          gsap.timeline().set(".hide-in-preloading", {
            autoAlpha: 1
          }).to(preloaderContent, {
            delay: 0.5,
            autoAlpha: 0
          }).to(preloader, {
            y: "-100%",
            duration: 1,
            ease: "expo.in"
          }, "-=0.5").set(preloader, {
            autoAlpha: 0
          });
        };

        const imgLoaded = () => {
          count++;
          this.loadingPercentage = 100 / imgsLength * count << 0;
          preloader.setAttribute("style", `--loading-percentage: ${this.loadingPercentage}%`);

          if (count === imgsLength) {
            hidePreloader();
          }
        };

        if (imgsLength) {
          // setup preloader indicator
          imgs.forEach(img => {
            const tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img.src;
          });
        } else {
          hidePreloader();
        }
      },

      // initialize animation effects
      initAnimation() {
        gsap.registerPlugin(ScrollTrigger);
        /* back to top scroll indicator */

        this.animBackTopScrollIndicator();
        /* statistics items */

        this.animStatisticsItems();
        /* section text box */

        this.animSectionTextBox();
        /* about image */

        this.animAboutImage();
        /* skills items */

        this.animSkillsItems();
        /* experience items timeline */

        this.animExperienceItemsTimeline();
        /* testimonials section title */

        this.animTestimonialsSectionTitle();
        /* testimonials items */

        this.animTestimonialsItems();
        /* contact info */

        this.animContactInfo();
        /* contact form */

        this.animContactForm();
      },

      // back to top scroll indicator
      animBackTopScrollIndicator() {
        const backTopBtn = this.$refs.scrollTopBtn;

        if (!backTopBtn) {
          return;
        }

        const showAt = backTopBtn.getAttribute('data-show-at');
        const backTopBtnPath = backTopBtn.querySelector("path");
        const backTopBtnPathLength = backTopBtnPath.getTotalLength();
        gsap.from(backTopBtn, {
          ease: "none",
          duration: 0.3,
          autoAlpha: 0,
          y: 10,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            toggleActions: "play none none reverse"
          }
        });
        gsap.set(backTopBtnPath, {
          strokeDasharray: backTopBtnPathLength,
          strokeDashoffset: backTopBtnPathLength,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            onUpdate: self => backTopBtnPath.style.strokeDashoffset = backTopBtnPathLength - self.progress * backTopBtnPathLength
          }
        });
      },

      // statistics items
      animStatisticsItems() {
        const statisticsItems = gsap.utils.toArray(".statistics-section .statistics-items li");

        if (!statisticsItems.length) {
          return;
        }

        const statisticsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".statistics-items",
            start: "top 82%",
            end: "top 50%",
            scrub: 0.3
          }
        });
        statisticsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          statisticsItemsTL.from(el, {
            autoAlpha: 0
          }, pos).from(el, {
            y: 50
          }, "<");
        });
      },

      // section text box
      animSectionTextBox() {
        const textBoxes = gsap.utils.toArray(".text-box-inline");

        if (!textBoxes.length) {
          return;
        }

        textBoxes.forEach(box => {
          gsap.timeline({
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3
            }
          }).from(box.querySelector(".subtitle"), {
            autoAlpha: 0,
            top: 50
          }).from(box.querySelector("h2"), {
            autoAlpha: 0,
            y: 50
          }, "-=0.2").from(box.querySelectorAll("h2 ~ *"), {
            autoAlpha: 0,
            y: 50,
            stagger: 0.2
          }, "-=0.2");
        });
      },

      // about image
      animAboutImage() {
        if (!this.$refs.aboutSection) {
          return;
        }

        gsap.timeline({
          scrollTrigger: {
            trigger: ".about-section .about-img",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.3
          }
        }).from(".about-section .about-img", {
          autoAlpha: 0,
          scale: 0.5
        });
      },

      // skills items
      animSkillsItems() {
        const skillsGroups = gsap.utils.toArray(".skills-section .skills-items ul");

        if (!skillsGroups.length) {
          return;
        }

        skillsGroups.forEach(group => {
          const skillsItemsTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".skills-section .skills-items",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3
            }
          });
          group.querySelectorAll("li").forEach((el, i) => {
            const pos = i === 0 ? "" : "< +=0.2";
            skillsItemsTL.from(el, {
              autoAlpha: 0
            }, pos).from(el, {
              y: 50
            }, "<");
          });
        });
      },

      // experience items timeline
      animExperienceItemsTimeline() {
        const experienceTimepath = this.$refs.experienceTimepath;
        const experienceItems = gsap.utils.toArray(".experience-timeline .timeline-items li");
        let experienceTimepathTL;
        let experienceItemsTL;
        let mainExperienceTL;

        if (experienceTimepath || experienceItems.length) {
          mainExperienceTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".experience-section .experience-timeline",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3
            }
          });
        }

        if (experienceTimepath) {
          const experienceTimepathItems = gsap.utils.toArray(".experience-timeline .timepath span");
          experienceTimepathTL = gsap.timeline();
          const docDir = document.documentElement.dir;
          const fromDir = docDir === "rtl" ? "reverse" : "from";
          const reverseDir = docDir === "rtl" ? "from" : "reverse";
          const coords = {
            x: {
              from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              reverse: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            },
            c: {
              from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 75%, 0% 75%, 0% 75%, 0% 75%)",
              reverse: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 75%, 100% 75%, 100% 75%, 100% 75%)",
              to: {
                from: {
                  st1: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 75% 25%, 75% 25%, 0% 25%)",
                  st2: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 75% 75%, 75% 75%, 75% 25%, 0% 25%)",
                  st3: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 75% 75%, 75% 25%, 0% 25%)"
                },
                reverse: {
                  st1: "polygon(100% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 25% 25%, 25% 25%, 100% 25%)",
                  st2: "polygon(100% 0%, 0% 0%, 0% 100%, 0% 100%, 25% 75%, 25% 75%, 25% 25%, 100% 25%)",
                  st3: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 75%, 25% 75%, 25% 25%, 100% 25%)"
                }
              }
            }
          };
          const lineOdd = [...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 1)")];
          const lineEven = [...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 3)")];
          const semicircleOdd = [...experienceTimepath.querySelectorAll(".semicircle:nth-of-type(4n + 2)")];
          const semicircleEven = [...experienceTimepath.querySelectorAll(".semicircle:nth-of-type(4n + 4)")];
          experienceTimepathTL.set(experienceTimepathItems, {
            autoAlpha: 1
          }).set(lineOdd, {
            clipPath: coords.x[fromDir]
          }).set(lineEven, {
            clipPath: coords.x[reverseDir]
          }).set(semicircleOdd, {
            clipPath: coords.c[fromDir]
          }).set(semicircleEven, {
            clipPath: coords.c[reverseDir]
          });
          experienceTimepathItems.forEach(el => {
            if (lineOdd.includes(el) || lineEven.includes(el)) {
              experienceTimepathTL.to(el, {
                clipPath: coords.x.to
              });
            } else if (semicircleOdd.includes(el)) {
              experienceTimepathTL.to(el, {
                clipPath: coords.c.to[fromDir].st1
              }).to(el, {
                clipPath: coords.c.to[fromDir].st2
              }).to(el, {
                clipPath: coords.c.to[fromDir].st3
              });
            } else if (semicircleEven.includes(el)) {
              experienceTimepathTL.to(el, {
                clipPath: coords.c.to[reverseDir].st1
              }).to(el, {
                clipPath: coords.c.to[reverseDir].st2
              }).to(el, {
                clipPath: coords.c.to[reverseDir].st3
              });
            }
          });
          mainExperienceTL.add(experienceTimepathTL);
        }

        if (experienceItems.length) {
          experienceItemsTL = gsap.timeline();
          experienceItems.forEach(el => {
            experienceItemsTL.from(el, {
              autoAlpha: 0
            }).from(el, {
              scale: 0.2
            }, "<");
          });
          mainExperienceTL.add(experienceItemsTL, "< +=0.5");
        }
      },

      // testimonials section title
      animTestimonialsSectionTitle() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        gsap.timeline({
          scrollTrigger: {
            trigger: ".testimonials-section .section-title",
            start: "top 90%",
            end: "top 40%",
            scrub: 0.3
          }
        }).from(".testimonials-section .section-title .subtitle", {
          autoAlpha: 0,
          top: 50
        }).from(".testimonials-section .section-title .title", {
          autoAlpha: 0,
          y: 50
        }, "< +=0.2");
      },

      // testimonials items
      animTestimonialsItems() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        const testimonialsItems = gsap.utils.toArray(".testimonials-section .testimonials-item");
        const testimonialsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".testimonials-section .testimonials-items",
            start: "top 75%",
            end: "top 25%",
            scrub: 0.3
          }
        });
        testimonialsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          testimonialsItemsTL.from(el, {
            autoAlpha: 0
          }, pos).from(el, {
            scale: 0.2
          }, "<");
        });
      },

      // contact info
      animContactInfo() {
        const contactInfoItems = gsap.utils.toArray(".contact-section .contact-info li");

        if (!contactInfoItems.length) {
          return;
        }

        const contactInfoTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-section .contact-info",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.3
          }
        });
        contactInfoItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          contactInfoTL.from(el, {
            autoAlpha: 0
          }, pos).from(el, {
            y: 50
          }, "<");
        }); // social icons animation

        contactInfoTL.from(".contact-section .contact-text .social li", {
          autoAlpha: 0
        }).from(".contact-section .contact-text .social li", {
          y: 50,
          stagger: 0.2
        }, "<");
      },

      // contact form
      animContactForm() {
        if (!this.$refs.contactForm) {
          return;
        }

        gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-section .contact-form",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.3
          }
        }).from(".contact-section .contact-form", {
          autoAlpha: 0,
          scale: 0.7
        });
      }

    }
  };

  /* ------------------------------------- */
  const app = Vue.createApp({
    mixins: [animationsMixin],

    data() {
      return {
        // the date my career started (change to yours)
        careerStartDate: 2010,
        // the date copyright started (change to yours)
        copyrightStartDate: 2021,
        // for the template theme
        appTheme: 'light_theme',
        savedTheme: null,
        // flag to toggle the preloader
        isPreloading: true,
        // toast notifications array
        notifications: [],
        // manage loading spinner status
        ajaxLoading: [],
        // for minimizing the header on scrolling down
        startMinimizingHeaderAt: 100,
        isHeaderBig: true,
        // for toggling the header on scrolling down
        lastScrollPosition: 0,
        isHeaderHidden: false,
        // flag to toggle focus style class
        isAnyFocus: false,
        // flag to toggle nav menu
        isNavMenuOpen: false,
        // list of nav links to loop through it
        navLinks: [{
          url: '#hero',
          title: {
            en: 'Home',
            ar: 'الرئيسية'
          }
        }, {
          url: '#about',
          title: {
            en: 'About',
            ar: 'من أنا'
          }
        }, {
          url: '#skills',
          title: {
            en: 'Skills',
            ar: 'مهاراتي'
          }
        }, {
          url: '#portfolio',
          title: {
            en: 'Portfolio',
            ar: 'أعمالي'
          }
        }, {
          url: '#contact',
          title: {
            en: 'Contact',
            ar: 'اتصل بي'
          }
        }],
        // flag to toggle between skills types in skills section
        skillsType: '',
        // list of skills items to loop through it
        skillsItems: [{
          imgUrl: 'https://via.placeholder.com/48',
          title: 'HTML5'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'CSS3'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'JavaScript'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'TypeScript'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'jQuery'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Bootstrap'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Angular'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'React'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Vue'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Firebase'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'PugJS'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'SASS'
        }],
        // list of tools items to loop through it
        toolsItems: [{
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Ajax'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Gulp'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Webpack'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Git (Github)'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Npm'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Command Line'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'VS Code'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Trello'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'ClickUp'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Slack'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Photoshop'
        }, {
          imgUrl: 'https://via.placeholder.com/48',
          title: 'Adobe XD'
        }],
        // list of experience items to loop through it
        experienceItems: [{
          date: '2010',
          companyName: {
            en: 'Google Inc.',
            ar: 'شركة جوجل'
          },
          jobTitle: {
            en: 'Front-End Developer',
            ar: 'مطور الواجهة الأمامية'
          },
          desc: {
            en: 'Monitored technical aspects of the front-end delivery for projects.',
            ar: 'مراقبة الجوانب الفنية لتطوير الواجهات الأمامية للمشاريع.'
          }
        }, {
          date: '2012',
          companyName: {
            en: 'Facebook Inc.',
            ar: 'شركة فيسبوك'
          },
          jobTitle: {
            en: 'Full Stack Developer',
            ar: 'مطوّر الويب المتكامل'
          },
          desc: {
            en: 'Collaborate with creative and development teams on the execution of ideas.',
            ar: 'تعاونت مع الفرق الإبداعية في تطوير وتنفيذ أفكار مبتكرة.'
          }
        }, {
          date: '2014',
          companyName: {
            en: 'Envato Inc.',
            ar: 'شركة انفاتو'
          },
          jobTitle: {
            en: 'UI/UX Developer',
            ar: 'مطور UI/UX'
          },
          desc: {
            en: 'Converted Photoshop layouts to web pages using HTML, CSS, and JavaScript.',
            ar: 'تم تحويل تخطيطات Photoshop إلى صفحات ويب باستخدام HTML و CSS و JavaScript.'
          }
        }, {
          date: '2016',
          companyName: {
            en: 'Google Inc.',
            ar: 'شركة جوجل'
          },
          jobTitle: {
            en: 'Front-End Developer',
            ar: 'مطور الواجهة الأمامية'
          },
          desc: {
            en: 'Monitored technical aspects of the front-end delivery for projects.',
            ar: 'مراقبة الجوانب الفنية لتطوير الواجهات الأمامية للمشاريع.'
          }
        }, {
          date: '2018',
          companyName: {
            en: 'Facebook Inc.',
            ar: 'شركة فيسبوك'
          },
          jobTitle: {
            en: 'Full Stack Developer',
            ar: 'مطوّر الويب المتكامل'
          },
          desc: {
            en: 'Collaborate with creative and development teams on the execution of ideas.',
            ar: 'تعاونت مع الفرق الإبداعية في تطوير وتنفيذ أفكار مبتكرة.'
          }
        }, {
          date: '2020',
          companyName: {
            en: 'Google Inc.',
            ar: 'شركة جوجل'
          },
          jobTitle: {
            en: 'Front-End Developer',
            ar: 'مطور الواجهة الأمامية'
          },
          desc: {
            en: 'Monitored technical aspects of the front-end delivery for projects.',
            ar: 'مراقبة الجوانب الفنية لتطوير الواجهات الأمامية للمشاريع.'
          }
        }, {
          date: '2022',
          companyName: {
            en: 'Facebook Inc.',
            ar: 'شركة فيسبوك'
          },
          jobTitle: {
            en: 'Full Stack Developer',
            ar: 'مطوّر الويب المتكامل'
          },
          desc: {
            en: 'Collaborate with creative and development teams on the execution of ideas.',
            ar: 'تعاونت مع الفرق الإبداعية في تطوير وتنفيذ أفكار مبتكرة.'
          }
        }, {}, {}],
        // current page of portfolio items
        portfolioItemsPage: 1,
        // portfolio items per page
        itemsPerPage: 7,
        // portfolio items filter by type
        filters: ['All', 'HTML', 'Angular', 'Vue'],
        currentFilter: 'All',
        // portfolio archive name
        portfolioArchiveName: '',
        // list of portfolio items to loop through it
        allPortfolioItems: [{
          id: 1,
          url: 'single-portfolio.html?id=1',
          imgUrl: 'https://via.placeholder.com/400x400',
          title: {
            en: 'Lorem Ipsum Dolor 1',
            ar: 'هنا عنوان المشروع 1'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Bootstrap', 'AJAX', 'Vue', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 2,
          url: 'single-portfolio.html?id=2',
          imgUrl: 'https://via.placeholder.com/530x300',
          title: {
            en: 'Lorem Ipsum Dolor 2',
            ar: 'هنا عنوان المشروع 2'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'TailwindCSS', 'AJAX', 'Angular', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 3,
          url: 'single-portfolio.html?id=3',
          imgUrl: 'https://via.placeholder.com/390x390',
          title: {
            en: 'Lorem Ipsum Dolor 3',
            ar: 'هنا عنوان المشروع 3'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Materialize', 'AJAX', 'Vue', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 4,
          url: 'single-portfolio.html?id=4',
          imgUrl: 'https://via.placeholder.com/340x510',
          title: {
            en: 'Lorem Ipsum Dolor 4',
            ar: 'هنا عنوان المشروع 4'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'TailwindCSS', 'AJAX', 'Angular', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 5,
          url: 'single-portfolio.html?id=5',
          imgUrl: 'https://via.placeholder.com/380x215',
          title: {
            en: 'Lorem Ipsum Dolor 5',
            ar: 'هنا عنوان المشروع 5'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Bootstrap', 'AJAX', 'Vue', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 6,
          url: 'single-portfolio.html?id=6',
          imgUrl: 'https://via.placeholder.com/400x300',
          title: {
            en: 'Lorem Ipsum Dolor 6',
            ar: 'هنا عنوان المشروع 6'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Materialize', 'AJAX', 'Angular', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 7,
          url: 'single-portfolio.html?id=7',
          imgUrl: 'https://via.placeholder.com/380x215',
          title: {
            en: 'Lorem Ipsum Dolor 7',
            ar: 'هنا عنوان المشروع 7'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Bootstrap', 'AJAX', 'Vue', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 8,
          url: 'single-portfolio.html?id=8',
          imgUrl: 'https://via.placeholder.com/340x340',
          title: {
            en: 'Lorem Ipsum Dolor 8',
            ar: 'هنا عنوان المشروع 8'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'TailwindCSS', 'AJAX', 'Angular', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 9,
          url: 'single-portfolio.html?id=9',
          imgUrl: 'https://via.placeholder.com/300x375',
          title: {
            en: 'Lorem Ipsum Dolor 9',
            ar: 'هنا عنوان المشروع 9'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Materialize', 'AJAX', 'Vue', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 10,
          url: 'single-portfolio.html?id=10',
          imgUrl: 'https://via.placeholder.com/350x200',
          title: {
            en: 'Lorem Ipsum Dolor 10',
            ar: 'هنا عنوان المشروع 10'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Bootstrap', 'AJAX', 'Angular', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 11,
          url: 'single-portfolio.html?id=11',
          imgUrl: 'https://via.placeholder.com/400x300',
          title: {
            en: 'Lorem Ipsum Dolor 11',
            ar: 'هنا عنوان المشروع 11'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'TailwindCSS', 'AJAX', 'Angular', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 12,
          url: 'single-portfolio.html?id=12',
          imgUrl: 'https://via.placeholder.com/300x280',
          title: {
            en: 'Lorem Ipsum Dolor 12',
            ar: 'هنا عنوان المشروع 12'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Materialize', 'AJAX', 'Vue', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 13,
          url: 'single-portfolio.html?id=13',
          imgUrl: 'https://via.placeholder.com/300x270',
          title: {
            en: 'Lorem Ipsum Dolor 13',
            ar: 'هنا عنوان المشروع 13'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'TailwindCSS', 'AJAX', 'Angular', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 14,
          url: 'single-portfolio.html?id=14',
          imgUrl: 'https://via.placeholder.com/375x500',
          title: {
            en: 'Lorem Ipsum Dolor 14',
            ar: 'هنا عنوان المشروع 14'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Bootstrap', 'AJAX', 'Vue', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 15,
          url: 'single-portfolio.html?id=15',
          imgUrl: 'https://via.placeholder.com/375x240',
          title: {
            en: 'Lorem Ipsum Dolor 15',
            ar: 'هنا عنوان المشروع 15'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'Materialize', 'AJAX', 'Angular', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 16,
          url: 'single-portfolio.html?id=16',
          imgUrl: 'https://via.placeholder.com/570x400',
          title: {
            en: 'Lorem Ipsum Dolor 16',
            ar: 'هنا عنوان المشروع 16'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'HTML',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Bootstrap', 'AJAX', 'Vue', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 17,
          url: 'single-portfolio.html?id=17',
          imgUrl: 'https://via.placeholder.com/375x300',
          title: {
            en: 'Lorem Ipsum Dolor 17',
            ar: 'هنا عنوان المشروع 17'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Angular',
          tools: ['HTML', 'PugJS', 'CSS', 'SCSS', 'JavaScript', 'Gulp', 'TailwindCSS', 'AJAX', 'Angular', 'Firebase'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }, {
          id: 18,
          url: 'single-portfolio.html?id=18',
          imgUrl: 'https://via.placeholder.com/350x500',
          title: {
            en: 'Lorem Ipsum Dolor 18',
            ar: 'هنا عنوان المشروع 18'
          },
          date: {
            en: 'April 2021',
            ar: 'أبريل 2021'
          },
          desc: {
            en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            ar: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.'
          },
          category: 'Vue',
          tools: ['HTML', 'Slim', 'CSS', 'Less', 'JavaScript', 'TypeScript', 'Materialize', 'AJAX', 'Vue', 'NodeJs', 'MongoDB'],
          screenshots: {
            img1: {
              url: 'https://via.placeholder.com/355x200',
              caption: {
                en: 'caption 5',
                ar: 'تسمية توضيحية 5'
              }
            },
            img2: {
              url: 'https://via.placeholder.com/330x460',
              caption: {
                en: 'caption 4',
                ar: 'تسمية توضيحية 4'
              }
            },
            img3: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 3',
                ar: 'تسمية توضيحية 3'
              }
            },
            img4: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 2',
                ar: 'تسمية توضيحية 2'
              }
            },
            img5: {
              url: 'https://via.placeholder.com/300x225',
              caption: {
                en: 'caption 1',
                ar: 'تسمية توضيحية 1'
              }
            }
          }
        }].reverse(),
        // viewed portfolio items
        portfolioItems: [],
        // list of testimonials items to loop through it
        testimonialsItems: [{
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Nafie to anyone.',
            ar: 'محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.'
          },
          quoteAuthor: {
            en: 'Terrell Grimes',
            ar: 'جابر العواني'
          },
          jobTitle: {
            en: 'Photographer',
            ar: 'مصور فوتوغرافي'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Excellent Team to work with. Always positive to find the most appropriate solution. Nafie is one of the professional web development agency that provides awesome services.',
            ar: 'فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.'
          },
          quoteAuthor: {
            en: 'Lonny Corkery',
            ar: 'حسون القلال'
          },
          jobTitle: {
            en: 'Project Manager',
            ar: 'مدير المشاريع'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Nafie in other projects.',
            ar: 'محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.'
          },
          quoteAuthor: {
            en: 'Max Schmidt DDS',
            ar: 'مصطفى الخليفي'
          },
          jobTitle: {
            en: 'CEO, Designer',
            ar: 'أخصائي SEO'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie worked on a handful of projects for us and has always exceeded our expectations. Nafie team is dedicated, talented and a delight to work with.',
            ar: 'عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.'
          },
          quoteAuthor: {
            en: 'Amir Stoltenberg',
            ar: 'عباس العنابي'
          },
          jobTitle: {
            en: 'Sales Manager',
            ar: 'مدير مبيعات'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!',
            ar: 'يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.'
          },
          quoteAuthor: {
            en: 'Kenton Marquardt',
            ar: 'سمير النجار'
          },
          jobTitle: {
            en: 'Art Director',
            ar: 'آرت دايركتور'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.',
            ar: 'أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.'
          },
          quoteAuthor: {
            en: 'Reyna Hammes',
            ar: 'أمير داوود'
          },
          jobTitle: {
            en: 'Motion Graphic Animator',
            ar: 'مصمم موشن جرافيك'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.',
            ar: 'أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.'
          },
          quoteAuthor: {
            en: 'Jovan Parisian',
            ar: 'منصور السقاط'
          },
          jobTitle: {
            en: 'Motion Graphic Animator',
            ar: 'مصمم موشن جرافيك'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!',
            ar: 'يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.'
          },
          quoteAuthor: {
            en: 'Pasquale Deckow',
            ar: 'عطا بن عاشور'
          },
          jobTitle: {
            en: 'Art Director',
            ar: 'آرت دايركتور'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie worked on a handful of projects for us and has always exceeded our expectations. Nafie team is dedicated, talented and a delight to work with.',
            ar: 'عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.'
          },
          quoteAuthor: {
            en: 'Rosa Ferry',
            ar: 'نافع حاتم'
          },
          jobTitle: {
            en: 'Sales Manager',
            ar: 'مدير مبيعات'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Nafie in other projects.',
            ar: 'محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.'
          },
          quoteAuthor: {
            en: 'Keshaun Robel',
            ar: 'صدقي الطويل'
          },
          jobTitle: {
            en: 'CEO, Designer',
            ar: 'أخصائي SEO'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Excellent Team to work with. Always positive to find the most appropriate solution. Nafie is one of the professional web development agency that provides awesome services.',
            ar: 'فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.'
          },
          quoteAuthor: {
            en: 'Casper Paucek',
            ar: 'حسان ادريس'
          },
          jobTitle: {
            en: 'Project Manager',
            ar: 'مدير المشاريع'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Nafie to anyone.',
            ar: 'محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.'
          },
          quoteAuthor: {
            en: 'Archibald Fadel',
            ar: 'مجد الكافي'
          },
          jobTitle: {
            en: 'Photographer',
            ar: 'مصور فوتوغرافي'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie simply provides amazing web development service. Their team is extremely professional and the easiest to meet I have ever worked with. I would recommend Nafie to anyone.',
            ar: 'محمد يقدم خدمات مذهلة في تطوير الويب، ولديه فريق محترف يجعل التعامل معهم مطمئن للغاية. أوصي بفريقهم للجميع.'
          },
          quoteAuthor: {
            en: 'Tabitha Denesik',
            ar: 'آسر بنسلامة'
          },
          jobTitle: {
            en: 'Photographer',
            ar: 'مصور فوتوغرافي'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Excellent Team to work with. Always positive to find the most appropriate solution. Nafie is one of the professional web development agency that provides awesome services.',
            ar: 'فريق ممتاز للعمل معه. إيجابي دائمًا للعثور على الحل الأنسب. هم إحدى شركات تطوير الويب المحترفة التي تقدم خدمات رائعة.'
          },
          quoteAuthor: {
            en: 'Javon Bogan',
            ar: 'صهيب الشريف'
          },
          jobTitle: {
            en: 'Project Manager',
            ar: 'مدير المشاريع'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie team is very professional, always delivers high quality results, and is always there to help. Look forward to working with Nafie in other projects.',
            ar: 'محمد مطور محترف للغاية يقدم دائمًا نتائج عالية الجودة ، وهو دائمًا موجود للمساعدة. نتطلع إلى العمل معه في مشاريع أخرى.'
          },
          quoteAuthor: {
            en: 'Duncan Kemmer',
            ar: 'سيد كرم'
          },
          jobTitle: {
            en: 'CEO, Designer',
            ar: 'أخصائي SEO'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Nafie worked on a handful of projects for us and has always exceeded our expectations. Nafie team is dedicated, talented and a delight to work with.',
            ar: 'عمل محمد في عدد كبير من المشاريع لأجلنا وكان دائمًا يفوق توقعاتنا. مطور متخصص وموهوب ونسعد دائمًا بالعمل معه.'
          },
          quoteAuthor: {
            en: 'Coy Johns',
            ar: 'هيثم الشريف'
          },
          jobTitle: {
            en: 'Sales Manager',
            ar: 'مدير مبيعات'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'I know I can count on your service if I need my project done fast and with the best possible result. I am a regular customer and hope to continue our work!',
            ar: 'يمكنني الاعتماد على خدمات محمد دائمًا وخاصة إذا كنت بحاجة إلى إنجاز مشروعي في أقل وقت وبأفضل نتيجة ممكنة. أنا عميل منتظم لديه وآمل أن نواصل عملنا معا دائمًا.'
          },
          quoteAuthor: {
            en: 'Murphy Roberts',
            ar: 'إسلام مصطفى'
          },
          jobTitle: {
            en: 'Art Director',
            ar: 'آرت دايركتور'
          }
        }, {
          imgUrl: 'https://via.placeholder.com/200',
          quoteContent: {
            en: 'Muhammad was a real pleasure to work with and we look forward to working with him again. He’s definitely the kind of developer you can trust with a project from start to finish.',
            ar: 'أنا سعيد حقًا بالعمل مع محمد وأتطلع إلى العمل معه مرة أخرى قريبا. هو بالتأكيد من المطورين الذي يمكنك الوثوق بهم للعمل على مشروعك من البداية إلى النهاية.'
          },
          quoteAuthor: {
            en: 'Dimitri Lockman',
            ar: 'وسيم السقا'
          },
          jobTitle: {
            en: 'Motion Graphic Animator',
            ar: 'مصمم موشن جرافيك'
          }
        }]
      };
    },

    created() {
      // get a theme to use
      this.getAppTheme();
    },

    mounted() {
      if (window.innerWidth >= 992) {
        // initialize circle cursor
        this.initCircleCursor(); // apply pan effect hero image

        this.heroImgPanEffect(); // initialize VanillaTilt library in portfolio section

        this.initializeTilt();
      } // nav menu tab trap


      this.navMenuTabTrap(); // scrolling options

      this.scrollingOptions();
      document.addEventListener('scroll', () => this.scrollingOptions()); // initialize popper.js plugin

      document.querySelectorAll('.has-ultimate-tooltip').forEach(el => {
        Popper.createPopper(el, el.querySelector('.ultimate-tooltip'), {
          placement: 'top',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 30]
            }
          }]
        });
      }); // get portfolio items

      this.getPortfolioItems(); // init glightbox plugin

      new GLightbox({
        autoplayVideos: false
      }); // initialize the first displayed type of skills

      this.initSkillsFirstType();
    },

    methods: {
      // initialize circle cursor
      initCircleCursor() {
        const app = this.$refs.appRef;
        const outer = this.$refs.circleCursorOuter;
        const inner = this.$refs.circleCursorInner; // return if disabled

        if (!outer || !inner) {
          return;
        }

        app.addEventListener('mousemove', e => {
          // make the circles follow the cursor
          outer.setAttribute('style', `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`);
          inner.setAttribute('style', `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`); // add link hover style

          e.target.closest('a') || e.target.closest('button') || e.target.closest('.link-hover') ? inner.classList.add('cursor-link-hover') : inner.classList.remove('cursor-link-hover');
        });
        app.addEventListener('click', () => {
          // add pulse effect on click
          inner.classList.add('cursor-click-effect');
          setTimeout(() => inner.classList.remove('cursor-click-effect'), 200);
        });
      },

      // get a theme to use
      getAppTheme() {
        // get the saved theme from the localStorage
        const storageSavedTheme = localStorage.getItem('nafieSavedTheme'); // Check to see if there a saved theme

        if (storageSavedTheme) {
          this.savedTheme = storageSavedTheme;
        } else {
          // So, try to get the browser default theme or make your own default
          // Check to see if Media-Queries are supported
          if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              this.savedTheme = 'dark_theme';
            } else {
              this.savedTheme = 'light_theme';
            }
          } else {
            // Default (when Media-Queries are not supported)
            this.savedTheme = this.appTheme;
          }
        } // save the new theme in the localStorage


        localStorage.setItem('nafieSavedTheme', this.savedTheme);
      },

      // detect the theme changes
      changeAppTheme() {
        this.savedTheme === 'light_theme' ? this.savedTheme = 'dark_theme' : this.savedTheme = 'light_theme'; // save the new theme in the localStorage

        localStorage.setItem('nafieSavedTheme', this.savedTheme);
      },

      // toggle nav menu
      toggleNavMenu() {
        this.isNavMenuOpen = !this.isNavMenuOpen;
        this.isNavMenuOpen ? this.openNavMenu() : this.closeNavMenu();
      },

      // open nav menu
      openNavMenu() {
        const bodyEl = document.getElementsByTagName('body')[0];
        this.isNavMenuOpen = true;
        bodyEl.setAttribute('style', 'overflow-y: hidden;'); // set focus on nav menu

        this.$refs.headerNav.querySelector('.desktop-menu-content').focus();
      },

      // close nav menu
      closeNavMenu() {
        const bodyEl = document.getElementsByTagName('body')[0];
        this.isNavMenuOpen = false;
        bodyEl.removeAttribute('style'); // set focus on nav menu toggle button

        this.$refs.navMenuToggleBtn.focus();
      },

      // nav menu tab trap
      navMenuTabTrap() {
        const nav = this.$refs.headerNav;
        const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
        let firstTabStop;
        let lastTabStop;
        let isFirstTabStop;
        let isLastTabStop;
        document.addEventListener('keyup', e => {
          if (nav.classList.contains('menu-open')) {
            // get first & last focusable elements in the side menu for the tab trap
            const visibleFocusableEls = [...nav.querySelectorAll(focusableElementsString)].filter(el => window.getComputedStyle(el).getPropertyValue('visibility') !== 'hidden');
            firstTabStop = visibleFocusableEls[0];
            lastTabStop = visibleFocusableEls[visibleFocusableEls.length - 1];

            if (e.code === 'Tab') {
              if (e.shiftKey)
              /* shift + tab */
              {
                // if this is the first item, move to the last item
                isFirstTabStop && lastTabStop.focus();
              } else
              /* tab */
              {
                // if this is the last item, go back to the first item
                isLastTabStop && firstTabStop.focus();
              } // close nav menu on Escape button press

            } else if (e.code === 'Escape') {
              this.toggleNavMenu();
            } // get current active element


            const activeEl = document.activeElement; // check if last item or not

            isLastTabStop = activeEl === lastTabStop ? true : false; // check if first item or not

            isFirstTabStop = activeEl === firstTabStop ? true : false;
          }
        });
      },

      // apply pan effect hero image
      heroImgPanEffect() {
        const parent = this.$refs.heroSection; // return if disabled

        if (!parent || !parent.getAttribute('data-paneffect')) {
          return;
        }

        const layer1 = parent.querySelectorAll('.layer')[0];
        const layer2 = parent.querySelectorAll('.layer')[1];
        parent.addEventListener('mousemove', e => {
          const x = (e.x - parent.getBoundingClientRect().x) / parent.offsetWidth * 100;
          const y = (e.y - parent.getBoundingClientRect().y) / parent.offsetHeight * 100;
          parent.classList.add('parallax-animation');
          layer1.setAttribute('style', `transform-origin: ${x}vw ${y}vh;`);
          layer2.setAttribute('style', `transform-origin: ${x}vw ${y}vh;`);
        });
      },

      // scrolling options
      scrollingOptions() {
        const scrollPosition = window.pageYOffset; // check for current scroll position to minimize the header

        this.isHeaderBig = scrollPosition >= this.startMinimizingHeaderAt ? false : true; // check for current scroll position to toggle the header

        this.isHeaderHidden = scrollPosition > 100 && scrollPosition > this.lastScrollPosition ? true : false;
        this.lastScrollPosition = scrollPosition;
      },

      // scroll to top
      scrollToTop() {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        });
      },

      // initialize the first displayed type of skills
      initSkillsFirstType() {
        const skillsSwitchBtn = this.$refs.skillsSwitchBtn; // return if disabled

        if (!skillsSwitchBtn) {
          return;
        }

        this.skillsType = skillsSwitchBtn.querySelector('input').value;
      },

      // initialize VanillaTilt library in portfolio section
      initializeTilt() {
        const portfolioItems = this.$refs.portfolioItems; // return if disabled

        if (!portfolioItems) {
          return;
        }

        VanillaTilt.init(portfolioItems.querySelectorAll('.portfolio-item'), {
          max: 8,
          speed: 400,
          glare: true,
          'max-glare': 0.3
        });
      },

      // get portfolio items
      getPortfolioItems() {
        const itemsArr = this.allPortfolioItems.filter(item => {
          const urlParams = new URLSearchParams(window.location.search);
          const tax = urlParams.get('tax');

          if (tax) {
            if (tax === 'cat') {
              const cat = urlParams.get('cat');
              this.portfolioArchiveName = cat;
              return item.category === cat;
            } else if (tax === 'tools') {
              const tool = urlParams.get('tools');
              this.portfolioArchiveName = tool;
              return item.tools.includes(tool);
            }
          } else {
            return this.currentFilter === 'All' || item.category === this.currentFilter;
          }
        }).slice(this.filteredPortfolioItems.length, this.portfolioItemsPage * this.itemsPerPage); // check if have works or not

        if (itemsArr.length) {
          this.portfolioItems.push(...itemsArr);
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
          this.portfolioItemsPage++;
        } else {
          // show message "No works" to the user
          this.setNotify({
            className: 'danger',
            msg: this.$refs.portfolioItems.getAttribute('data-no-works-msg'),
            time: 3000
          });
        }
      },

      // filter portfolio items
      filterPortfolioItems(filter) {
        this.currentFilter = filter;
        this.portfolioItemsPage = 1;

        if (this.filteredPortfolioItems.length) {
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
        } else {
          // get new portfolio items
          this.getPortfolioItems();
        }
      },

      // contact form validation
      contactFormValidation() {
        // contact form
        const contactForm = this.$refs.contactForm; // form controls

        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const phone = contactForm.querySelector('input[name="phone"]');
        const message = contactForm.querySelector('textarea'); // form validation status

        let errors = {
          name: {
            required: true,
            minLength: true
          },
          email: {
            required: true,
            invalid: true
          },
          phone: {
            invalid: true
          },
          message: {
            required: true
          }
        };
        /* --------------- */

        /* name validation */

        /* --------------- */
        // required validation

        if (name.value === '') {
          errors.name.required = true;
          this.setNotify({
            id: 'nameRequired',
            className: 'danger',
            msg: name.closest('.control').querySelector('.errors-msgs .required').value
          });
        } else {
          errors.name.required = false;
          this.dismissNotify('nameRequired');
        } // minlength validation


        if (name.value.length > 0 && name.value.length < name.getAttribute('minlength')) {
          errors.name.minLength = true;
          this.setNotify({
            id: 'nameMinLength',
            className: 'danger',
            msg: name.closest('.control').querySelector('.errors-msgs .minLength').value
          });
        } else {
          errors.name.minLength = false;
          this.dismissNotify('nameMinLength');
        } // toggle invalid errors & style classes


        if (Object.keys(errors.name).some(err => errors.name[err] === true)) {
          name.classList.remove('valid');
          name.classList.add('invalid');
        } else {
          name.classList.remove('invalid');
          name.classList.add('valid');
        }
        /* ---------------- */

        /* email validation */

        /* ---------------- */
        // required validation


        if (email.value === '') {
          errors.email.required = true;
          this.setNotify({
            id: 'emailRequired',
            className: 'danger',
            msg: email.closest('.control').querySelector('.errors-msgs .required').value
          });
        } else {
          errors.email.required = false;
          this.dismissNotify('emailRequired');
        } // email validation


        if (email.value.length > 0 && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)) {
          errors.email.invalid = true;
          this.setNotify({
            id: 'emailInvalid',
            className: 'danger',
            msg: email.closest('.control').querySelector('.errors-msgs .invalid').value
          });
        } else {
          errors.email.invalid = false;
          this.dismissNotify('emailInvalid');
        } // toggle invalid errors & style classes


        if (Object.keys(errors.email).some(err => errors.email[err] === true)) {
          email.classList.remove('valid');
          email.classList.add('invalid');
        } else {
          email.classList.remove('invalid');
          email.classList.add('valid');
        }
        /* ---------------- */

        /* phone validation */

        /* ---------------- */
        // phone validation


        if (phone.value.length > 0 && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone.value)) {
          errors.phone.invalid = true;
          this.setNotify({
            id: 'phoneInvalid',
            className: 'danger',
            msg: phone.closest('.control').querySelector('.errors-msgs .invalid').value
          });
        } else {
          errors.phone.invalid = false;
          this.dismissNotify('phoneInvalid');
        } // toggle invalid errors & style classes


        if (Object.keys(errors.phone).some(err => errors.phone[err] === true)) {
          phone.classList.remove('valid');
          phone.classList.add('invalid');
        } else {
          phone.classList.remove('invalid');
          phone.classList.add('valid');
        }
        /* ------------------ */

        /* message validation */

        /* ------------------ */
        // required validation


        if (message.value === '') {
          errors.message.required = true;
          this.setNotify({
            id: 'messageRequired',
            className: 'danger',
            msg: message.closest('.control').querySelector('.errors-msgs .required').value
          });
        } else {
          errors.message.required = false;
          this.dismissNotify('messageRequired');
        } // toggle invalid errors & style classes


        if (Object.keys(errors.message).some(err => errors.message[err] === true)) {
          message.classList.remove('valid');
          message.classList.add('invalid');
        } else {
          message.classList.remove('invalid');
          message.classList.add('valid');
        } // send the message if the form is valid


        !Object.values(errors).some(control => Object.values(control).some(Boolean)) && this.sendContactFormMessage(contactForm);
      },

      // send message from contact form
      sendContactFormMessage(form) {
        const url = form.getAttribute('action');
        const formData = new FormData(form); // start loading spinner

        this.startLoading(); // send post request

        fetch(url, {
          method: 'POST',
          body: formData
        }).then(res => res.text()).then(data => {
          if (data === 'success') {
            // show success message
            this.setNotify({
              className: 'success',
              msg: form.getAttribute('data-success-msg'),
              time: 5000
            }); // reset all form inputs

            form.reset(); // remove inputs valid classes

            form.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
          } else if (data === 'error') {
            // show error message
            this.setNotify({
              className: 'danger',
              msg: form.getAttribute('data-err-msg'),
              time: 5000
            });
          } // end loading spinner


          this.endLoading();
          console.log(data);
        }).catch(err => console.log(err));
      },

      // show messages by toast notifications
      setNotify({
        id,
        className,
        msg,
        time
      }) {
        const notify = {
          id: id || `${Date.now()}${this.notifications.length}`,
          className,
          msg,
          time
        };

        if (id) {
          !this.notifications.some(e => e.id === id) && this.notifications.push(notify);
        } else {
          this.notifications.push(notify);
        } // remove this notification from the array after (n) seconds


        time && setTimeout(() => this.dismissNotify(notify.id), time);
      },

      // dismiss the notifications
      dismissNotify(id) {
        const index = this.notifications.findIndex(notify => notify.id === id);
        index > -1 && this.notifications.splice(index, 1);
      },

      // add ajax loading spinner
      startLoading() {
        this.ajaxLoading.push(true);
      },

      // remove ajax loading spinner
      endLoading() {
        this.ajaxLoading.pop();
      }

    },
    computed: {
      // flag to toggle ajax loading spinner
      isAjaxLoading() {
        return this.ajaxLoading.some(state => state === true);
      },

      // get the total years of experience
      experienceYears() {
        return new Date(new Date() - new Date(String(this.careerStartDate))).getFullYear() - 1970;
      },

      // split experience items into chunks of 3 items
      experienceChunks() {
        return [...Array(Math.floor((this.experienceItems.length - 1) / 3))];
      },

      // filtered portfolio items
      filteredPortfolioItems() {
        const urlParams = new URLSearchParams(window.location.search);
        const tax = urlParams.get('tax');

        if (tax) {
          return this.portfolioItems;
        } else {
          return this.portfolioItems.filter(item => this.currentFilter === 'All' || item.category === this.currentFilter);
        }
      },

      // get single portfolio item
      getSinglePortfolioItem() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return this.allPortfolioItems.find(item => item.id == id);
      },

      // get the total years of copyright
      copyrightDate() {
        const yearsDuration = new Date(new Date() - new Date(String(this.copyrightStartDate))).getFullYear() - 1970;
        return yearsDuration === 0 ? this.copyrightStartDate : `${this.copyrightStartDate} - ${this.copyrightStartDate + yearsDuration}`;
      }

    },
    directives: {
      // clone directive
      clone: {
        mounted(el) {
          el.parentNode.insertBefore(el.cloneNode(true), el.nextSibling);
        }

      },
      // add stagger delay to children elements
      staggerdelay: {
        mounted(el, binding) {
          [...el.children].forEach((child, i) => {
            child.setAttribute('style', `animation-delay: ${(i + 1) * (binding.value || 100)}ms`);
          });
        }

      },
      // tooltip directive
      tooltip: {
        mounted(el, binding) {
          el.classList.add('has-tooltip');
          el.insertAdjacentHTML('beforeend', `<div class="custom-tooltip custom-tooltip-${binding.value.dir}">${binding.value.text}</div>`);
        }

      }
    }
  });
  app.mount('#app');

})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvYW5pbWF0aW9ucy5taXhpbi5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4vKiBhbmltYXRpb25zIG1peGluICovXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICAvKiBwcmVsb2FkZXIgc2NyZWVuICovXHJcbiAgICB0aGlzLmFuaW1QcmVsb2FkZXJTY3JlZW4oKTtcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvbiBlZmZlY3RzXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMuaW5pdEFuaW1hdGlvbigpKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIC8vIHByZWxvYWRlciBzY3JlZW5cclxuICAgIGFuaW1QcmVsb2FkZXJTY3JlZW4oKSB7XHJcbiAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgIGNvbnN0IHByZWxvYWRlciA9IHRoaXMuJHJlZnMucHJlbG9hZGVyO1xyXG5cclxuICAgICAgaWYgKCFwcmVsb2FkZXIpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBjb25zdCBwcmVsb2FkZXJDb250ZW50ID0gcHJlbG9hZGVyLnF1ZXJ5U2VsZWN0b3IoXCIucHJlbG9hZGVyLWNvbnRlbnRcIik7XHJcbiAgICAgIGNvbnN0IGltZ3MgPSBbLi4uZG9jdW1lbnQuaW1hZ2VzXTtcclxuICAgICAgY29uc3QgaW1nc0xlbmd0aCA9IGltZ3MubGVuZ3RoO1xyXG4gICAgICBjb25zdCBoaWRlUHJlbG9hZGVyID0gKCkgPT4ge1xyXG4gICAgICAgIHByZWxvYWRlci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIi0tbG9hZGluZy1wZXJjZW50YWdlOiAxMDAlXCIpO1xyXG4gICAgICAgIGdzYXAudGltZWxpbmUoKVxyXG4gICAgICAgICAgLnNldChcIi5oaWRlLWluLXByZWxvYWRpbmdcIiwgeyBhdXRvQWxwaGE6IDEgfSlcclxuICAgICAgICAgIC50byhwcmVsb2FkZXJDb250ZW50LCB7IGRlbGF5OiAwLjUsIGF1dG9BbHBoYTogMCB9KVxyXG4gICAgICAgICAgLnRvKHByZWxvYWRlciwgeyB5OiBcIi0xMDAlXCIsIGR1cmF0aW9uOiAxLCBlYXNlOiBcImV4cG8uaW5cIiB9LCBcIi09MC41XCIpXHJcbiAgICAgICAgICAuc2V0KHByZWxvYWRlciwgeyBhdXRvQWxwaGE6IDAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaW1nTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvdW50Kys7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ1BlcmNlbnRhZ2UgPSAoKDEwMCAvIGltZ3NMZW5ndGgpICogY291bnQpIDw8IDA7XHJcbiAgICAgICAgcHJlbG9hZGVyLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGAtLWxvYWRpbmctcGVyY2VudGFnZTogJHt0aGlzLmxvYWRpbmdQZXJjZW50YWdlfSVgKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50ID09PSBpbWdzTGVuZ3RoKSB7IGhpZGVQcmVsb2FkZXIoKTsgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaW1nc0xlbmd0aCkge1xyXG5cclxuICAgICAgICAvLyBzZXR1cCBwcmVsb2FkZXIgaW5kaWNhdG9yXHJcbiAgICAgICAgaW1ncy5mb3JFYWNoKGltZyA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0SW1nID0gbmV3IEltYWdlKCk7XHJcbiAgXHJcbiAgICAgICAgICB0SW1nLm9ubG9hZCA9IGltZ0xvYWRlZDtcclxuICAgICAgICAgIHRJbWcub25lcnJvciA9IGltZ0xvYWRlZDtcclxuICAgICAgICAgIHRJbWcuc3JjID0gaW1nLnNyYztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7IGhpZGVQcmVsb2FkZXIoKTsgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvbiBlZmZlY3RzXHJcbiAgICBpbml0QW5pbWF0aW9uKCkge1xyXG4gICAgICBnc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xyXG5cclxuICAgICAgLyogYmFjayB0byB0b3Agc2Nyb2xsIGluZGljYXRvciAqL1xyXG4gICAgICB0aGlzLmFuaW1CYWNrVG9wU2Nyb2xsSW5kaWNhdG9yKCk7XHJcblxyXG4gICAgICAvKiBzdGF0aXN0aWNzIGl0ZW1zICovXHJcbiAgICAgIHRoaXMuYW5pbVN0YXRpc3RpY3NJdGVtcygpO1xyXG5cclxuICAgICAgLyogc2VjdGlvbiB0ZXh0IGJveCAqL1xyXG4gICAgICB0aGlzLmFuaW1TZWN0aW9uVGV4dEJveCgpO1xyXG5cclxuICAgICAgLyogYWJvdXQgaW1hZ2UgKi9cclxuICAgICAgdGhpcy5hbmltQWJvdXRJbWFnZSgpO1xyXG5cclxuICAgICAgLyogc2tpbGxzIGl0ZW1zICovXHJcbiAgICAgIHRoaXMuYW5pbVNraWxsc0l0ZW1zKCk7XHJcblxyXG4gICAgICAvKiBleHBlcmllbmNlIGl0ZW1zIHRpbWVsaW5lICovXHJcbiAgICAgIHRoaXMuYW5pbUV4cGVyaWVuY2VJdGVtc1RpbWVsaW5lKCk7XHJcblxyXG4gICAgICAvKiB0ZXN0aW1vbmlhbHMgc2VjdGlvbiB0aXRsZSAqL1xyXG4gICAgICB0aGlzLmFuaW1UZXN0aW1vbmlhbHNTZWN0aW9uVGl0bGUoKTtcclxuXHJcbiAgICAgIC8qIHRlc3RpbW9uaWFscyBpdGVtcyAqL1xyXG4gICAgICB0aGlzLmFuaW1UZXN0aW1vbmlhbHNJdGVtcygpO1xyXG5cclxuICAgICAgLyogY29udGFjdCBpbmZvICovXHJcbiAgICAgIHRoaXMuYW5pbUNvbnRhY3RJbmZvKCk7XHJcblxyXG4gICAgICAvKiBjb250YWN0IGZvcm0gKi9cclxuICAgICAgdGhpcy5hbmltQ29udGFjdEZvcm0oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYmFjayB0byB0b3Agc2Nyb2xsIGluZGljYXRvclxyXG4gICAgYW5pbUJhY2tUb3BTY3JvbGxJbmRpY2F0b3IoKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tUb3BCdG4gPSB0aGlzLiRyZWZzLnNjcm9sbFRvcEJ0bjtcclxuXHJcbiAgICAgIGlmICghYmFja1RvcEJ0bikgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIGNvbnN0IHNob3dBdCA9IGJhY2tUb3BCdG4uZ2V0QXR0cmlidXRlKCdkYXRhLXNob3ctYXQnKTtcclxuICAgICAgY29uc3QgYmFja1RvcEJ0blBhdGggPSBiYWNrVG9wQnRuLnF1ZXJ5U2VsZWN0b3IoXCJwYXRoXCIpO1xyXG4gICAgICBjb25zdCBiYWNrVG9wQnRuUGF0aExlbmd0aCA9IGJhY2tUb3BCdG5QYXRoLmdldFRvdGFsTGVuZ3RoKCk7XHJcblxyXG4gICAgICBnc2FwLmZyb20oYmFja1RvcEJ0biwge1xyXG4gICAgICAgIGVhc2U6IFwibm9uZVwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAwLjMsXHJcbiAgICAgICAgYXV0b0FscGhhOiAwLFxyXG4gICAgICAgIHk6IDEwLFxyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgIHRyaWdnZXI6IFwiI2FwcC1pbm5lclwiLFxyXG4gICAgICAgICAgc3RhcnQ6IGAke3Nob3dBdH1weCB0b3BgLFxyXG4gICAgICAgICAgZW5kOiBcImJvdHRvbSBib3R0b21cIixcclxuICAgICAgICAgIHRvZ2dsZUFjdGlvbnM6IFwicGxheSBub25lIG5vbmUgcmV2ZXJzZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZ3NhcC5zZXQoYmFja1RvcEJ0blBhdGgsIHtcclxuICAgICAgICBzdHJva2VEYXNoYXJyYXk6IGJhY2tUb3BCdG5QYXRoTGVuZ3RoLFxyXG4gICAgICAgIHN0cm9rZURhc2hvZmZzZXQ6IGJhY2tUb3BCdG5QYXRoTGVuZ3RoLFxyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgIHRyaWdnZXI6IFwiI2FwcC1pbm5lclwiLFxyXG4gICAgICAgICAgc3RhcnQ6IGAke3Nob3dBdH1weCB0b3BgLFxyXG4gICAgICAgICAgZW5kOiBcImJvdHRvbSBib3R0b21cIixcclxuICAgICAgICAgIG9uVXBkYXRlOiAoc2VsZikgPT4gYmFja1RvcEJ0blBhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGJhY2tUb3BCdG5QYXRoTGVuZ3RoIC0gKHNlbGYucHJvZ3Jlc3MgKiBiYWNrVG9wQnRuUGF0aExlbmd0aCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpc3RpY3MgaXRlbXNcclxuICAgIGFuaW1TdGF0aXN0aWNzSXRlbXMoKSB7XHJcbiAgICAgIGNvbnN0IHN0YXRpc3RpY3NJdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheShcIi5zdGF0aXN0aWNzLXNlY3Rpb24gLnN0YXRpc3RpY3MtaXRlbXMgbGlcIik7XHJcblxyXG4gICAgICBpZiAoIXN0YXRpc3RpY3NJdGVtcy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBjb25zdCBzdGF0aXN0aWNzSXRlbXNUTCA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgIHRyaWdnZXI6IFwiLnN0YXRpc3RpY3MtaXRlbXNcIixcclxuICAgICAgICAgIHN0YXJ0OiBcInRvcCA4MiVcIixcclxuICAgICAgICAgIGVuZDogXCJ0b3AgNTAlXCIsXHJcbiAgICAgICAgICBzY3J1YjogMC4zLFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzdGF0aXN0aWNzSXRlbXMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBjb25zdCBwb3MgPSBpID09PSAwID8gXCJcIiA6IFwiPCArPTAuMlwiO1xyXG4gICAgICAgIHN0YXRpc3RpY3NJdGVtc1RMLmZyb20oZWwsIHsgYXV0b0FscGhhOiAwIH0sIHBvcykuZnJvbShlbCwgeyB5OiA1MCwgfSwgXCI8XCIpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2VjdGlvbiB0ZXh0IGJveFxyXG4gICAgYW5pbVNlY3Rpb25UZXh0Qm94KCkge1xyXG4gICAgICBjb25zdCB0ZXh0Qm94ZXMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoXCIudGV4dC1ib3gtaW5saW5lXCIpO1xyXG5cclxuICAgICAgaWYgKCF0ZXh0Qm94ZXMubGVuZ3RoKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgdGV4dEJveGVzLmZvckVhY2goYm94ID0+IHtcclxuICAgICAgICBnc2FwLnRpbWVsaW5lKHtcclxuICAgICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgICAgdHJpZ2dlcjogYm94LFxyXG4gICAgICAgICAgICBzdGFydDogXCJ0b3AgODUlXCIsXHJcbiAgICAgICAgICAgIGVuZDogXCJ0b3AgMzUlXCIsXHJcbiAgICAgICAgICAgIHNjcnViOiAwLjMsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5mcm9tKGJveC5xdWVyeVNlbGVjdG9yKFwiLnN1YnRpdGxlXCIpLCB7IGF1dG9BbHBoYTogMCwgdG9wOiA1MCB9KVxyXG4gICAgICAgICAgLmZyb20oYm94LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSwgeyBhdXRvQWxwaGE6IDAsIHk6IDUwIH0sIFwiLT0wLjJcIilcclxuICAgICAgICAgIC5mcm9tKGJveC5xdWVyeVNlbGVjdG9yQWxsKFwiaDIgfiAqXCIpLCB7IGF1dG9BbHBoYTogMCwgeTogNTAsIHN0YWdnZXI6IDAuMiB9LCBcIi09MC4yXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYWJvdXQgaW1hZ2VcclxuICAgIGFuaW1BYm91dEltYWdlKCkge1xyXG4gICAgICBpZiAoIXRoaXMuJHJlZnMuYWJvdXRTZWN0aW9uKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgdHJpZ2dlcjogXCIuYWJvdXQtc2VjdGlvbiAuYWJvdXQtaW1nXCIsXHJcbiAgICAgICAgICBzdGFydDogXCJ0b3AgODAlXCIsXHJcbiAgICAgICAgICBlbmQ6IFwidG9wIDUwJVwiLFxyXG4gICAgICAgICAgc2NydWI6IDAuMyxcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmZyb20oXCIuYWJvdXQtc2VjdGlvbiAuYWJvdXQtaW1nXCIsIHsgYXV0b0FscGhhOiAwLCBzY2FsZTogMC41IH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBza2lsbHMgaXRlbXNcclxuICAgIGFuaW1Ta2lsbHNJdGVtcygpIHtcclxuICAgICAgY29uc3Qgc2tpbGxzR3JvdXBzID0gZ3NhcC51dGlscy50b0FycmF5KFwiLnNraWxscy1zZWN0aW9uIC5za2lsbHMtaXRlbXMgdWxcIik7XHJcblxyXG4gICAgICBpZiAoIXNraWxsc0dyb3Vwcy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBza2lsbHNHcm91cHMuZm9yRWFjaChncm91cCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2tpbGxzSXRlbXNUTCA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiBcIi5za2lsbHMtc2VjdGlvbiAuc2tpbGxzLWl0ZW1zXCIsXHJcbiAgICAgICAgICAgIHN0YXJ0OiBcInRvcCA4NSVcIixcclxuICAgICAgICAgICAgZW5kOiBcInRvcCAzNSVcIixcclxuICAgICAgICAgICAgc2NydWI6IDAuMyxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ3JvdXAucXVlcnlTZWxlY3RvckFsbChcImxpXCIpLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwb3MgPSBpID09PSAwID8gXCJcIiA6IFwiPCArPTAuMlwiO1xyXG4gICAgICAgICAgc2tpbGxzSXRlbXNUTC5mcm9tKGVsLCB7IGF1dG9BbHBoYTogMCB9LCBwb3MpLmZyb20oZWwsIHsgeTogNTAsIH0sIFwiPFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGV4cGVyaWVuY2UgaXRlbXMgdGltZWxpbmVcclxuICAgIGFuaW1FeHBlcmllbmNlSXRlbXNUaW1lbGluZSgpIHtcclxuICAgICAgY29uc3QgZXhwZXJpZW5jZVRpbWVwYXRoID0gdGhpcy4kcmVmcy5leHBlcmllbmNlVGltZXBhdGg7XHJcbiAgICAgIGNvbnN0IGV4cGVyaWVuY2VJdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheShcIi5leHBlcmllbmNlLXRpbWVsaW5lIC50aW1lbGluZS1pdGVtcyBsaVwiKTtcclxuICAgICAgbGV0IGV4cGVyaWVuY2VUaW1lcGF0aFRMO1xyXG4gICAgICBsZXQgZXhwZXJpZW5jZUl0ZW1zVEw7XHJcbiAgICAgIGxldCBtYWluRXhwZXJpZW5jZVRMO1xyXG5cclxuICAgICAgaWYgKGV4cGVyaWVuY2VUaW1lcGF0aCB8fCBleHBlcmllbmNlSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgbWFpbkV4cGVyaWVuY2VUTCA9IGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgICB0cmlnZ2VyOiBcIi5leHBlcmllbmNlLXNlY3Rpb24gLmV4cGVyaWVuY2UtdGltZWxpbmVcIixcclxuICAgICAgICAgICAgc3RhcnQ6IFwidG9wIDg1JVwiLFxyXG4gICAgICAgICAgICBlbmQ6IFwidG9wIDM1JVwiLFxyXG4gICAgICAgICAgICBzY3J1YjogMC4zLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXhwZXJpZW5jZVRpbWVwYXRoKSB7XHJcbiAgICAgICAgY29uc3QgZXhwZXJpZW5jZVRpbWVwYXRoSXRlbXMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoXCIuZXhwZXJpZW5jZS10aW1lbGluZSAudGltZXBhdGggc3BhblwiKTtcclxuICAgICAgICBleHBlcmllbmNlVGltZXBhdGhUTCA9IGdzYXAudGltZWxpbmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZG9jRGlyID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpcjtcclxuICAgICAgICBjb25zdCBmcm9tRGlyID0gZG9jRGlyID09PSBcInJ0bFwiID8gXCJyZXZlcnNlXCIgOiBcImZyb21cIjtcclxuICAgICAgICBjb25zdCByZXZlcnNlRGlyID0gZG9jRGlyID09PSBcInJ0bFwiID8gXCJmcm9tXCIgOiBcInJldmVyc2VcIjtcclxuICAgICAgICBjb25zdCBjb29yZHMgPSB7XHJcbiAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgIGZyb206IFwicG9seWdvbigwJSAwJSwgMCUgMCUsIDAlIDEwMCUsIDAlIDEwMCUpXCIsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IFwicG9seWdvbigxMDAlIDAlLCAxMDAlIDAlLCAxMDAlIDEwMCUsIDEwMCUgMTAwJSlcIixcclxuICAgICAgICAgICAgdG86IFwicG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlKVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGM6IHtcclxuICAgICAgICAgICAgZnJvbTogXCJwb2x5Z29uKDAlIDAlLCAwJSAwJSwgMCUgMCUsIDAlIDAlLCAwJSA3NSUsIDAlIDc1JSwgMCUgNzUlLCAwJSA3NSUpXCIsXHJcbiAgICAgICAgICAgIHJldmVyc2U6IFwicG9seWdvbigxMDAlIDAlLCAxMDAlIDAlLCAxMDAlIDAlLCAxMDAlIDAlLCAxMDAlIDc1JSwgMTAwJSA3NSUsIDEwMCUgNzUlLCAxMDAlIDc1JSlcIixcclxuICAgICAgICAgICAgdG86IHtcclxuICAgICAgICAgICAgICBmcm9tOiB7XHJcbiAgICAgICAgICAgICAgICBzdDE6IFwicG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAwJSwgMTAwJSAwJSwgMTAwJSAwJSwgNzUlIDI1JSwgNzUlIDI1JSwgMCUgMjUlKVwiLFxyXG4gICAgICAgICAgICAgICAgc3QyOiBcInBvbHlnb24oMCUgMCUsIDEwMCUgMCUsIDEwMCUgMTAwJSwgMTAwJSAxMDAlLCA3NSUgNzUlLCA3NSUgNzUlLCA3NSUgMjUlLCAwJSAyNSUpXCIsXHJcbiAgICAgICAgICAgICAgICBzdDM6IFwicG9seWdvbigwJSAwJSwgMTAwJSAwJSwgMTAwJSAxMDAlLCAwJSAxMDAlLCAwJSA3NSUsIDc1JSA3NSUsIDc1JSAyNSUsIDAlIDI1JSlcIixcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHJldmVyc2U6IHtcclxuICAgICAgICAgICAgICAgIHN0MTogXCJwb2x5Z29uKDEwMCUgMCUsIDAlIDAlLCAwJSAwJSwgMCUgMCUsIDAlIDAlLCAyNSUgMjUlLCAyNSUgMjUlLCAxMDAlIDI1JSlcIixcclxuICAgICAgICAgICAgICAgIHN0MjogXCJwb2x5Z29uKDEwMCUgMCUsIDAlIDAlLCAwJSAxMDAlLCAwJSAxMDAlLCAyNSUgNzUlLCAyNSUgNzUlLCAyNSUgMjUlLCAxMDAlIDI1JSlcIixcclxuICAgICAgICAgICAgICAgIHN0MzogXCJwb2x5Z29uKDEwMCUgMCUsIDAlIDAlLCAwJSAxMDAlLCAxMDAlIDEwMCUsIDEwMCUgNzUlLCAyNSUgNzUlLCAyNSUgMjUlLCAxMDAlIDI1JSlcIixcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGxpbmVPZGQgPSBbLi4uZXhwZXJpZW5jZVRpbWVwYXRoLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGluZTpudGgtb2YtdHlwZSg0biArIDEpXCIpXTtcclxuICAgICAgICBjb25zdCBsaW5lRXZlbiA9IFsuLi5leHBlcmllbmNlVGltZXBhdGgucXVlcnlTZWxlY3RvckFsbChcIi5saW5lOm50aC1vZi10eXBlKDRuICsgMylcIildO1xyXG4gICAgICAgIGNvbnN0IHNlbWljaXJjbGVPZGQgPSBbLi4uZXhwZXJpZW5jZVRpbWVwYXRoLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VtaWNpcmNsZTpudGgtb2YtdHlwZSg0biArIDIpXCIpXTtcclxuICAgICAgICBjb25zdCBzZW1pY2lyY2xlRXZlbiA9IFsuLi5leHBlcmllbmNlVGltZXBhdGgucXVlcnlTZWxlY3RvckFsbChcIi5zZW1pY2lyY2xlOm50aC1vZi10eXBlKDRuICsgNClcIildO1xyXG4gICAgICAgIGV4cGVyaWVuY2VUaW1lcGF0aFRMXHJcbiAgICAgICAgICAuc2V0KGV4cGVyaWVuY2VUaW1lcGF0aEl0ZW1zLCB7IGF1dG9BbHBoYTogMSB9KVxyXG4gICAgICAgICAgLnNldChsaW5lT2RkLCB7IGNsaXBQYXRoOiBjb29yZHMueFtmcm9tRGlyXSB9KVxyXG4gICAgICAgICAgLnNldChsaW5lRXZlbiwgeyBjbGlwUGF0aDogY29vcmRzLnhbcmV2ZXJzZURpcl0gfSlcclxuICAgICAgICAgIC5zZXQoc2VtaWNpcmNsZU9kZCwgeyBjbGlwUGF0aDogY29vcmRzLmNbZnJvbURpcl0gfSlcclxuICAgICAgICAgIC5zZXQoc2VtaWNpcmNsZUV2ZW4sIHsgY2xpcFBhdGg6IGNvb3Jkcy5jW3JldmVyc2VEaXJdIH0pO1xyXG5cclxuICAgICAgICBleHBlcmllbmNlVGltZXBhdGhJdGVtcy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgIGlmIChsaW5lT2RkLmluY2x1ZGVzKGVsKSB8fCBsaW5lRXZlbi5pbmNsdWRlcyhlbCkpIHtcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVRpbWVwYXRoVEwudG8oZWwsIHsgY2xpcFBhdGg6IGNvb3Jkcy54LnRvIH0pO1xyXG5cclxuICAgICAgICAgIH0gZWxzZSBpZiAoc2VtaWNpcmNsZU9kZC5pbmNsdWRlcyhlbCkpIHtcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVRpbWVwYXRoVExcclxuICAgICAgICAgICAgICAudG8oZWwsIHsgY2xpcFBhdGg6IGNvb3Jkcy5jLnRvW2Zyb21EaXJdLnN0MSB9KVxyXG4gICAgICAgICAgICAgIC50byhlbCwgeyBjbGlwUGF0aDogY29vcmRzLmMudG9bZnJvbURpcl0uc3QyIH0pXHJcbiAgICAgICAgICAgICAgLnRvKGVsLCB7IGNsaXBQYXRoOiBjb29yZHMuYy50b1tmcm9tRGlyXS5zdDMgfSk7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChzZW1pY2lyY2xlRXZlbi5pbmNsdWRlcyhlbCkpIHtcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVRpbWVwYXRoVExcclxuICAgICAgICAgICAgICAudG8oZWwsIHsgY2xpcFBhdGg6IGNvb3Jkcy5jLnRvW3JldmVyc2VEaXJdLnN0MSB9KVxyXG4gICAgICAgICAgICAgIC50byhlbCwgeyBjbGlwUGF0aDogY29vcmRzLmMudG9bcmV2ZXJzZURpcl0uc3QyIH0pXHJcbiAgICAgICAgICAgICAgLnRvKGVsLCB7IGNsaXBQYXRoOiBjb29yZHMuYy50b1tyZXZlcnNlRGlyXS5zdDMgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1haW5FeHBlcmllbmNlVEwuYWRkKGV4cGVyaWVuY2VUaW1lcGF0aFRMKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGV4cGVyaWVuY2VJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICBleHBlcmllbmNlSXRlbXNUTCA9IGdzYXAudGltZWxpbmUoKTtcclxuXHJcbiAgICAgICAgZXhwZXJpZW5jZUl0ZW1zLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgZXhwZXJpZW5jZUl0ZW1zVEwuZnJvbShlbCwgeyBhdXRvQWxwaGE6IDAgfSkuZnJvbShlbCwgeyBzY2FsZTogMC4yLCB9LCBcIjxcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1haW5FeHBlcmllbmNlVEwuYWRkKGV4cGVyaWVuY2VJdGVtc1RMLCBcIjwgKz0wLjVcIik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdGVzdGltb25pYWxzIHNlY3Rpb24gdGl0bGVcclxuICAgIGFuaW1UZXN0aW1vbmlhbHNTZWN0aW9uVGl0bGUoKSB7XHJcbiAgICAgIGlmICghdGhpcy4kcmVmcy50ZXN0aW1vbmlhbHNTZWN0aW9uKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgdHJpZ2dlcjogXCIudGVzdGltb25pYWxzLXNlY3Rpb24gLnNlY3Rpb24tdGl0bGVcIixcclxuICAgICAgICAgIHN0YXJ0OiBcInRvcCA5MCVcIixcclxuICAgICAgICAgIGVuZDogXCJ0b3AgNDAlXCIsXHJcbiAgICAgICAgICBzY3J1YjogMC4zLFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgICAuZnJvbShcIi50ZXN0aW1vbmlhbHMtc2VjdGlvbiAuc2VjdGlvbi10aXRsZSAuc3VidGl0bGVcIiwgeyBhdXRvQWxwaGE6IDAsIHRvcDogNTAgfSlcclxuICAgICAgICAuZnJvbShcIi50ZXN0aW1vbmlhbHMtc2VjdGlvbiAuc2VjdGlvbi10aXRsZSAudGl0bGVcIiwgeyBhdXRvQWxwaGE6IDAsIHk6IDUwIH0sIFwiPCArPTAuMlwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdGVzdGltb25pYWxzIGl0ZW1zXHJcbiAgICBhbmltVGVzdGltb25pYWxzSXRlbXMoKSB7XHJcbiAgICAgIGlmICghdGhpcy4kcmVmcy50ZXN0aW1vbmlhbHNTZWN0aW9uKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgY29uc3QgdGVzdGltb25pYWxzSXRlbXMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoXCIudGVzdGltb25pYWxzLXNlY3Rpb24gLnRlc3RpbW9uaWFscy1pdGVtXCIpO1xyXG4gICAgICBjb25zdCB0ZXN0aW1vbmlhbHNJdGVtc1RMID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgdHJpZ2dlcjogXCIudGVzdGltb25pYWxzLXNlY3Rpb24gLnRlc3RpbW9uaWFscy1pdGVtc1wiLFxyXG4gICAgICAgICAgc3RhcnQ6IFwidG9wIDc1JVwiLFxyXG4gICAgICAgICAgZW5kOiBcInRvcCAyNSVcIixcclxuICAgICAgICAgIHNjcnViOiAwLjMsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRlc3RpbW9uaWFsc0l0ZW1zLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zID0gaSA9PT0gMCA/IFwiXCIgOiBcIjwgKz0wLjJcIjtcclxuICAgICAgICB0ZXN0aW1vbmlhbHNJdGVtc1RMLmZyb20oZWwsIHsgYXV0b0FscGhhOiAwIH0sIHBvcykuZnJvbShlbCwgeyBzY2FsZTogMC4yLCB9LCBcIjxcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjb250YWN0IGluZm9cclxuICAgIGFuaW1Db250YWN0SW5mbygpIHtcclxuICAgICAgY29uc3QgY29udGFjdEluZm9JdGVtcyA9IGdzYXAudXRpbHMudG9BcnJheShcIi5jb250YWN0LXNlY3Rpb24gLmNvbnRhY3QtaW5mbyBsaVwiKTtcclxuXHJcbiAgICAgIGlmICghY29udGFjdEluZm9JdGVtcy5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICBjb25zdCBjb250YWN0SW5mb1RMID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xyXG4gICAgICAgICAgdHJpZ2dlcjogXCIuY29udGFjdC1zZWN0aW9uIC5jb250YWN0LWluZm9cIixcclxuICAgICAgICAgIHN0YXJ0OiBcInRvcCA4MCVcIixcclxuICAgICAgICAgIGVuZDogXCJ0b3AgNTAlXCIsXHJcbiAgICAgICAgICBzY3J1YjogMC4zLFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb250YWN0SW5mb0l0ZW1zLmZvckVhY2goKGVsLCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zID0gaSA9PT0gMCA/IFwiXCIgOiBcIjwgKz0wLjJcIjtcclxuICAgICAgICBjb250YWN0SW5mb1RMLmZyb20oZWwsIHsgYXV0b0FscGhhOiAwIH0scG9zKS5mcm9tKGVsLCB7IHk6IDUwLCB9LCBcIjxcIik7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gc29jaWFsIGljb25zIGFuaW1hdGlvblxyXG4gICAgICBjb250YWN0SW5mb1RMXHJcbiAgICAgICAgLmZyb20oXCIuY29udGFjdC1zZWN0aW9uIC5jb250YWN0LXRleHQgLnNvY2lhbCBsaVwiLCB7IGF1dG9BbHBoYTogMCB9KVxyXG4gICAgICAgIC5mcm9tKFwiLmNvbnRhY3Qtc2VjdGlvbiAuY29udGFjdC10ZXh0IC5zb2NpYWwgbGlcIiwgeyB5OiA1MCwgc3RhZ2dlcjogMC4yIH0sIFwiPFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY29udGFjdCBmb3JtXHJcbiAgICBhbmltQ29udGFjdEZvcm0oKSB7XHJcbiAgICAgIGlmICghdGhpcy4kcmVmcy5jb250YWN0Rm9ybSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIGdzYXAudGltZWxpbmUoe1xyXG4gICAgICAgIHNjcm9sbFRyaWdnZXI6IHtcclxuICAgICAgICAgIHRyaWdnZXI6IFwiLmNvbnRhY3Qtc2VjdGlvbiAuY29udGFjdC1mb3JtXCIsXHJcbiAgICAgICAgICBzdGFydDogXCJ0b3AgODAlXCIsXHJcbiAgICAgICAgICBlbmQ6IFwidG9wIDUwJVwiLFxyXG4gICAgICAgICAgc2NydWI6IDAuMyxcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgICAgLmZyb20oXCIuY29udGFjdC1zZWN0aW9uIC5jb250YWN0LWZvcm1cIiwgeyBhdXRvQWxwaGE6IDAsIHNjYWxlOiAwLjcgfSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuLyogdnVlIGFwcCAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbmltcG9ydCBhbmltYXRpb25zTWl4aW4gZnJvbSBcIi4vYW5pbWF0aW9ucy5taXhpblwiO1xyXG5cclxuY29uc3QgYXBwID0gVnVlLmNyZWF0ZUFwcCh7XHJcbiAgbWl4aW5zOiBbYW5pbWF0aW9uc01peGluXSxcclxuICBkYXRhKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLy8gdGhlIGRhdGUgbXkgY2FyZWVyIHN0YXJ0ZWQgKGNoYW5nZSB0byB5b3VycylcclxuICAgICAgY2FyZWVyU3RhcnREYXRlOiAyMDEwLFxyXG5cclxuICAgICAgLy8gdGhlIGRhdGUgY29weXJpZ2h0IHN0YXJ0ZWQgKGNoYW5nZSB0byB5b3VycylcclxuICAgICAgY29weXJpZ2h0U3RhcnREYXRlOiAyMDIxLFxyXG5cclxuICAgICAgLy8gZm9yIHRoZSB0ZW1wbGF0ZSB0aGVtZVxyXG4gICAgICBhcHBUaGVtZTogJ2xpZ2h0X3RoZW1lJyxcclxuICAgICAgc2F2ZWRUaGVtZTogbnVsbCxcclxuXHJcbiAgICAgIC8vIGZsYWcgdG8gdG9nZ2xlIHRoZSBwcmVsb2FkZXJcclxuICAgICAgaXNQcmVsb2FkaW5nOiB0cnVlLFxyXG5cclxuICAgICAgLy8gdG9hc3Qgbm90aWZpY2F0aW9ucyBhcnJheVxyXG4gICAgICBub3RpZmljYXRpb25zOiBbXSxcclxuXHJcbiAgICAgIC8vIG1hbmFnZSBsb2FkaW5nIHNwaW5uZXIgc3RhdHVzXHJcbiAgICAgIGFqYXhMb2FkaW5nOiBbXSxcclxuXHJcbiAgICAgIC8vIGZvciBtaW5pbWl6aW5nIHRoZSBoZWFkZXIgb24gc2Nyb2xsaW5nIGRvd25cclxuICAgICAgc3RhcnRNaW5pbWl6aW5nSGVhZGVyQXQ6IDEwMCxcclxuICAgICAgaXNIZWFkZXJCaWc6IHRydWUsXHJcbiAgICAgIC8vIGZvciB0b2dnbGluZyB0aGUgaGVhZGVyIG9uIHNjcm9sbGluZyBkb3duXHJcbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbjogMCxcclxuICAgICAgaXNIZWFkZXJIaWRkZW46IGZhbHNlLFxyXG5cclxuICAgICAgLy8gZmxhZyB0byB0b2dnbGUgZm9jdXMgc3R5bGUgY2xhc3NcclxuICAgICAgaXNBbnlGb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAvLyBmbGFnIHRvIHRvZ2dsZSBuYXYgbWVudVxyXG4gICAgICBpc05hdk1lbnVPcGVuOiBmYWxzZSxcclxuXHJcbiAgICAgIC8vIGxpc3Qgb2YgbmF2IGxpbmtzIHRvIGxvb3AgdGhyb3VnaCBpdFxyXG4gICAgICBuYXZMaW5rczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHVybDogJyNoZXJvJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnSG9tZScsIGFyOiAn2KfZhNix2KbZitiz2YrYqScgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHVybDogJyNhYm91dCcsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0Fib3V0JywgYXI6ICfZhdmGINij2YbYpycgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIHVybDogJyNza2lsbHMnLFxyXG4gICAgICAgICAgdGl0bGU6IHsgZW46ICdTa2lsbHMnLCBhcjogJ9mF2YfYp9ix2KfYqtmKJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdXJsOiAnI3BvcnRmb2xpbycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ1BvcnRmb2xpbycsIGFyOiAn2KPYudmF2KfZhNmKJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgdXJsOiAnI2NvbnRhY3QnLFxyXG4gICAgICAgICAgdGl0bGU6IHsgZW46ICdDb250YWN0JywgYXI6ICfYp9iq2LXZhCDYqNmKJyB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG5cclxuICAgICAgLy8gZmxhZyB0byB0b2dnbGUgYmV0d2VlbiBza2lsbHMgdHlwZXMgaW4gc2tpbGxzIHNlY3Rpb25cclxuICAgICAgc2tpbGxzVHlwZTogJycsXHJcblxyXG4gICAgICAvLyBsaXN0IG9mIHNraWxscyBpdGVtcyB0byBsb29wIHRocm91Z2ggaXRcclxuICAgICAgc2tpbGxzSXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3NraWxscy9odG1sNS5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdIVE1MNSdcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3NraWxscy9jc3MzLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogJ0NTUzMnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvamF2YXNjcmlwdC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdKYXZhU2NyaXB0J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3R5cGVzY3JpcHQucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnVHlwZVNjcmlwdCdcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3NraWxscy9qcXVlcnkucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnalF1ZXJ5J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL2Jvb3RzdHJhcC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdCb290c3RyYXAnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvYW5ndWxhci5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdBbmd1bGFyJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3JlYWN0LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogJ1JlYWN0J1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3Z1ZS5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdWdWUnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvZmlyZWJhc2UucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnRmlyZWJhc2UnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvcHVnanMucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnUHVnSlMnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvc2Fzcy5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdTQVNTJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuXHJcbiAgICAgIC8vIGxpc3Qgb2YgdG9vbHMgaXRlbXMgdG8gbG9vcCB0aHJvdWdoIGl0XHJcbiAgICAgIHRvb2xzSXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3NraWxscy9hamF4LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogJ0FqYXgnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvZ3VscC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdHdWxwJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3dlYnBhY2sucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnV2VicGFjaydcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3NraWxscy9naXQucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnR2l0IChHaXRodWIpJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL25wbS5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdOcG0nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvY29tbWFuZC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdDb21tYW5kIExpbmUnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvdnMtY29kZS5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdWUyBDb2RlJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3RyZWxsby5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdUcmVsbG8nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvY2xpY2t1cC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdDbGlja1VwJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3NsYWNrLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogJ1NsYWNrJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvc2tpbGxzL3Bob3Rvc2hvcC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6ICdQaG90b3Nob3AnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9za2lsbHMvYWRvYmUteGQucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiAnQWRvYmUgWEQnXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG5cclxuICAgICAgLy8gbGlzdCBvZiBleHBlcmllbmNlIGl0ZW1zIHRvIGxvb3AgdGhyb3VnaCBpdFxyXG4gICAgICBleHBlcmllbmNlSXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRlOiAnMjAxMCcsXHJcbiAgICAgICAgICBjb21wYW55TmFtZTogeyBlbjogJ0dvb2dsZSBJbmMuJywgYXI6ICfYtNix2YPYqSDYrNmI2KzZhCcgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnRnJvbnQtRW5kIERldmVsb3BlcicsIGFyOiAn2YXYt9mI2LEg2KfZhNmI2KfYrNmH2Kkg2KfZhNij2YXYp9mF2YrYqScgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdNb25pdG9yZWQgdGVjaG5pY2FsIGFzcGVjdHMgb2YgdGhlIGZyb250LWVuZCBkZWxpdmVyeSBmb3IgcHJvamVjdHMuJyxcclxuICAgICAgICAgICAgYXI6ICfZhdix2KfZgtio2Kkg2KfZhNis2YjYp9mG2Kgg2KfZhNmB2YbZitipINmE2KrYt9mI2YrYsSDYp9mE2YjYp9is2YfYp9iqINin2YTYo9mF2KfZhdmK2Kkg2YTZhNmF2LTYp9ix2YrYuS4nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgZGF0ZTogJzIwMTInLFxyXG4gICAgICAgICAgY29tcGFueU5hbWU6IHsgZW46ICdGYWNlYm9vayBJbmMuJywgYXI6ICfYtNix2YPYqSDZgdmK2LPYqNmI2YMnIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ0Z1bGwgU3RhY2sgRGV2ZWxvcGVyJywgYXI6ICfZhdi32YjZkdixINin2YTZiNmK2Kgg2KfZhNmF2KrZg9in2YXZhCcgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdDb2xsYWJvcmF0ZSB3aXRoIGNyZWF0aXZlIGFuZCBkZXZlbG9wbWVudCB0ZWFtcyBvbiB0aGUgZXhlY3V0aW9uIG9mIGlkZWFzLicsXHJcbiAgICAgICAgICAgIGFyOiAn2KrYudin2YjZhtiqINmF2Lkg2KfZhNmB2LHZgiDYp9mE2KXYqNiv2KfYudmK2Kkg2YHZiiDYqti32YjZitixINmI2KrZhtmB2YrYsCDYo9mB2YPYp9ixINmF2KjYqtmD2LHYqS4nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgZGF0ZTogJzIwMTQnLFxyXG4gICAgICAgICAgY29tcGFueU5hbWU6IHsgZW46ICdFbnZhdG8gSW5jLicsIGFyOiAn2LTYsdmD2Kkg2KfZhtmB2KfYqtmIJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdVSS9VWCBEZXZlbG9wZXInLCBhcjogJ9mF2LfZiNixIFVJL1VYJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0NvbnZlcnRlZCBQaG90b3Nob3AgbGF5b3V0cyB0byB3ZWIgcGFnZXMgdXNpbmcgSFRNTCwgQ1NTLCBhbmQgSmF2YVNjcmlwdC4nLFxyXG4gICAgICAgICAgICBhcjogJ9iq2YUg2KrYrdmI2YrZhCDYqtiu2LfZiti32KfYqiBQaG90b3Nob3Ag2KXZhNmJINi12YHYrdin2Kog2YjZitioINio2KfYs9iq2K7Yr9in2YUgSFRNTCDZiCBDU1Mg2YggSmF2YVNjcmlwdC4nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgZGF0ZTogJzIwMTYnLFxyXG4gICAgICAgICAgY29tcGFueU5hbWU6IHsgZW46ICdHb29nbGUgSW5jLicsIGFyOiAn2LTYsdmD2Kkg2KzZiNis2YQnIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ0Zyb250LUVuZCBEZXZlbG9wZXInLCBhcjogJ9mF2LfZiNixINin2YTZiNin2KzZh9ipINin2YTYo9mF2KfZhdmK2KknIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTW9uaXRvcmVkIHRlY2huaWNhbCBhc3BlY3RzIG9mIHRoZSBmcm9udC1lbmQgZGVsaXZlcnkgZm9yIHByb2plY3RzLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YXYsdin2YLYqNipINin2YTYrNmI2KfZhtioINin2YTZgdmG2YrYqSDZhNiq2LfZiNmK2LEg2KfZhNmI2KfYrNmH2KfYqiDYp9mE2KPZhdin2YXZitipINmE2YTZhdi02KfYsdmK2LkuJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGRhdGU6ICcyMDE4JyxcclxuICAgICAgICAgIGNvbXBhbnlOYW1lOiB7IGVuOiAnRmFjZWJvb2sgSW5jLicsIGFyOiAn2LTYsdmD2Kkg2YHZitiz2KjZiNmDJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdGdWxsIFN0YWNrIERldmVsb3BlcicsIGFyOiAn2YXYt9mI2ZHYsSDYp9mE2YjZitioINin2YTZhdiq2YPYp9mF2YQnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnQ29sbGFib3JhdGUgd2l0aCBjcmVhdGl2ZSBhbmQgZGV2ZWxvcG1lbnQgdGVhbXMgb24gdGhlIGV4ZWN1dGlvbiBvZiBpZGVhcy4nLFxyXG4gICAgICAgICAgICBhcjogJ9iq2LnYp9mI2YbYqiDZhdi5INin2YTZgdix2YIg2KfZhNil2KjYr9in2LnZitipINmB2Yog2KrYt9mI2YrYsSDZiNiq2YbZgdmK2LAg2KPZgdmD2KfYsSDZhdio2KrZg9ix2KkuJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGRhdGU6ICcyMDIwJyxcclxuICAgICAgICAgIGNvbXBhbnlOYW1lOiB7IGVuOiAnR29vZ2xlIEluYy4nLCBhcjogJ9i02LHZg9ipINis2YjYrNmEJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdGcm9udC1FbmQgRGV2ZWxvcGVyJywgYXI6ICfZhdi32YjYsSDYp9mE2YjYp9is2YfYqSDYp9mE2KPZhdin2YXZitipJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ01vbml0b3JlZCB0ZWNobmljYWwgYXNwZWN0cyBvZiB0aGUgZnJvbnQtZW5kIGRlbGl2ZXJ5IGZvciBwcm9qZWN0cy4nLFxyXG4gICAgICAgICAgICBhcjogJ9mF2LHYp9mC2KjYqSDYp9mE2KzZiNin2YbYqCDYp9mE2YHZhtmK2Kkg2YTYqti32YjZitixINin2YTZiNin2KzZh9in2Kog2KfZhNij2YXYp9mF2YrYqSDZhNmE2YXYtNin2LHZiti5LidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBkYXRlOiAnMjAyMicsXHJcbiAgICAgICAgICBjb21wYW55TmFtZTogeyBlbjogJ0ZhY2Vib29rIEluYy4nLCBhcjogJ9i02LHZg9ipINmB2YrYs9io2YjZgycgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnRnVsbCBTdGFjayBEZXZlbG9wZXInLCBhcjogJ9mF2LfZiNmR2LEg2KfZhNmI2YrYqCDYp9mE2YXYqtmD2KfZhdmEJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0NvbGxhYm9yYXRlIHdpdGggY3JlYXRpdmUgYW5kIGRldmVsb3BtZW50IHRlYW1zIG9uIHRoZSBleGVjdXRpb24gb2YgaWRlYXMuJyxcclxuICAgICAgICAgICAgYXI6ICfYqti52KfZiNmG2Kog2YXYuSDYp9mE2YHYsdmCINin2YTYpdio2K/Yp9i52YrYqSDZgdmKINiq2LfZiNmK2LEg2YjYqtmG2YHZitiwINij2YHZg9in2LEg2YXYqNiq2YPYsdipLidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7fSwge31cclxuICAgICAgXSxcclxuXHJcbiAgICAgIC8vIGN1cnJlbnQgcGFnZSBvZiBwb3J0Zm9saW8gaXRlbXNcclxuICAgICAgcG9ydGZvbGlvSXRlbXNQYWdlOiAxLFxyXG5cclxuICAgICAgLy8gcG9ydGZvbGlvIGl0ZW1zIHBlciBwYWdlXHJcbiAgICAgIGl0ZW1zUGVyUGFnZTogNyxcclxuXHJcbiAgICAgIC8vIHBvcnRmb2xpbyBpdGVtcyBmaWx0ZXIgYnkgdHlwZVxyXG4gICAgICBmaWx0ZXJzOiBbJ0FsbCcsICdIVE1MJywgJ0FuZ3VsYXInLCAnVnVlJ10sXHJcbiAgICAgIGN1cnJlbnRGaWx0ZXI6ICdBbGwnLFxyXG5cclxuICAgICAgLy8gcG9ydGZvbGlvIGFyY2hpdmUgbmFtZVxyXG4gICAgICBwb3J0Zm9saW9BcmNoaXZlTmFtZTogJycsXHJcblxyXG4gICAgICAvLyBsaXN0IG9mIHBvcnRmb2xpbyBpdGVtcyB0byBsb29wIHRocm91Z2ggaXRcclxuICAgICAgYWxsUG9ydGZvbGlvSXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD0xJyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDEnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDEnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1B1Z0pTJywgJ0NTUycsICdTQ1NTJywgJ0phdmFTY3JpcHQnLCAnR3VscCcsICdCb290c3RyYXAnLCAnQUpBWCcsICdWdWUnLCAnRmlyZWJhc2UnXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogMixcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD0yJyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDInLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDInIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnQW5ndWxhcicsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1NsaW0nLCAnQ1NTJywgJ0xlc3MnLCAnSmF2YVNjcmlwdCcsICdUeXBlU2NyaXB0JywgJ1RhaWx3aW5kQ1NTJywgJ0FKQVgnLCAnQW5ndWxhcicsICdOb2RlSnMnLCAnTW9uZ29EQiddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgdXJsOiAnc2luZ2xlLXBvcnRmb2xpby5odG1sP2lkPTMnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgMycsIGFyOiAn2YfZhtinINi52YbZiNin2YYg2KfZhNmF2LTYsdmI2LkgMycgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdWdWUnLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdQdWdKUycsICdDU1MnLCAnU0NTUycsICdKYXZhU2NyaXB0JywgJ0d1bHAnLCAnTWF0ZXJpYWxpemUnLCAnQUpBWCcsICdWdWUnLCAnRmlyZWJhc2UnXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogNCxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD00JyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDQnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDQnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1NsaW0nLCAnQ1NTJywgJ0xlc3MnLCAnSmF2YVNjcmlwdCcsICdUeXBlU2NyaXB0JywgJ1RhaWx3aW5kQ1NTJywgJ0FKQVgnLCAnQW5ndWxhcicsICdOb2RlSnMnLCAnTW9uZ29EQiddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiA1LFxyXG4gICAgICAgICAgdXJsOiAnc2luZ2xlLXBvcnRmb2xpby5odG1sP2lkPTUnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgNScsIGFyOiAn2YfZhtinINi52YbZiNin2YYg2KfZhNmF2LTYsdmI2LkgNScgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdBbmd1bGFyJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnUHVnSlMnLCAnQ1NTJywgJ1NDU1MnLCAnSmF2YVNjcmlwdCcsICdHdWxwJywgJ0Jvb3RzdHJhcCcsICdBSkFYJywgJ1Z1ZScsICdGaXJlYmFzZSddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiA2LFxyXG4gICAgICAgICAgdXJsOiAnc2luZ2xlLXBvcnRmb2xpby5odG1sP2lkPTYnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTYucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgNicsIGFyOiAn2YfZhtinINi52YbZiNin2YYg2KfZhNmF2LTYsdmI2LkgNicgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdWdWUnLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdTbGltJywgJ0NTUycsICdMZXNzJywgJ0phdmFTY3JpcHQnLCAnVHlwZVNjcmlwdCcsICdNYXRlcmlhbGl6ZScsICdBSkFYJywgJ0FuZ3VsYXInLCAnTm9kZUpzJywgJ01vbmdvREInXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogNyxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD03JyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby03LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDcnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDcnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1B1Z0pTJywgJ0NTUycsICdTQ1NTJywgJ0phdmFTY3JpcHQnLCAnR3VscCcsICdCb290c3RyYXAnLCAnQUpBWCcsICdWdWUnLCAnRmlyZWJhc2UnXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogOCxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD04JyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby04LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDgnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDgnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnVnVlJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnU2xpbScsICdDU1MnLCAnTGVzcycsICdKYXZhU2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnVGFpbHdpbmRDU1MnLCAnQUpBWCcsICdBbmd1bGFyJywgJ05vZGVKcycsICdNb25nb0RCJ10sXHJcbiAgICAgICAgICBzY3JlZW5zaG90czoge1xyXG4gICAgICAgICAgICBpbWcxOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDUnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNScgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWcyOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNC5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDQnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNCcgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWczOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMy5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDMnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMycgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc0OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMi5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDInLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMicgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc1OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDEnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMScgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaWQ6IDksXHJcbiAgICAgICAgICB1cmw6ICdzaW5nbGUtcG9ydGZvbGlvLmh0bWw/aWQ9OScsXHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3BvcnRmb2xpby9wb3J0Zm9saW8tOS5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6IHsgZW46ICdMb3JlbSBJcHN1bSBEb2xvciA5JywgYXI6ICfZh9mG2Kcg2LnZhtmI2KfZhiDYp9mE2YXYtNix2YjYuSA5JyB9LFxyXG4gICAgICAgICAgZGF0ZTogeyBlbjogJ0FwcmlsIDIwMjEnLCBhcjogJ9ij2KjYsdmK2YQgMjAyMScgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnlcXCdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIHRvb2sgYSBnYWxsZXkgb2YgdHlwZSBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdWxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzIGNvbnRhaW5pbmcgTG9yZW0gSXBzdW0gcGFzc2FnZXMsIGFuZCBtb3JlIHJlY2VudGx5IHdpdGggZGVza3RvcCBwdWJsaXNoaW5nIHNvZnR3YXJlIGxpa2UgQWxkdXMgUGFnZU1ha2VyIGluY2x1ZGluZyB2ZXJzaW9ucyBvZiBMb3JlbSBJcHN1bS4nLFxyXG4gICAgICAgICAgICBhcjogJ9mH2LDYpyDYp9mE2YbYtSDZh9mIINmF2KvYp9mEINmE2YbYtSDZitmF2YPZhiDYo9mGINmK2LPYqtio2K/ZhCDZgdmKINmG2YHYsyDYp9mE2YXYs9in2K3YqdiMINmE2YLYryDYqtmFINiq2YjZhNmK2K8g2YfYsNinINin2YTZhti1INmF2YYg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJ2Iwg2K3ZitirINmK2YXZg9mG2YMg2KPZhiDYqtmI2YTYryDZhdir2YQg2YfYsNinINin2YTZhti1INij2Ygg2KfZhNi52K/ZitivINmF2YYg2KfZhNmG2LXZiNi1INin2YTYo9iu2LHZiSDYpdi22KfZgdipINil2YTZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2K3YsdmI2YEg2KfZhNiq2Ykg2YrZiNmE2K/Zh9inINin2YTYqti32KjZitmCLiDYpdiw2Kcg2YPZhtiqINiq2K3Yqtin2Kwg2KXZhNmJINi52K/YryDYo9mD2KjYsSDZhdmGINin2YTZgdmC2LHYp9iqINmK2KrZititINmE2YMg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTZgdmC2LHYp9iqINmD2YXYpyDYqtix2YrYr9iMINin2YTZhti1INmE2YYg2YrYqNiv2Ygg2YXZgtiz2YXYpyDZiNmE2Kcg2YrYrdmI2Yog2KPYrti32KfYoSDZhNi62YjZitip2Iwg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINmF2YHZitivINmE2YXYtdmF2YXZiiDYp9mE2YXZiNin2YLYuSDYudmE2Ykg2YjYrNmHINin2YTYrti12YjYtdiMINit2YrYqyDZitit2KrYp9isINin2YTYudmF2YrZhCDZgdmJINmD2KvZitixINmF2YYg2KfZhNij2K3Zitin2YYg2KPZhiDZiti32YTYuSDYudmE2Ykg2LXZiNix2Kkg2K3ZgtmK2YLZitipINmE2KrYtdmF2YrZhSDYp9mE2YXZiNmC2LkuINmI2YXZhiDZh9mG2Kcg2YjYrNioINi52YTZiSDYp9mE2YXYtdmF2YUg2KPZhiDZiti22Lkg2YbYtdmI2LXYpyDZhdik2YLYqtipINi52YTZiSDYp9mE2KrYtdmF2YrZhSDZhNmK2LjZh9ixINmE2YTYudmF2YrZhCDYp9mE2LTZg9mEINmD2KfZhdmE2KfZi9iMINiv2YjYsSDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2KPZhiDZitmI2YHYsSDYudmE2Ykg2KfZhNmF2LXZhdmFINi52YbYp9ihINin2YTYqNit2Ksg2LnZhiDZhti1INio2K/ZitmEINmE2Kcg2LnZhNin2YLYqSDZhNmHINio2KfZhNmF2YjYttmI2Lkg2KfZhNiw2Ykg2YrYqtit2K/YqyDYudmG2Ycg2KfZhNiq2LXZhdmK2YUg2YHZiti42YfYsSDYqNi02YPZhCDZhNinINmK2YTZitmCLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYXRlZ29yeTogJ0FuZ3VsYXInLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdQdWdKUycsICdDU1MnLCAnU0NTUycsICdKYXZhU2NyaXB0JywgJ0d1bHAnLCAnTWF0ZXJpYWxpemUnLCAnQUpBWCcsICdWdWUnLCAnRmlyZWJhc2UnXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogMTAsXHJcbiAgICAgICAgICB1cmw6ICdzaW5nbGUtcG9ydGZvbGlvLmh0bWw/aWQ9MTAnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTEwLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDEwJywgYXI6ICfZh9mG2Kcg2LnZhtmI2KfZhiDYp9mE2YXYtNix2YjYuSAxMCcgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnU2xpbScsICdDU1MnLCAnTGVzcycsICdKYXZhU2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnQm9vdHN0cmFwJywgJ0FKQVgnLCAnQW5ndWxhcicsICdOb2RlSnMnLCAnTW9uZ29EQiddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAxMSxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD0xMScsXHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3BvcnRmb2xpby9wb3J0Zm9saW8tMTEucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgMTEnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDExJyB9LFxyXG4gICAgICAgICAgZGF0ZTogeyBlbjogJ0FwcmlsIDIwMjEnLCBhcjogJ9ij2KjYsdmK2YQgMjAyMScgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnlcXCdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIHRvb2sgYSBnYWxsZXkgb2YgdHlwZSBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdWxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzIGNvbnRhaW5pbmcgTG9yZW0gSXBzdW0gcGFzc2FnZXMsIGFuZCBtb3JlIHJlY2VudGx5IHdpdGggZGVza3RvcCBwdWJsaXNoaW5nIHNvZnR3YXJlIGxpa2UgQWxkdXMgUGFnZU1ha2VyIGluY2x1ZGluZyB2ZXJzaW9ucyBvZiBMb3JlbSBJcHN1bS4nLFxyXG4gICAgICAgICAgICBhcjogJ9mH2LDYpyDYp9mE2YbYtSDZh9mIINmF2KvYp9mEINmE2YbYtSDZitmF2YPZhiDYo9mGINmK2LPYqtio2K/ZhCDZgdmKINmG2YHYsyDYp9mE2YXYs9in2K3YqdiMINmE2YLYryDYqtmFINiq2YjZhNmK2K8g2YfYsNinINin2YTZhti1INmF2YYg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJ2Iwg2K3ZitirINmK2YXZg9mG2YMg2KPZhiDYqtmI2YTYryDZhdir2YQg2YfYsNinINin2YTZhti1INij2Ygg2KfZhNi52K/ZitivINmF2YYg2KfZhNmG2LXZiNi1INin2YTYo9iu2LHZiSDYpdi22KfZgdipINil2YTZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2K3YsdmI2YEg2KfZhNiq2Ykg2YrZiNmE2K/Zh9inINin2YTYqti32KjZitmCLiDYpdiw2Kcg2YPZhtiqINiq2K3Yqtin2Kwg2KXZhNmJINi52K/YryDYo9mD2KjYsSDZhdmGINin2YTZgdmC2LHYp9iqINmK2KrZititINmE2YMg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTZgdmC2LHYp9iqINmD2YXYpyDYqtix2YrYr9iMINin2YTZhti1INmE2YYg2YrYqNiv2Ygg2YXZgtiz2YXYpyDZiNmE2Kcg2YrYrdmI2Yog2KPYrti32KfYoSDZhNi62YjZitip2Iwg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINmF2YHZitivINmE2YXYtdmF2YXZiiDYp9mE2YXZiNin2YLYuSDYudmE2Ykg2YjYrNmHINin2YTYrti12YjYtdiMINit2YrYqyDZitit2KrYp9isINin2YTYudmF2YrZhCDZgdmJINmD2KvZitixINmF2YYg2KfZhNij2K3Zitin2YYg2KPZhiDZiti32YTYuSDYudmE2Ykg2LXZiNix2Kkg2K3ZgtmK2YLZitipINmE2KrYtdmF2YrZhSDYp9mE2YXZiNmC2LkuINmI2YXZhiDZh9mG2Kcg2YjYrNioINi52YTZiSDYp9mE2YXYtdmF2YUg2KPZhiDZiti22Lkg2YbYtdmI2LXYpyDZhdik2YLYqtipINi52YTZiSDYp9mE2KrYtdmF2YrZhSDZhNmK2LjZh9ixINmE2YTYudmF2YrZhCDYp9mE2LTZg9mEINmD2KfZhdmE2KfZi9iMINiv2YjYsSDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2KPZhiDZitmI2YHYsSDYudmE2Ykg2KfZhNmF2LXZhdmFINi52YbYp9ihINin2YTYqNit2Ksg2LnZhiDZhti1INio2K/ZitmEINmE2Kcg2LnZhNin2YLYqSDZhNmHINio2KfZhNmF2YjYttmI2Lkg2KfZhNiw2Ykg2YrYqtit2K/YqyDYudmG2Ycg2KfZhNiq2LXZhdmK2YUg2YHZiti42YfYsSDYqNi02YPZhCDZhNinINmK2YTZitmCLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYXRlZ29yeTogJ1Z1ZScsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1B1Z0pTJywgJ0NTUycsICdTQ1NTJywgJ0phdmFTY3JpcHQnLCAnR3VscCcsICdUYWlsd2luZENTUycsICdBSkFYJywgJ0FuZ3VsYXInLCAnRmlyZWJhc2UnXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogMTIsXHJcbiAgICAgICAgICB1cmw6ICdzaW5nbGUtcG9ydGZvbGlvLmh0bWw/aWQ9MTInLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTEyLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDEyJywgYXI6ICfZh9mG2Kcg2LnZhtmI2KfZhiDYp9mE2YXYtNix2YjYuSAxMicgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdBbmd1bGFyJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnU2xpbScsICdDU1MnLCAnTGVzcycsICdKYXZhU2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnTWF0ZXJpYWxpemUnLCAnQUpBWCcsICdWdWUnLCAnTm9kZUpzJywgJ01vbmdvREInXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogMTMsXHJcbiAgICAgICAgICB1cmw6ICdzaW5nbGUtcG9ydGZvbGlvLmh0bWw/aWQ9MTMnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTEzLnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDEzJywgYXI6ICfZh9mG2Kcg2LnZhtmI2KfZhiDYp9mE2YXYtNix2YjYuSAxMycgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdIVE1MJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnUHVnSlMnLCAnQ1NTJywgJ1NDU1MnLCAnSmF2YVNjcmlwdCcsICdHdWxwJywgJ1RhaWx3aW5kQ1NTJywgJ0FKQVgnLCAnQW5ndWxhcicsICdGaXJlYmFzZSddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAxNCxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD0xNCcsXHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3BvcnRmb2xpby9wb3J0Zm9saW8tMTQucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgMTQnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDE0JyB9LFxyXG4gICAgICAgICAgZGF0ZTogeyBlbjogJ0FwcmlsIDIwMjEnLCBhcjogJ9ij2KjYsdmK2YQgMjAyMScgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnlcXCdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIHRvb2sgYSBnYWxsZXkgb2YgdHlwZSBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdWxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzIGNvbnRhaW5pbmcgTG9yZW0gSXBzdW0gcGFzc2FnZXMsIGFuZCBtb3JlIHJlY2VudGx5IHdpdGggZGVza3RvcCBwdWJsaXNoaW5nIHNvZnR3YXJlIGxpa2UgQWxkdXMgUGFnZU1ha2VyIGluY2x1ZGluZyB2ZXJzaW9ucyBvZiBMb3JlbSBJcHN1bS4nLFxyXG4gICAgICAgICAgICBhcjogJ9mH2LDYpyDYp9mE2YbYtSDZh9mIINmF2KvYp9mEINmE2YbYtSDZitmF2YPZhiDYo9mGINmK2LPYqtio2K/ZhCDZgdmKINmG2YHYsyDYp9mE2YXYs9in2K3YqdiMINmE2YLYryDYqtmFINiq2YjZhNmK2K8g2YfYsNinINin2YTZhti1INmF2YYg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJ2Iwg2K3ZitirINmK2YXZg9mG2YMg2KPZhiDYqtmI2YTYryDZhdir2YQg2YfYsNinINin2YTZhti1INij2Ygg2KfZhNi52K/ZitivINmF2YYg2KfZhNmG2LXZiNi1INin2YTYo9iu2LHZiSDYpdi22KfZgdipINil2YTZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2K3YsdmI2YEg2KfZhNiq2Ykg2YrZiNmE2K/Zh9inINin2YTYqti32KjZitmCLiDYpdiw2Kcg2YPZhtiqINiq2K3Yqtin2Kwg2KXZhNmJINi52K/YryDYo9mD2KjYsSDZhdmGINin2YTZgdmC2LHYp9iqINmK2KrZititINmE2YMg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTZgdmC2LHYp9iqINmD2YXYpyDYqtix2YrYr9iMINin2YTZhti1INmE2YYg2YrYqNiv2Ygg2YXZgtiz2YXYpyDZiNmE2Kcg2YrYrdmI2Yog2KPYrti32KfYoSDZhNi62YjZitip2Iwg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINmF2YHZitivINmE2YXYtdmF2YXZiiDYp9mE2YXZiNin2YLYuSDYudmE2Ykg2YjYrNmHINin2YTYrti12YjYtdiMINit2YrYqyDZitit2KrYp9isINin2YTYudmF2YrZhCDZgdmJINmD2KvZitixINmF2YYg2KfZhNij2K3Zitin2YYg2KPZhiDZiti32YTYuSDYudmE2Ykg2LXZiNix2Kkg2K3ZgtmK2YLZitipINmE2KrYtdmF2YrZhSDYp9mE2YXZiNmC2LkuINmI2YXZhiDZh9mG2Kcg2YjYrNioINi52YTZiSDYp9mE2YXYtdmF2YUg2KPZhiDZiti22Lkg2YbYtdmI2LXYpyDZhdik2YLYqtipINi52YTZiSDYp9mE2KrYtdmF2YrZhSDZhNmK2LjZh9ixINmE2YTYudmF2YrZhCDYp9mE2LTZg9mEINmD2KfZhdmE2KfZi9iMINiv2YjYsSDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2KPZhiDZitmI2YHYsSDYudmE2Ykg2KfZhNmF2LXZhdmFINi52YbYp9ihINin2YTYqNit2Ksg2LnZhiDZhti1INio2K/ZitmEINmE2Kcg2LnZhNin2YLYqSDZhNmHINio2KfZhNmF2YjYttmI2Lkg2KfZhNiw2Ykg2YrYqtit2K/YqyDYudmG2Ycg2KfZhNiq2LXZhdmK2YUg2YHZiti42YfYsSDYqNi02YPZhCDZhNinINmK2YTZitmCLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYXRlZ29yeTogJ0FuZ3VsYXInLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdTbGltJywgJ0NTUycsICdMZXNzJywgJ0phdmFTY3JpcHQnLCAnVHlwZVNjcmlwdCcsICdCb290c3RyYXAnLCAnQUpBWCcsICdWdWUnLCAnTm9kZUpzJywgJ01vbmdvREInXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogMTUsXHJcbiAgICAgICAgICB1cmw6ICdzaW5nbGUtcG9ydGZvbGlvLmh0bWw/aWQ9MTUnLFxyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLTE1LnBuZycsXHJcbiAgICAgICAgICB0aXRsZTogeyBlbjogJ0xvcmVtIElwc3VtIERvbG9yIDE1JywgYXI6ICfZh9mG2Kcg2LnZhtmI2KfZhiDYp9mE2YXYtNix2YjYuSAxNScgfSxcclxuICAgICAgICAgIGRhdGU6IHsgZW46ICdBcHJpbCAyMDIxJywgYXI6ICfYo9io2LHZitmEIDIwMjEnIH0sXHJcbiAgICAgICAgICBkZXNjOiB7XHJcbiAgICAgICAgICAgIGVuOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR1c3RyeS4gTG9yZW0gSXBzdW0gaGFzIGJlZW4gdGhlIGluZHVzdHJ5XFwncyBzdGFuZGFyZCBkdW1teSB0ZXh0IGV2ZXIgc2luY2UgdGhlIDE1MDBzLCB3aGVuIGFuIHVua25vd24gcHJpbnRlciB0b29rIGEgZ2FsbGV5IG9mIHR5cGUgYW5kIHNjcmFtYmxlZCBpdCB0byBtYWtlIGEgdHlwZSBzcGVjaW1lbiBib29rLiBJdCBoYXMgc3Vydml2ZWQgbm90IG9ubHkgZml2ZSBjZW50dXJpZXMsIGJ1dCBhbHNvIHRoZSBsZWFwIGludG8gZWxlY3Ryb25pYyB0eXBlc2V0dGluZywgcmVtYWluaW5nIGVzc2VudGlhbGx5IHVuY2hhbmdlZC4gSXQgd2FzIHBvcHVsYXJpc2VkIGluIHRoZSAxOTYwcyB3aXRoIHRoZSByZWxlYXNlIG9mIExldHJhc2V0IHNoZWV0cyBjb250YWluaW5nIExvcmVtIElwc3VtIHBhc3NhZ2VzLCBhbmQgbW9yZSByZWNlbnRseSB3aXRoIGRlc2t0b3AgcHVibGlzaGluZyBzb2Z0d2FyZSBsaWtlIEFsZHVzIFBhZ2VNYWtlciBpbmNsdWRpbmcgdmVyc2lvbnMgb2YgTG9yZW0gSXBzdW0uJyxcclxuICAgICAgICAgICAgYXI6ICfZh9iw2Kcg2KfZhNmG2LUg2YfZiCDZhdir2KfZhCDZhNmG2LUg2YrZhdmD2YYg2KPZhiDZitiz2KrYqNiv2YQg2YHZiiDZhtmB2LMg2KfZhNmF2LPYp9it2KnYjCDZhNmC2K8g2KrZhSDYqtmI2YTZitivINmH2LDYpyDYp9mE2YbYtSDZhdmGINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZidiMINit2YrYqyDZitmF2YPZhtmDINij2YYg2KrZiNmE2K8g2YXYq9mEINmH2LDYpyDYp9mE2YbYtSDYo9mIINin2YTYudiv2YrYryDZhdmGINin2YTZhti12YjYtSDYp9mE2KPYrtix2Ykg2KXYttin2YHYqSDYpdmE2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNit2LHZiNmBINin2YTYqtmJINmK2YjZhNiv2YfYpyDYp9mE2KrYt9io2YrZgi4g2KXYsNinINmD2YbYqiDYqtit2KrYp9isINil2YTZiSDYudiv2K8g2KPZg9io2LEg2YXZhiDYp9mE2YHZgtix2KfYqiDZitiq2YrYrSDZhNmDINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2YHZgtix2KfYqiDZg9mF2Kcg2KrYsdmK2K/YjCDYp9mE2YbYtSDZhNmGINmK2KjYr9mIINmF2YLYs9mF2Kcg2YjZhNinINmK2K3ZiNmKINij2K7Yt9in2KEg2YTYutmI2YrYqdiMINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDZhdmB2YrYryDZhNmF2LXZhdmF2Yog2KfZhNmF2YjYp9mC2Lkg2LnZhNmJINmI2KzZhyDYp9mE2K7YtdmI2LXYjCDYrdmK2Ksg2YrYrdiq2KfYrCDYp9mE2LnZhdmK2YQg2YHZiSDZg9ir2YrYsSDZhdmGINin2YTYo9it2YrYp9mGINij2YYg2YrYt9mE2Lkg2LnZhNmJINi12YjYsdipINit2YLZitmC2YrYqSDZhNiq2LXZhdmK2YUg2KfZhNmF2YjZgti5LiDZiNmF2YYg2YfZhtinINmI2KzYqCDYudmE2Ykg2KfZhNmF2LXZhdmFINij2YYg2YrYtti5INmG2LXZiNi12Kcg2YXYpNmC2KrYqSDYudmE2Ykg2KfZhNiq2LXZhdmK2YUg2YTZiti42YfYsSDZhNmE2LnZhdmK2YQg2KfZhNi02YPZhCDZg9in2YXZhNin2YvYjCDYr9mI2LEg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINij2YYg2YrZiNmB2LEg2LnZhNmJINin2YTZhdi12YXZhSDYudmG2KfYoSDYp9mE2KjYrdirINi52YYg2YbYtSDYqNiv2YrZhCDZhNinINi52YTYp9mC2Kkg2YTZhyDYqNin2YTZhdmI2LbZiNi5INin2YTYsNmJINmK2KrYrdiv2Ksg2LnZhtmHINin2YTYqti12YXZitmFINmB2YrYuNmH2LEg2KjYtNmD2YQg2YTYpyDZitmE2YrZgi4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY2F0ZWdvcnk6ICdWdWUnLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdQdWdKUycsICdDU1MnLCAnU0NTUycsICdKYXZhU2NyaXB0JywgJ0d1bHAnLCAnTWF0ZXJpYWxpemUnLCAnQUpBWCcsICdBbmd1bGFyJywgJ0ZpcmViYXNlJ10sXHJcbiAgICAgICAgICBzY3JlZW5zaG90czoge1xyXG4gICAgICAgICAgICBpbWcxOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDUnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNScgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWcyOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNC5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDQnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNCcgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWczOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMy5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDMnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMycgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc0OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMi5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDInLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMicgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc1OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDEnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMScgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaWQ6IDE2LFxyXG4gICAgICAgICAgdXJsOiAnc2luZ2xlLXBvcnRmb2xpby5odG1sP2lkPTE2JyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby0xNi5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6IHsgZW46ICdMb3JlbSBJcHN1bSBEb2xvciAxNicsIGFyOiAn2YfZhtinINi52YbZiNin2YYg2KfZhNmF2LTYsdmI2LkgMTYnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnSFRNTCcsXHJcbiAgICAgICAgICB0b29sczogWydIVE1MJywgJ1NsaW0nLCAnQ1NTJywgJ0xlc3MnLCAnSmF2YVNjcmlwdCcsICdUeXBlU2NyaXB0JywgJ0Jvb3RzdHJhcCcsICdBSkFYJywgJ1Z1ZScsICdOb2RlSnMnLCAnTW9uZ29EQiddLFxyXG4gICAgICAgICAgc2NyZWVuc2hvdHM6IHtcclxuICAgICAgICAgICAgaW1nMToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTUucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA1JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDUnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMjoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTQucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiA0JywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDQnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nMzoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTMucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAzJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDMnIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNDoge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTIucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAyJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDInIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nNToge1xyXG4gICAgICAgICAgICAgIHVybDogJ2Fzc2V0cy9pbWFnZXMvc2luZ2xlLXBvcnRmb2xpby9zaW5nbGUtcG9ydGZvbGlvLTEucG5nJyxcclxuICAgICAgICAgICAgICBjYXB0aW9uOiB7IGVuOiAnY2FwdGlvbiAxJywgYXI6ICfYqtiz2YXZitipINiq2YjYttmK2K3ZitipIDEnIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAxNyxcclxuICAgICAgICAgIHVybDogJ3NpbmdsZS1wb3J0Zm9saW8uaHRtbD9pZD0xNycsXHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3BvcnRmb2xpby9wb3J0Zm9saW8tMTcucG5nJyxcclxuICAgICAgICAgIHRpdGxlOiB7IGVuOiAnTG9yZW0gSXBzdW0gRG9sb3IgMTcnLCBhcjogJ9mH2YbYpyDYudmG2YjYp9mGINin2YTZhdi02LHZiNi5IDE3JyB9LFxyXG4gICAgICAgICAgZGF0ZTogeyBlbjogJ0FwcmlsIDIwMjEnLCBhcjogJ9ij2KjYsdmK2YQgMjAyMScgfSxcclxuICAgICAgICAgIGRlc2M6IHtcclxuICAgICAgICAgICAgZW46ICdMb3JlbSBJcHN1bSBpcyBzaW1wbHkgZHVtbXkgdGV4dCBvZiB0aGUgcHJpbnRpbmcgYW5kIHR5cGVzZXR0aW5nIGluZHVzdHJ5LiBMb3JlbSBJcHN1bSBoYXMgYmVlbiB0aGUgaW5kdXN0cnlcXCdzIHN0YW5kYXJkIGR1bW15IHRleHQgZXZlciBzaW5jZSB0aGUgMTUwMHMsIHdoZW4gYW4gdW5rbm93biBwcmludGVyIHRvb2sgYSBnYWxsZXkgb2YgdHlwZSBhbmQgc2NyYW1ibGVkIGl0IHRvIG1ha2UgYSB0eXBlIHNwZWNpbWVuIGJvb2suIEl0IGhhcyBzdXJ2aXZlZCBub3Qgb25seSBmaXZlIGNlbnR1cmllcywgYnV0IGFsc28gdGhlIGxlYXAgaW50byBlbGVjdHJvbmljIHR5cGVzZXR0aW5nLCByZW1haW5pbmcgZXNzZW50aWFsbHkgdW5jaGFuZ2VkLiBJdCB3YXMgcG9wdWxhcmlzZWQgaW4gdGhlIDE5NjBzIHdpdGggdGhlIHJlbGVhc2Ugb2YgTGV0cmFzZXQgc2hlZXRzIGNvbnRhaW5pbmcgTG9yZW0gSXBzdW0gcGFzc2FnZXMsIGFuZCBtb3JlIHJlY2VudGx5IHdpdGggZGVza3RvcCBwdWJsaXNoaW5nIHNvZnR3YXJlIGxpa2UgQWxkdXMgUGFnZU1ha2VyIGluY2x1ZGluZyB2ZXJzaW9ucyBvZiBMb3JlbSBJcHN1bS4nLFxyXG4gICAgICAgICAgICBhcjogJ9mH2LDYpyDYp9mE2YbYtSDZh9mIINmF2KvYp9mEINmE2YbYtSDZitmF2YPZhiDYo9mGINmK2LPYqtio2K/ZhCDZgdmKINmG2YHYsyDYp9mE2YXYs9in2K3YqdiMINmE2YLYryDYqtmFINiq2YjZhNmK2K8g2YfYsNinINin2YTZhti1INmF2YYg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJ2Iwg2K3ZitirINmK2YXZg9mG2YMg2KPZhiDYqtmI2YTYryDZhdir2YQg2YfYsNinINin2YTZhti1INij2Ygg2KfZhNi52K/ZitivINmF2YYg2KfZhNmG2LXZiNi1INin2YTYo9iu2LHZiSDYpdi22KfZgdipINil2YTZiSDYstmK2KfYr9ipINi52K/YryDYp9mE2K3YsdmI2YEg2KfZhNiq2Ykg2YrZiNmE2K/Zh9inINin2YTYqti32KjZitmCLiDYpdiw2Kcg2YPZhtiqINiq2K3Yqtin2Kwg2KXZhNmJINi52K/YryDYo9mD2KjYsSDZhdmGINin2YTZgdmC2LHYp9iqINmK2KrZititINmE2YMg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTZgdmC2LHYp9iqINmD2YXYpyDYqtix2YrYr9iMINin2YTZhti1INmE2YYg2YrYqNiv2Ygg2YXZgtiz2YXYpyDZiNmE2Kcg2YrYrdmI2Yog2KPYrti32KfYoSDZhNi62YjZitip2Iwg2YXZiNmE2K8g2KfZhNmG2LUg2KfZhNi52LHYqNmJINmF2YHZitivINmE2YXYtdmF2YXZiiDYp9mE2YXZiNin2YLYuSDYudmE2Ykg2YjYrNmHINin2YTYrti12YjYtdiMINit2YrYqyDZitit2KrYp9isINin2YTYudmF2YrZhCDZgdmJINmD2KvZitixINmF2YYg2KfZhNij2K3Zitin2YYg2KPZhiDZiti32YTYuSDYudmE2Ykg2LXZiNix2Kkg2K3ZgtmK2YLZitipINmE2KrYtdmF2YrZhSDYp9mE2YXZiNmC2LkuINmI2YXZhiDZh9mG2Kcg2YjYrNioINi52YTZiSDYp9mE2YXYtdmF2YUg2KPZhiDZiti22Lkg2YbYtdmI2LXYpyDZhdik2YLYqtipINi52YTZiSDYp9mE2KrYtdmF2YrZhSDZhNmK2LjZh9ixINmE2YTYudmF2YrZhCDYp9mE2LTZg9mEINmD2KfZhdmE2KfZi9iMINiv2YjYsSDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2KPZhiDZitmI2YHYsSDYudmE2Ykg2KfZhNmF2LXZhdmFINi52YbYp9ihINin2YTYqNit2Ksg2LnZhiDZhti1INio2K/ZitmEINmE2Kcg2LnZhNin2YLYqSDZhNmHINio2KfZhNmF2YjYttmI2Lkg2KfZhNiw2Ykg2YrYqtit2K/YqyDYudmG2Ycg2KfZhNiq2LXZhdmK2YUg2YHZiti42YfYsSDYqNi02YPZhCDZhNinINmK2YTZitmCLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYXRlZ29yeTogJ0FuZ3VsYXInLFxyXG4gICAgICAgICAgdG9vbHM6IFsnSFRNTCcsICdQdWdKUycsICdDU1MnLCAnU0NTUycsICdKYXZhU2NyaXB0JywgJ0d1bHAnLCAnVGFpbHdpbmRDU1MnLCAnQUpBWCcsICdBbmd1bGFyJywgJ0ZpcmViYXNlJ10sXHJcbiAgICAgICAgICBzY3JlZW5zaG90czoge1xyXG4gICAgICAgICAgICBpbWcxOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDUnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNScgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWcyOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tNC5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDQnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgNCcgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWczOiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMy5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDMnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMycgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc0OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMi5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDInLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMicgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc1OiB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9ydGZvbGlvL3NpbmdsZS1wb3J0Zm9saW8tMS5wbmcnLFxyXG4gICAgICAgICAgICAgIGNhcHRpb246IHsgZW46ICdjYXB0aW9uIDEnLCBhcjogJ9iq2LPZhdmK2Kkg2KrZiNi22YrYrdmK2KkgMScgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaWQ6IDE4LFxyXG4gICAgICAgICAgdXJsOiAnc2luZ2xlLXBvcnRmb2xpby5odG1sP2lkPTE4JyxcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvcG9ydGZvbGlvL3BvcnRmb2xpby0xOC5wbmcnLFxyXG4gICAgICAgICAgdGl0bGU6IHsgZW46ICdMb3JlbSBJcHN1bSBEb2xvciAxOCcsIGFyOiAn2YfZhtinINi52YbZiNin2YYg2KfZhNmF2LTYsdmI2LkgMTgnIH0sXHJcbiAgICAgICAgICBkYXRlOiB7IGVuOiAnQXByaWwgMjAyMScsIGFyOiAn2KPYqNix2YrZhCAyMDIxJyB9LFxyXG4gICAgICAgICAgZGVzYzoge1xyXG4gICAgICAgICAgICBlbjogJ0xvcmVtIElwc3VtIGlzIHNpbXBseSBkdW1teSB0ZXh0IG9mIHRoZSBwcmludGluZyBhbmQgdHlwZXNldHRpbmcgaW5kdXN0cnkuIExvcmVtIElwc3VtIGhhcyBiZWVuIHRoZSBpbmR1c3RyeVxcJ3Mgc3RhbmRhcmQgZHVtbXkgdGV4dCBldmVyIHNpbmNlIHRoZSAxNTAwcywgd2hlbiBhbiB1bmtub3duIHByaW50ZXIgdG9vayBhIGdhbGxleSBvZiB0eXBlIGFuZCBzY3JhbWJsZWQgaXQgdG8gbWFrZSBhIHR5cGUgc3BlY2ltZW4gYm9vay4gSXQgaGFzIHN1cnZpdmVkIG5vdCBvbmx5IGZpdmUgY2VudHVyaWVzLCBidXQgYWxzbyB0aGUgbGVhcCBpbnRvIGVsZWN0cm9uaWMgdHlwZXNldHRpbmcsIHJlbWFpbmluZyBlc3NlbnRpYWxseSB1bmNoYW5nZWQuIEl0IHdhcyBwb3B1bGFyaXNlZCBpbiB0aGUgMTk2MHMgd2l0aCB0aGUgcmVsZWFzZSBvZiBMZXRyYXNldCBzaGVldHMgY29udGFpbmluZyBMb3JlbSBJcHN1bSBwYXNzYWdlcywgYW5kIG1vcmUgcmVjZW50bHkgd2l0aCBkZXNrdG9wIHB1Ymxpc2hpbmcgc29mdHdhcmUgbGlrZSBBbGR1cyBQYWdlTWFrZXIgaW5jbHVkaW5nIHZlcnNpb25zIG9mIExvcmVtIElwc3VtLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YfYsNinINin2YTZhti1INmH2Ygg2YXYq9in2YQg2YTZhti1INmK2YXZg9mGINij2YYg2YrYs9iq2KjYr9mEINmB2Yog2YbZgdizINin2YTZhdiz2KfYrdip2Iwg2YTZgtivINiq2YUg2KrZiNmE2YrYryDZh9iw2Kcg2KfZhNmG2LUg2YXZhiDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2YnYjCDYrdmK2Ksg2YrZhdmD2YbZgyDYo9mGINiq2YjZhNivINmF2KvZhCDZh9iw2Kcg2KfZhNmG2LUg2KPZiCDYp9mE2LnYr9mK2K8g2YXZhiDYp9mE2YbYtdmI2LUg2KfZhNij2K7YsdmJINil2LbYp9mB2Kkg2KXZhNmJINiy2YrYp9iv2Kkg2LnYr9ivINin2YTYrdix2YjZgSDYp9mE2KrZiSDZitmI2YTYr9mH2Kcg2KfZhNiq2LfYqNmK2YIuINil2LDYpyDZg9mG2Kog2KrYrdiq2KfYrCDYpdmE2Ykg2LnYr9ivINij2YPYqNixINmF2YYg2KfZhNmB2YLYsdin2Kog2YrYqtmK2K0g2YTZgyDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2LLZitin2K/YqSDYudiv2K8g2KfZhNmB2YLYsdin2Kog2YPZhdinINiq2LHZitiv2Iwg2KfZhNmG2LUg2YTZhiDZitio2K/ZiCDZhdmC2LPZhdinINmI2YTYpyDZitit2YjZiiDYo9iu2LfYp9ihINmE2LrZiNmK2KnYjCDZhdmI2YTYryDYp9mE2YbYtSDYp9mE2LnYsdio2Ykg2YXZgdmK2K8g2YTZhdi12YXZhdmKINin2YTZhdmI2KfZgti5INi52YTZiSDZiNis2Ycg2KfZhNiu2LXZiNi12Iwg2K3ZitirINmK2K3Yqtin2Kwg2KfZhNi52YXZitmEINmB2Ykg2YPYq9mK2LEg2YXZhiDYp9mE2KPYrdmK2KfZhiDYo9mGINmK2LfZhNi5INi52YTZiSDYtdmI2LHYqSDYrdmC2YrZgtmK2Kkg2YTYqti12YXZitmFINin2YTZhdmI2YLYuS4g2YjZhdmGINmH2YbYpyDZiNis2Kgg2LnZhNmJINin2YTZhdi12YXZhSDYo9mGINmK2LbYuSDZhti12YjYtdinINmF2KTZgtiq2Kkg2LnZhNmJINin2YTYqti12YXZitmFINmE2YrYuNmH2LEg2YTZhNi52YXZitmEINin2YTYtNmD2YQg2YPYp9mF2YTYp9mL2Iwg2K/ZiNixINmF2YjZhNivINin2YTZhti1INin2YTYudix2KjZiSDYo9mGINmK2YjZgdixINi52YTZiSDYp9mE2YXYtdmF2YUg2LnZhtin2KEg2KfZhNio2K3YqyDYudmGINmG2LUg2KjYr9mK2YQg2YTYpyDYudmE2KfZgtipINmE2Ycg2KjYp9mE2YXZiNi22YjYuSDYp9mE2LDZiSDZitiq2K3Yr9irINi52YbZhyDYp9mE2KrYtdmF2YrZhSDZgdmK2LjZh9ixINio2LTZg9mEINmE2Kcg2YrZhNmK2YIuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhdGVnb3J5OiAnVnVlJyxcclxuICAgICAgICAgIHRvb2xzOiBbJ0hUTUwnLCAnU2xpbScsICdDU1MnLCAnTGVzcycsICdKYXZhU2NyaXB0JywgJ1R5cGVTY3JpcHQnLCAnTWF0ZXJpYWxpemUnLCAnQUpBWCcsICdWdWUnLCAnTm9kZUpzJywgJ01vbmdvREInXSxcclxuICAgICAgICAgIHNjcmVlbnNob3RzOiB7XHJcbiAgICAgICAgICAgIGltZzE6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby01LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA1JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzI6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby00LnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gNCcsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSA0JyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzM6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0zLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMycsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAzJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzQ6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0yLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMicsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAyJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzU6IHtcclxuICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvaW1hZ2VzL3NpbmdsZS1wb3J0Zm9saW8vc2luZ2xlLXBvcnRmb2xpby0xLnBuZycsXHJcbiAgICAgICAgICAgICAgY2FwdGlvbjogeyBlbjogJ2NhcHRpb24gMScsIGFyOiAn2KrYs9mF2YrYqSDYqtmI2LbZitit2YrYqSAxJyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF0ucmV2ZXJzZSgpLFxyXG5cclxuICAgICAgLy8gdmlld2VkIHBvcnRmb2xpbyBpdGVtc1xyXG4gICAgICBwb3J0Zm9saW9JdGVtczogW10sXHJcblxyXG4gICAgICAvLyBsaXN0IG9mIHRlc3RpbW9uaWFscyBpdGVtcyB0byBsb29wIHRocm91Z2ggaXRcclxuICAgICAgdGVzdGltb25pYWxzSXRlbXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMtMS5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnTmFmaWUgc2ltcGx5IHByb3ZpZGVzIGFtYXppbmcgd2ViIGRldmVsb3BtZW50IHNlcnZpY2UuIFRoZWlyIHRlYW0gaXMgZXh0cmVtZWx5IHByb2Zlc3Npb25hbCBhbmQgdGhlIGVhc2llc3QgdG8gbWVldCBJIGhhdmUgZXZlciB3b3JrZWQgd2l0aC4gSSB3b3VsZCByZWNvbW1lbmQgTmFmaWUgdG8gYW55b25lLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YXYrdmF2K8g2YrZgtiv2YUg2K7Yr9mF2KfYqiDZhdiw2YfZhNipINmB2Yog2KrYt9mI2YrYsSDYp9mE2YjZitio2Iwg2YjZhNiv2YrZhyDZgdix2YrZgiDZhdit2KrYsdmBINmK2KzYudmEINin2YTYqti52KfZhdmEINmF2LnZh9mFINmF2LfZhdim2YYg2YTZhNi62KfZitipLiDYo9mI2LXZiiDYqNmB2LHZitmC2YfZhSDZhNmE2KzZhdmK2LkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnVGVycmVsbCBHcmltZXMnLCBhcjogJ9is2KfYqNixINin2YTYudmI2KfZhtmKJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdQaG90b2dyYXBoZXInLCBhcjogJ9mF2LXZiNixINmB2YjYqtmI2LrYsdin2YHZiicgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy0yLmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdFeGNlbGxlbnQgVGVhbSB0byB3b3JrIHdpdGguIEFsd2F5cyBwb3NpdGl2ZSB0byBmaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHNvbHV0aW9uLiBOYWZpZSBpcyBvbmUgb2YgdGhlIHByb2Zlc3Npb25hbCB3ZWIgZGV2ZWxvcG1lbnQgYWdlbmN5IHRoYXQgcHJvdmlkZXMgYXdlc29tZSBzZXJ2aWNlcy4nLFxyXG4gICAgICAgICAgICBhcjogJ9mB2LHZitmCINmF2YXYqtin2LIg2YTZhNi52YXZhCDZhdi52YcuINil2YrYrNin2KjZiiDYr9in2KbZhdmL2Kcg2YTZhNi52KvZiNixINi52YTZiSDYp9mE2K3ZhCDYp9mE2KPZhtiz2KguINmH2YUg2KXYrdiv2Ykg2LTYsdmD2KfYqiDYqti32YjZitixINin2YTZiNmK2Kgg2KfZhNmF2K3Yqtix2YHYqSDYp9mE2KrZiiDYqtmC2K/ZhSDYrtiv2YXYp9iqINix2KfYpti52KkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnTG9ubnkgQ29ya2VyeScsIGFyOiAn2K3Ys9mI2YYg2KfZhNmC2YTYp9mEJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdQcm9qZWN0IE1hbmFnZXInLCBhcjogJ9mF2K/ZitixINin2YTZhdi02KfYsdmK2LknIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMtMy5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnTmFmaWUgdGVhbSBpcyB2ZXJ5IHByb2Zlc3Npb25hbCwgYWx3YXlzIGRlbGl2ZXJzIGhpZ2ggcXVhbGl0eSByZXN1bHRzLCBhbmQgaXMgYWx3YXlzIHRoZXJlIHRvIGhlbHAuIExvb2sgZm9yd2FyZCB0byB3b3JraW5nIHdpdGggTmFmaWUgaW4gb3RoZXIgcHJvamVjdHMuJyxcclxuICAgICAgICAgICAgYXI6ICfZhdit2YXYryDZhdi32YjYsSDZhdit2KrYsdmBINmE2YTYutin2YrYqSDZitmC2K/ZhSDYr9in2KbZhdmL2Kcg2YbYqtin2KbYrCDYudin2YTZitipINin2YTYrNmI2K/YqSDYjCDZiNmH2Ygg2K/Yp9im2YXZi9inINmF2YjYrNmI2K8g2YTZhNmF2LPYp9i52K/YqS4g2YbYqti32YTYuSDYpdmE2Ykg2KfZhNi52YXZhCDZhdi52Ycg2YHZiiDZhdi02KfYsdmK2Lkg2KPYrtix2YkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnTWF4IFNjaG1pZHQgRERTJywgYXI6ICfZhdi12LfZgdmJINin2YTYrtmE2YrZgdmKJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdDRU8sIERlc2lnbmVyJywgYXI6ICfYo9iu2LXYp9im2YogU0VPJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTQuanBnJyxcclxuICAgICAgICAgIHF1b3RlQ29udGVudDoge1xyXG4gICAgICAgICAgICBlbjogJ05hZmllIHdvcmtlZCBvbiBhIGhhbmRmdWwgb2YgcHJvamVjdHMgZm9yIHVzIGFuZCBoYXMgYWx3YXlzIGV4Y2VlZGVkIG91ciBleHBlY3RhdGlvbnMuIE5hZmllIHRlYW0gaXMgZGVkaWNhdGVkLCB0YWxlbnRlZCBhbmQgYSBkZWxpZ2h0IHRvIHdvcmsgd2l0aC4nLFxyXG4gICAgICAgICAgICBhcjogJ9i52YXZhCDZhdit2YXYryDZgdmKINi52K/YryDZg9io2YrYsSDZhdmGINin2YTZhdi02KfYsdmK2Lkg2YTYo9is2YTZhtinINmI2YPYp9mGINiv2KfYptmF2YvYpyDZitmB2YjZgiDYqtmI2YLYudin2KrZhtinLiDZhdi32YjYsSDZhdiq2K7Ytdi1INmI2YXZiNmH2YjYqCDZiNmG2LPYudivINiv2KfYptmF2YvYpyDYqNin2YTYudmF2YQg2YXYudmHLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdW90ZUF1dGhvcjogeyBlbjogJ0FtaXIgU3RvbHRlbmJlcmcnLCBhcjogJ9i52KjYp9izINin2YTYudmG2KfYqNmKJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdTYWxlcyBNYW5hZ2VyJywgYXI6ICfZhdiv2YrYsSDZhdio2YrYudin2KonIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMtNS5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnSSBrbm93IEkgY2FuIGNvdW50IG9uIHlvdXIgc2VydmljZSBpZiBJIG5lZWQgbXkgcHJvamVjdCBkb25lIGZhc3QgYW5kIHdpdGggdGhlIGJlc3QgcG9zc2libGUgcmVzdWx0LiBJIGFtIGEgcmVndWxhciBjdXN0b21lciBhbmQgaG9wZSB0byBjb250aW51ZSBvdXIgd29yayEnLFxyXG4gICAgICAgICAgICBhcjogJ9mK2YXZg9mG2YbZiiDYp9mE2KfYudiq2YXYp9ivINi52YTZiSDYrtiv2YXYp9iqINmF2K3ZhdivINiv2KfYptmF2YvYpyDZiNiu2KfYtdipINil2LDYpyDZg9mG2Kog2KjYrdin2KzYqSDYpdmE2Ykg2KXZhtis2KfYsiDZhdi02LHZiNi52Yog2YHZiiDYo9mC2YQg2YjZgtiqINmI2KjYo9mB2LbZhCDZhtiq2YrYrNipINmF2YXZg9mG2KkuINij2YbYpyDYudmF2YrZhCDZhdmG2KrYuNmFINmE2K/ZitmHINmI2KLZhdmEINij2YYg2YbZiNin2LXZhCDYudmF2YTZhtinINmF2LnYpyDYr9in2KbZhdmL2KcuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnS2VudG9uIE1hcnF1YXJkdCcsIGFyOiAn2LPZhdmK2LEg2KfZhNmG2KzYp9ixJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdBcnQgRGlyZWN0b3InLCBhcjogJ9ii2LHYqiDYr9in2YrYsdmD2KrZiNixJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTYuanBnJyxcclxuICAgICAgICAgIHF1b3RlQ29udGVudDoge1xyXG4gICAgICAgICAgICBlbjogJ011aGFtbWFkIHdhcyBhIHJlYWwgcGxlYXN1cmUgdG8gd29yayB3aXRoIGFuZCB3ZSBsb29rIGZvcndhcmQgdG8gd29ya2luZyB3aXRoIGhpbSBhZ2Fpbi4gSGXigJlzIGRlZmluaXRlbHkgdGhlIGtpbmQgb2YgZGV2ZWxvcGVyIHlvdSBjYW4gdHJ1c3Qgd2l0aCBhIHByb2plY3QgZnJvbSBzdGFydCB0byBmaW5pc2guJyxcclxuICAgICAgICAgICAgYXI6ICfYo9mG2Kcg2LPYudmK2K8g2K3ZgtmL2Kcg2KjYp9mE2LnZhdmEINmF2Lkg2YXYrdmF2K8g2YjYo9iq2LfZhNi5INil2YTZiSDYp9mE2LnZhdmEINmF2LnZhyDZhdix2Kkg2KPYrtix2Ykg2YLYsdmK2KjYpy4g2YfZiCDYqNin2YTYqtij2YPZitivINmF2YYg2KfZhNmF2LfZiNix2YrZhiDYp9mE2LDZiiDZitmF2YPZhtmDINin2YTZiNir2YjZgiDYqNmH2YUg2YTZhNi52YXZhCDYudmE2Ykg2YXYtNix2YjYudmDINmF2YYg2KfZhNio2K/Yp9mK2Kkg2KXZhNmJINin2YTZhtmH2KfZitipLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdW90ZUF1dGhvcjogeyBlbjogJ1JleW5hIEhhbW1lcycsIGFyOiAn2KPZhdmK2LEg2K/Yp9mI2YjYrycgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnTW90aW9uIEdyYXBoaWMgQW5pbWF0b3InLCBhcjogJ9mF2LXZhdmFINmF2YjYtNmGINis2LHYp9mB2YrZgycgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy03LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdNdWhhbW1hZCB3YXMgYSByZWFsIHBsZWFzdXJlIHRvIHdvcmsgd2l0aCBhbmQgd2UgbG9vayBmb3J3YXJkIHRvIHdvcmtpbmcgd2l0aCBoaW0gYWdhaW4uIEhl4oCZcyBkZWZpbml0ZWx5IHRoZSBraW5kIG9mIGRldmVsb3BlciB5b3UgY2FuIHRydXN0IHdpdGggYSBwcm9qZWN0IGZyb20gc3RhcnQgdG8gZmluaXNoLicsXHJcbiAgICAgICAgICAgIGFyOiAn2KPZhtinINiz2LnZitivINit2YLZi9inINio2KfZhNi52YXZhCDZhdi5INmF2K3ZhdivINmI2KPYqti32YTYuSDYpdmE2Ykg2KfZhNi52YXZhCDZhdi52Ycg2YXYsdipINij2K7YsdmJINmC2LHZitio2KcuINmH2Ygg2KjYp9mE2KrYo9mD2YrYryDZhdmGINin2YTZhdi32YjYsdmK2YYg2KfZhNiw2Yog2YrZhdmD2YbZgyDYp9mE2YjYq9mI2YIg2KjZh9mFINmE2YTYudmF2YQg2LnZhNmJINmF2LTYsdmI2LnZgyDZhdmGINin2YTYqNiv2KfZitipINil2YTZiSDYp9mE2YbZh9in2YrYqS4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcXVvdGVBdXRob3I6IHsgZW46ICdKb3ZhbiBQYXJpc2lhbicsIGFyOiAn2YXZhti12YjYsSDYp9mE2LPZgtin2LcnIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ01vdGlvbiBHcmFwaGljIEFuaW1hdG9yJywgYXI6ICfZhdi12YXZhSDZhdmI2LTZhiDYrNix2KfZgdmK2YMnIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMtOC5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnSSBrbm93IEkgY2FuIGNvdW50IG9uIHlvdXIgc2VydmljZSBpZiBJIG5lZWQgbXkgcHJvamVjdCBkb25lIGZhc3QgYW5kIHdpdGggdGhlIGJlc3QgcG9zc2libGUgcmVzdWx0LiBJIGFtIGEgcmVndWxhciBjdXN0b21lciBhbmQgaG9wZSB0byBjb250aW51ZSBvdXIgd29yayEnLFxyXG4gICAgICAgICAgICBhcjogJ9mK2YXZg9mG2YbZiiDYp9mE2KfYudiq2YXYp9ivINi52YTZiSDYrtiv2YXYp9iqINmF2K3ZhdivINiv2KfYptmF2YvYpyDZiNiu2KfYtdipINil2LDYpyDZg9mG2Kog2KjYrdin2KzYqSDYpdmE2Ykg2KXZhtis2KfYsiDZhdi02LHZiNi52Yog2YHZiiDYo9mC2YQg2YjZgtiqINmI2KjYo9mB2LbZhCDZhtiq2YrYrNipINmF2YXZg9mG2KkuINij2YbYpyDYudmF2YrZhCDZhdmG2KrYuNmFINmE2K/ZitmHINmI2KLZhdmEINij2YYg2YbZiNin2LXZhCDYudmF2YTZhtinINmF2LnYpyDYr9in2KbZhdmL2KcuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnUGFzcXVhbGUgRGVja293JywgYXI6ICfYudi32Kcg2KjZhiDYudin2LTZiNixJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdBcnQgRGlyZWN0b3InLCBhcjogJ9ii2LHYqiDYr9in2YrYsdmD2KrZiNixJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTkuanBnJyxcclxuICAgICAgICAgIHF1b3RlQ29udGVudDoge1xyXG4gICAgICAgICAgICBlbjogJ05hZmllIHdvcmtlZCBvbiBhIGhhbmRmdWwgb2YgcHJvamVjdHMgZm9yIHVzIGFuZCBoYXMgYWx3YXlzIGV4Y2VlZGVkIG91ciBleHBlY3RhdGlvbnMuIE5hZmllIHRlYW0gaXMgZGVkaWNhdGVkLCB0YWxlbnRlZCBhbmQgYSBkZWxpZ2h0IHRvIHdvcmsgd2l0aC4nLFxyXG4gICAgICAgICAgICBhcjogJ9i52YXZhCDZhdit2YXYryDZgdmKINi52K/YryDZg9io2YrYsSDZhdmGINin2YTZhdi02KfYsdmK2Lkg2YTYo9is2YTZhtinINmI2YPYp9mGINiv2KfYptmF2YvYpyDZitmB2YjZgiDYqtmI2YLYudin2KrZhtinLiDZhdi32YjYsSDZhdiq2K7Ytdi1INmI2YXZiNmH2YjYqCDZiNmG2LPYudivINiv2KfYptmF2YvYpyDYqNin2YTYudmF2YQg2YXYudmHLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdW90ZUF1dGhvcjogeyBlbjogJ1Jvc2EgRmVycnknLCBhcjogJ9mG2KfZgdi5INit2KfYqtmFJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdTYWxlcyBNYW5hZ2VyJywgYXI6ICfZhdiv2YrYsSDZhdio2YrYudin2KonIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpbWdVcmw6ICdhc3NldHMvaW1hZ2VzL3Rlc3RpbW9uaWFscy90ZXN0aW1vbmlhbHMtMTAuanBnJyxcclxuICAgICAgICAgIHF1b3RlQ29udGVudDoge1xyXG4gICAgICAgICAgICBlbjogJ05hZmllIHRlYW0gaXMgdmVyeSBwcm9mZXNzaW9uYWwsIGFsd2F5cyBkZWxpdmVycyBoaWdoIHF1YWxpdHkgcmVzdWx0cywgYW5kIGlzIGFsd2F5cyB0aGVyZSB0byBoZWxwLiBMb29rIGZvcndhcmQgdG8gd29ya2luZyB3aXRoIE5hZmllIGluIG90aGVyIHByb2plY3RzLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YXYrdmF2K8g2YXYt9mI2LEg2YXYrdiq2LHZgSDZhNmE2LrYp9mK2Kkg2YrZgtiv2YUg2K/Yp9im2YXZi9inINmG2KrYp9im2Kwg2LnYp9mE2YrYqSDYp9mE2KzZiNiv2Kkg2Iwg2YjZh9mIINiv2KfYptmF2YvYpyDZhdmI2KzZiNivINmE2YTZhdiz2KfYudiv2KkuINmG2KrYt9mE2Lkg2KXZhNmJINin2YTYudmF2YQg2YXYudmHINmB2Yog2YXYtNin2LHZiti5INij2K7YsdmJLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdW90ZUF1dGhvcjogeyBlbjogJ0tlc2hhdW4gUm9iZWwnLCBhcjogJ9i12K/ZgtmKINin2YTYt9mI2YrZhCcgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnQ0VPLCBEZXNpZ25lcicsIGFyOiAn2KPYrti12KfYptmKIFNFTycgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy0xMS5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnRXhjZWxsZW50IFRlYW0gdG8gd29yayB3aXRoLiBBbHdheXMgcG9zaXRpdmUgdG8gZmluZCB0aGUgbW9zdCBhcHByb3ByaWF0ZSBzb2x1dGlvbi4gTmFmaWUgaXMgb25lIG9mIHRoZSBwcm9mZXNzaW9uYWwgd2ViIGRldmVsb3BtZW50IGFnZW5jeSB0aGF0IHByb3ZpZGVzIGF3ZXNvbWUgc2VydmljZXMuJyxcclxuICAgICAgICAgICAgYXI6ICfZgdix2YrZgiDZhdmF2KrYp9iyINmE2YTYudmF2YQg2YXYudmHLiDYpdmK2KzYp9io2Yog2K/Yp9im2YXZi9inINmE2YTYudir2YjYsSDYudmE2Ykg2KfZhNit2YQg2KfZhNij2YbYs9ioLiDZh9mFINil2K3Yr9mJINi02LHZg9in2Kog2KrYt9mI2YrYsSDYp9mE2YjZitioINin2YTZhdit2KrYsdmB2Kkg2KfZhNiq2Yog2KrZgtiv2YUg2K7Yr9mF2KfYqiDYsdin2KbYudipLidcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBxdW90ZUF1dGhvcjogeyBlbjogJ0Nhc3BlciBQYXVjZWsnLCBhcjogJ9it2LPYp9mGINin2K/YsdmK2LMnIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ1Byb2plY3QgTWFuYWdlcicsIGFyOiAn2YXYr9mK2LEg2KfZhNmF2LTYp9ix2YrYuScgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy0xMi5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnTmFmaWUgc2ltcGx5IHByb3ZpZGVzIGFtYXppbmcgd2ViIGRldmVsb3BtZW50IHNlcnZpY2UuIFRoZWlyIHRlYW0gaXMgZXh0cmVtZWx5IHByb2Zlc3Npb25hbCBhbmQgdGhlIGVhc2llc3QgdG8gbWVldCBJIGhhdmUgZXZlciB3b3JrZWQgd2l0aC4gSSB3b3VsZCByZWNvbW1lbmQgTmFmaWUgdG8gYW55b25lLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YXYrdmF2K8g2YrZgtiv2YUg2K7Yr9mF2KfYqiDZhdiw2YfZhNipINmB2Yog2KrYt9mI2YrYsSDYp9mE2YjZitio2Iwg2YjZhNiv2YrZhyDZgdix2YrZgiDZhdit2KrYsdmBINmK2KzYudmEINin2YTYqti52KfZhdmEINmF2LnZh9mFINmF2LfZhdim2YYg2YTZhNi62KfZitipLiDYo9mI2LXZiiDYqNmB2LHZitmC2YfZhSDZhNmE2KzZhdmK2LkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnQXJjaGliYWxkIEZhZGVsJywgYXI6ICfZhdis2K8g2KfZhNmD2KfZgdmKJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdQaG90b2dyYXBoZXInLCBhcjogJ9mF2LXZiNixINmB2YjYqtmI2LrYsdin2YHZiicgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGltZ1VybDogJ2Fzc2V0cy9pbWFnZXMvdGVzdGltb25pYWxzL3Rlc3RpbW9uaWFscy0xMy5qcGcnLFxyXG4gICAgICAgICAgcXVvdGVDb250ZW50OiB7XHJcbiAgICAgICAgICAgIGVuOiAnTmFmaWUgc2ltcGx5IHByb3ZpZGVzIGFtYXppbmcgd2ViIGRldmVsb3BtZW50IHNlcnZpY2UuIFRoZWlyIHRlYW0gaXMgZXh0cmVtZWx5IHByb2Zlc3Npb25hbCBhbmQgdGhlIGVhc2llc3QgdG8gbWVldCBJIGhhdmUgZXZlciB3b3JrZWQgd2l0aC4gSSB3b3VsZCByZWNvbW1lbmQgTmFmaWUgdG8gYW55b25lLicsXHJcbiAgICAgICAgICAgIGFyOiAn2YXYrdmF2K8g2YrZgtiv2YUg2K7Yr9mF2KfYqiDZhdiw2YfZhNipINmB2Yog2KrYt9mI2YrYsSDYp9mE2YjZitio2Iwg2YjZhNiv2YrZhyDZgdix2YrZgiDZhdit2KrYsdmBINmK2KzYudmEINin2YTYqti52KfZhdmEINmF2LnZh9mFINmF2LfZhdim2YYg2YTZhNi62KfZitipLiDYo9mI2LXZiiDYqNmB2LHZitmC2YfZhSDZhNmE2KzZhdmK2LkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnVGFiaXRoYSBEZW5lc2lrJywgYXI6ICfYotiz2LEg2KjZhtiz2YTYp9mF2KknIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ1Bob3RvZ3JhcGhlcicsIGFyOiAn2YXYtdmI2LEg2YHZiNiq2YjYutix2KfZgdmKJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTE0LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdFeGNlbGxlbnQgVGVhbSB0byB3b3JrIHdpdGguIEFsd2F5cyBwb3NpdGl2ZSB0byBmaW5kIHRoZSBtb3N0IGFwcHJvcHJpYXRlIHNvbHV0aW9uLiBOYWZpZSBpcyBvbmUgb2YgdGhlIHByb2Zlc3Npb25hbCB3ZWIgZGV2ZWxvcG1lbnQgYWdlbmN5IHRoYXQgcHJvdmlkZXMgYXdlc29tZSBzZXJ2aWNlcy4nLFxyXG4gICAgICAgICAgICBhcjogJ9mB2LHZitmCINmF2YXYqtin2LIg2YTZhNi52YXZhCDZhdi52YcuINil2YrYrNin2KjZiiDYr9in2KbZhdmL2Kcg2YTZhNi52KvZiNixINi52YTZiSDYp9mE2K3ZhCDYp9mE2KPZhtiz2KguINmH2YUg2KXYrdiv2Ykg2LTYsdmD2KfYqiDYqti32YjZitixINin2YTZiNmK2Kgg2KfZhNmF2K3Yqtix2YHYqSDYp9mE2KrZiiDYqtmC2K/ZhSDYrtiv2YXYp9iqINix2KfYpti52KkuJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHF1b3RlQXV0aG9yOiB7IGVuOiAnSmF2b24gQm9nYW4nLCBhcjogJ9i12YfZitioINin2YTYtNix2YrZgScgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnUHJvamVjdCBNYW5hZ2VyJywgYXI6ICfZhdiv2YrYsSDYp9mE2YXYtNin2LHZiti5JyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTE1LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdOYWZpZSB0ZWFtIGlzIHZlcnkgcHJvZmVzc2lvbmFsLCBhbHdheXMgZGVsaXZlcnMgaGlnaCBxdWFsaXR5IHJlc3VsdHMsIGFuZCBpcyBhbHdheXMgdGhlcmUgdG8gaGVscC4gTG9vayBmb3J3YXJkIHRvIHdvcmtpbmcgd2l0aCBOYWZpZSBpbiBvdGhlciBwcm9qZWN0cy4nLFxyXG4gICAgICAgICAgICBhcjogJ9mF2K3ZhdivINmF2LfZiNixINmF2K3Yqtix2YEg2YTZhNi62KfZitipINmK2YLYr9mFINiv2KfYptmF2YvYpyDZhtiq2KfYptisINi52KfZhNmK2Kkg2KfZhNis2YjYr9ipINiMINmI2YfZiCDYr9in2KbZhdmL2Kcg2YXZiNis2YjYryDZhNmE2YXYs9in2LnYr9ipLiDZhtiq2LfZhNi5INil2YTZiSDYp9mE2LnZhdmEINmF2LnZhyDZgdmKINmF2LTYp9ix2YrYuSDYo9iu2LHZiS4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcXVvdGVBdXRob3I6IHsgZW46ICdEdW5jYW4gS2VtbWVyJywgYXI6ICfYs9mK2K8g2YPYsdmFJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdDRU8sIERlc2lnbmVyJywgYXI6ICfYo9iu2LXYp9im2YogU0VPJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTE2LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdOYWZpZSB3b3JrZWQgb24gYSBoYW5kZnVsIG9mIHByb2plY3RzIGZvciB1cyBhbmQgaGFzIGFsd2F5cyBleGNlZWRlZCBvdXIgZXhwZWN0YXRpb25zLiBOYWZpZSB0ZWFtIGlzIGRlZGljYXRlZCwgdGFsZW50ZWQgYW5kIGEgZGVsaWdodCB0byB3b3JrIHdpdGguJyxcclxuICAgICAgICAgICAgYXI6ICfYudmF2YQg2YXYrdmF2K8g2YHZiiDYudiv2K8g2YPYqNmK2LEg2YXZhiDYp9mE2YXYtNin2LHZiti5INmE2KPYrNmE2YbYpyDZiNmD2KfZhiDYr9in2KbZhdmL2Kcg2YrZgdmI2YIg2KrZiNmC2LnYp9iq2YbYpy4g2YXYt9mI2LEg2YXYqtiu2LXYtSDZiNmF2YjZh9mI2Kgg2YjZhtiz2LnYryDYr9in2KbZhdmL2Kcg2KjYp9mE2LnZhdmEINmF2LnZhy4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcXVvdGVBdXRob3I6IHsgZW46ICdDb3kgSm9obnMnLCBhcjogJ9mH2YrYq9mFINin2YTYtNix2YrZgScgfSxcclxuICAgICAgICAgIGpvYlRpdGxlOiB7IGVuOiAnU2FsZXMgTWFuYWdlcicsIGFyOiAn2YXYr9mK2LEg2YXYqNmK2LnYp9iqJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTE3LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdJIGtub3cgSSBjYW4gY291bnQgb24geW91ciBzZXJ2aWNlIGlmIEkgbmVlZCBteSBwcm9qZWN0IGRvbmUgZmFzdCBhbmQgd2l0aCB0aGUgYmVzdCBwb3NzaWJsZSByZXN1bHQuIEkgYW0gYSByZWd1bGFyIGN1c3RvbWVyIGFuZCBob3BlIHRvIGNvbnRpbnVlIG91ciB3b3JrIScsXHJcbiAgICAgICAgICAgIGFyOiAn2YrZhdmD2YbZhtmKINin2YTYp9i52KrZhdin2K8g2LnZhNmJINiu2K/Zhdin2Kog2YXYrdmF2K8g2K/Yp9im2YXZi9inINmI2K7Yp9i12Kkg2KXYsNinINmD2YbYqiDYqNit2KfYrNipINil2YTZiSDYpdmG2KzYp9iyINmF2LTYsdmI2LnZiiDZgdmKINij2YLZhCDZiNmC2Kog2YjYqNij2YHYttmEINmG2KrZitis2Kkg2YXZhdmD2YbYqS4g2KPZhtinINi52YXZitmEINmF2YbYqti42YUg2YTYr9mK2Ycg2YjYotmF2YQg2KPZhiDZhtmI2KfYtdmEINi52YXZhNmG2Kcg2YXYudinINiv2KfYptmF2YvYpy4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcXVvdGVBdXRob3I6IHsgZW46ICdNdXJwaHkgUm9iZXJ0cycsIGFyOiAn2KXYs9mE2KfZhSDZhdi12LfZgdmJJyB9LFxyXG4gICAgICAgICAgam9iVGl0bGU6IHsgZW46ICdBcnQgRGlyZWN0b3InLCBhcjogJ9ii2LHYqiDYr9in2YrYsdmD2KrZiNixJyB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaW1nVXJsOiAnYXNzZXRzL2ltYWdlcy90ZXN0aW1vbmlhbHMvdGVzdGltb25pYWxzLTE4LmpwZycsXHJcbiAgICAgICAgICBxdW90ZUNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgZW46ICdNdWhhbW1hZCB3YXMgYSByZWFsIHBsZWFzdXJlIHRvIHdvcmsgd2l0aCBhbmQgd2UgbG9vayBmb3J3YXJkIHRvIHdvcmtpbmcgd2l0aCBoaW0gYWdhaW4uIEhl4oCZcyBkZWZpbml0ZWx5IHRoZSBraW5kIG9mIGRldmVsb3BlciB5b3UgY2FuIHRydXN0IHdpdGggYSBwcm9qZWN0IGZyb20gc3RhcnQgdG8gZmluaXNoLicsXHJcbiAgICAgICAgICAgIGFyOiAn2KPZhtinINiz2LnZitivINit2YLZi9inINio2KfZhNi52YXZhCDZhdi5INmF2K3ZhdivINmI2KPYqti32YTYuSDYpdmE2Ykg2KfZhNi52YXZhCDZhdi52Ycg2YXYsdipINij2K7YsdmJINmC2LHZitio2KcuINmH2Ygg2KjYp9mE2KrYo9mD2YrYryDZhdmGINin2YTZhdi32YjYsdmK2YYg2KfZhNiw2Yog2YrZhdmD2YbZgyDYp9mE2YjYq9mI2YIg2KjZh9mFINmE2YTYudmF2YQg2LnZhNmJINmF2LTYsdmI2LnZgyDZhdmGINin2YTYqNiv2KfZitipINil2YTZiSDYp9mE2YbZh9in2YrYqS4nXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcXVvdGVBdXRob3I6IHsgZW46ICdEaW1pdHJpIExvY2ttYW4nLCBhcjogJ9mI2LPZitmFINin2YTYs9mC2KcnIH0sXHJcbiAgICAgICAgICBqb2JUaXRsZTogeyBlbjogJ01vdGlvbiBHcmFwaGljIEFuaW1hdG9yJywgYXI6ICfZhdi12YXZhSDZhdmI2LTZhiDYrNix2KfZgdmK2YMnIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZWQoKSB7XHJcbiAgICAvLyBnZXQgYSB0aGVtZSB0byB1c2VcclxuICAgIHRoaXMuZ2V0QXBwVGhlbWUoKTtcclxuICB9LFxyXG4gIG1vdW50ZWQoKSB7XHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gOTkyKSB7XHJcbiAgICAgIC8vIGluaXRpYWxpemUgY2lyY2xlIGN1cnNvclxyXG4gICAgICB0aGlzLmluaXRDaXJjbGVDdXJzb3IoKTtcclxuXHJcbiAgICAgIC8vIGFwcGx5IHBhbiBlZmZlY3QgaGVybyBpbWFnZVxyXG4gICAgICB0aGlzLmhlcm9JbWdQYW5FZmZlY3QoKTtcclxuXHJcbiAgICAgIC8vIGluaXRpYWxpemUgVmFuaWxsYVRpbHQgbGlicmFyeSBpbiBwb3J0Zm9saW8gc2VjdGlvblxyXG4gICAgICB0aGlzLmluaXRpYWxpemVUaWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbmF2IG1lbnUgdGFiIHRyYXBcclxuICAgIHRoaXMubmF2TWVudVRhYlRyYXAoKTtcclxuXHJcbiAgICAvLyBzY3JvbGxpbmcgb3B0aW9uc1xyXG4gICAgdGhpcy5zY3JvbGxpbmdPcHRpb25zKCk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB0aGlzLnNjcm9sbGluZ09wdGlvbnMoKSk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBwb3BwZXIuanMgcGx1Z2luXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGFzLXVsdGltYXRlLXRvb2x0aXAnKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgUG9wcGVyLmNyZWF0ZVBvcHBlcihlbCwgZWwucXVlcnlTZWxlY3RvcignLnVsdGltYXRlLXRvb2x0aXAnKSwge1xyXG4gICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXHJcbiAgICAgICAgbW9kaWZpZXJzOiBbeyBuYW1lOiAnb2Zmc2V0Jywgb3B0aW9uczogeyBvZmZzZXQ6IFswLCAzMF0gfX1dXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZ2V0IHBvcnRmb2xpbyBpdGVtc1xyXG4gICAgdGhpcy5nZXRQb3J0Zm9saW9JdGVtcygpO1xyXG5cclxuICAgIC8vIGluaXQgZ2xpZ2h0Ym94IHBsdWdpblxyXG4gICAgY29uc3QgbGlnaHRib3ggPSBuZXcgR0xpZ2h0Ym94KHtcclxuICAgICAgYXV0b3BsYXlWaWRlb3M6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyc3QgZGlzcGxheWVkIHR5cGUgb2Ygc2tpbGxzXHJcbiAgICB0aGlzLmluaXRTa2lsbHNGaXJzdFR5cGUoKTtcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIC8vIGluaXRpYWxpemUgY2lyY2xlIGN1cnNvclxyXG4gICAgaW5pdENpcmNsZUN1cnNvcigpIHtcclxuICAgICAgY29uc3QgYXBwID0gdGhpcy4kcmVmcy5hcHBSZWY7XHJcbiAgICAgIGNvbnN0IG91dGVyID0gdGhpcy4kcmVmcy5jaXJjbGVDdXJzb3JPdXRlcjtcclxuICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmNpcmNsZUN1cnNvcklubmVyO1xyXG5cclxuICAgICAgLy8gcmV0dXJuIGlmIGRpc2FibGVkXHJcbiAgICAgIGlmICghb3V0ZXIgfHwgIWlubmVyKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgYXBwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xyXG4gICAgICAgIC8vIG1ha2UgdGhlIGNpcmNsZXMgZm9sbG93IHRoZSBjdXJzb3JcclxuICAgICAgICBvdXRlci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHZpc2liaWxpdHk6IHZpc2libGU7IHRvcDogJHtlLmNsaWVudFl9cHg7IGxlZnQ6ICR7ZS5jbGllbnRYfXB4O2ApO1xyXG4gICAgICAgIGlubmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgdmlzaWJpbGl0eTogdmlzaWJsZTsgdG9wOiAke2UuY2xpZW50WX1weDsgbGVmdDogJHtlLmNsaWVudFh9cHg7YCk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBsaW5rIGhvdmVyIHN0eWxlXHJcbiAgICAgICAgKGUudGFyZ2V0LmNsb3Nlc3QoJ2EnKSB8fCBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24nKSB8fCBlLnRhcmdldC5jbG9zZXN0KCcubGluay1ob3ZlcicpKSA/IGlubmVyLmNsYXNzTGlzdC5hZGQoJ2N1cnNvci1saW5rLWhvdmVyJykgOiBpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdjdXJzb3ItbGluay1ob3ZlcicpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFwcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAvLyBhZGQgcHVsc2UgZWZmZWN0IG9uIGNsaWNrXHJcbiAgICAgICAgaW5uZXIuY2xhc3NMaXN0LmFkZCgnY3Vyc29yLWNsaWNrLWVmZmVjdCcpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnY3Vyc29yLWNsaWNrLWVmZmVjdCcpLCAyMDApO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gZ2V0IGEgdGhlbWUgdG8gdXNlXHJcbiAgICBnZXRBcHBUaGVtZSgpIHtcclxuICAgICAgLy8gZ2V0IHRoZSBzYXZlZCB0aGVtZSBmcm9tIHRoZSBsb2NhbFN0b3JhZ2VcclxuICAgICAgY29uc3Qgc3RvcmFnZVNhdmVkVGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFmaWVTYXZlZFRoZW1lJyk7XHJcbiAgICBcclxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGEgc2F2ZWQgdGhlbWVcclxuICAgICAgaWYgKHN0b3JhZ2VTYXZlZFRoZW1lKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlZFRoZW1lID0gc3RvcmFnZVNhdmVkVGhlbWU7XHJcbiAgICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBTbywgdHJ5IHRvIGdldCB0aGUgYnJvd3NlciBkZWZhdWx0IHRoZW1lIG9yIG1ha2UgeW91ciBvd24gZGVmYXVsdFxyXG4gICAgXHJcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIE1lZGlhLVF1ZXJpZXMgYXJlIHN1cHBvcnRlZFxyXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xyXG4gICAgXHJcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgZGFyay1tb2RlIE1lZGlhLVF1ZXJ5IG1hdGNoZXNcclxuICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlZFRoZW1lID0gJ2RhcmtfdGhlbWUnO1xyXG4gICAgICAgICAgfSBlbHNlIHsgdGhpcy5zYXZlZFRoZW1lID0gJ2xpZ2h0X3RoZW1lJzsgfVxyXG4gICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIERlZmF1bHQgKHdoZW4gTWVkaWEtUXVlcmllcyBhcmUgbm90IHN1cHBvcnRlZClcclxuICAgICAgICAgIHRoaXMuc2F2ZWRUaGVtZSA9IHRoaXMuYXBwVGhlbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcclxuICAgICAgLy8gc2F2ZSB0aGUgbmV3IHRoZW1lIGluIHRoZSBsb2NhbFN0b3JhZ2VcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hZmllU2F2ZWRUaGVtZScsIHRoaXMuc2F2ZWRUaGVtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGRldGVjdCB0aGUgdGhlbWUgY2hhbmdlc1xyXG4gICAgY2hhbmdlQXBwVGhlbWUoKSB7XHJcbiAgICAgICh0aGlzLnNhdmVkVGhlbWUgPT09ICdsaWdodF90aGVtZScpID8gdGhpcy5zYXZlZFRoZW1lID0gJ2RhcmtfdGhlbWUnIDogdGhpcy5zYXZlZFRoZW1lID0gJ2xpZ2h0X3RoZW1lJztcclxuXHJcbiAgICAgIC8vIHNhdmUgdGhlIG5ldyB0aGVtZSBpbiB0aGUgbG9jYWxTdG9yYWdlXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYWZpZVNhdmVkVGhlbWUnLCB0aGlzLnNhdmVkVGhlbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB0b2dnbGUgbmF2IG1lbnVcclxuICAgIHRvZ2dsZU5hdk1lbnUoKSB7XHJcbiAgICAgIHRoaXMuaXNOYXZNZW51T3BlbiA9ICF0aGlzLmlzTmF2TWVudU9wZW47XHJcbiAgICAgIHRoaXMuaXNOYXZNZW51T3BlbiA/IHRoaXMub3Blbk5hdk1lbnUoKSA6IHRoaXMuY2xvc2VOYXZNZW51KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG9wZW4gbmF2IG1lbnVcclxuICAgIG9wZW5OYXZNZW51KCkge1xyXG4gICAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG5cclxuICAgICAgdGhpcy5pc05hdk1lbnVPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgIGJvZHlFbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ292ZXJmbG93LXk6IGhpZGRlbjsnKTtcclxuXHJcbiAgICAgIC8vIHNldCBmb2N1cyBvbiBuYXYgbWVudVxyXG4gICAgICB0aGlzLiRyZWZzLmhlYWRlck5hdi5xdWVyeVNlbGVjdG9yKCcuZGVza3RvcC1tZW51LWNvbnRlbnQnKS5mb2N1cygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjbG9zZSBuYXYgbWVudVxyXG4gICAgY2xvc2VOYXZNZW51KCkge1xyXG4gICAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG5cclxuICAgICAgdGhpcy5pc05hdk1lbnVPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICBib2R5RWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG5cclxuICAgICAgLy8gc2V0IGZvY3VzIG9uIG5hdiBtZW51IHRvZ2dsZSBidXR0b25cclxuICAgICAgdGhpcy4kcmVmcy5uYXZNZW51VG9nZ2xlQnRuLmZvY3VzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG5hdiBtZW51IHRhYiB0cmFwXHJcbiAgICBuYXZNZW51VGFiVHJhcCgpIHtcclxuICAgICAgY29uc3QgbmF2ID0gdGhpcy4kcmVmcy5oZWFkZXJOYXY7XHJcbiAgICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nID0gJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBbdGFiaW5kZXg9XCIwXCJdJztcclxuICAgICAgbGV0IGZpcnN0VGFiU3RvcDtcclxuICAgICAgbGV0IGxhc3RUYWJTdG9wO1xyXG4gICAgICBsZXQgaXNGaXJzdFRhYlN0b3A7XHJcbiAgICAgIGxldCBpc0xhc3RUYWJTdG9wO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgICAgICBpZiAobmF2LmNsYXNzTGlzdC5jb250YWlucygnbWVudS1vcGVuJykpIHtcclxuICAgICAgICAgIC8vIGdldCBmaXJzdCAmIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnRzIGluIHRoZSBzaWRlIG1lbnUgZm9yIHRoZSB0YWIgdHJhcFxyXG4gICAgICAgICAgY29uc3QgdmlzaWJsZUZvY3VzYWJsZUVscyA9IFsuLi5uYXYucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1N0cmluZyldXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZWwgPT4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpO1xyXG4gICAgICAgICAgZmlyc3RUYWJTdG9wID0gdmlzaWJsZUZvY3VzYWJsZUVsc1swXTtcclxuICAgICAgICAgIGxhc3RUYWJTdG9wID0gdmlzaWJsZUZvY3VzYWJsZUVsc1t2aXNpYmxlRm9jdXNhYmxlRWxzLmxlbmd0aCAtMV07XHJcblxyXG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ1RhYicpIHtcclxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIC8qIHNoaWZ0ICsgdGFiICovIHtcclxuICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpdGVtLCBtb3ZlIHRvIHRoZSBsYXN0IGl0ZW1cclxuICAgICAgICAgICAgICBpc0ZpcnN0VGFiU3RvcCAmJiBsYXN0VGFiU3RvcC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgLyogdGFiICovIHtcclxuICAgICAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IGl0ZW0sIGdvIGJhY2sgdG8gdGhlIGZpcnN0IGl0ZW1cclxuICAgICAgICAgICAgICBpc0xhc3RUYWJTdG9wICYmIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjbG9zZSBuYXYgbWVudSBvbiBFc2NhcGUgYnV0dG9uIHByZXNzXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGUuY29kZSA9PT0gJ0VzY2FwZScpIHsgdGhpcy50b2dnbGVOYXZNZW51KCk7IH1cclxuXHJcbiAgICAgICAgICAvLyBnZXQgY3VycmVudCBhY3RpdmUgZWxlbWVudFxyXG4gICAgICAgICAgY29uc3QgYWN0aXZlRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAgICAgICAgIC8vIGNoZWNrIGlmIGxhc3QgaXRlbSBvciBub3RcclxuICAgICAgICAgIGlzTGFzdFRhYlN0b3AgPSAoYWN0aXZlRWwgPT09IGxhc3RUYWJTdG9wKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAvLyBjaGVjayBpZiBmaXJzdCBpdGVtIG9yIG5vdFxyXG4gICAgICAgICAgaXNGaXJzdFRhYlN0b3AgPSAoYWN0aXZlRWwgPT09IGZpcnN0VGFiU3RvcCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYXBwbHkgcGFuIGVmZmVjdCBoZXJvIGltYWdlXHJcbiAgICBoZXJvSW1nUGFuRWZmZWN0KCkge1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLiRyZWZzLmhlcm9TZWN0aW9uO1xyXG5cclxuICAgICAgLy8gcmV0dXJuIGlmIGRpc2FibGVkXHJcbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhbmVmZmVjdCcpKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgY29uc3QgbGF5ZXIxID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXllcicpWzBdO1xyXG4gICAgICBjb25zdCBsYXllcjIgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLmxheWVyJylbMV07XHJcblxyXG4gICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICBjb25zdCB4ID0gKChlLnggLSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCkgLyBwYXJlbnQub2Zmc2V0V2lkdGgpICogMTAwO1xyXG4gICAgICAgIGNvbnN0IHkgPSAoKGUueSAtIHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55KSAvIHBhcmVudC5vZmZzZXRIZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgtYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIGxheWVyMS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHRyYW5zZm9ybS1vcmlnaW46ICR7eH12dyAke3l9dmg7YCk7XHJcbiAgICAgICAgbGF5ZXIyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgdHJhbnNmb3JtLW9yaWdpbjogJHt4fXZ3ICR7eX12aDtgKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHNjcm9sbGluZyBvcHRpb25zXHJcbiAgICBzY3JvbGxpbmdPcHRpb25zKCkge1xyXG4gICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIFxyXG4gICAgICAvLyBjaGVjayBmb3IgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gdG8gbWluaW1pemUgdGhlIGhlYWRlclxyXG4gICAgICB0aGlzLmlzSGVhZGVyQmlnID0gKHNjcm9sbFBvc2l0aW9uID49IHRoaXMuc3RhcnRNaW5pbWl6aW5nSGVhZGVyQXQpID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgXHJcbiAgICAgIC8vIGNoZWNrIGZvciBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB0byB0b2dnbGUgdGhlIGhlYWRlclxyXG4gICAgICB0aGlzLmlzSGVhZGVySGlkZGVuID0gKChzY3JvbGxQb3NpdGlvbiA+IDEwMCkgJiYgKHNjcm9sbFBvc2l0aW9uID4gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24pKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxQb3NpdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2Nyb2xsIHRvIHRvcFxyXG4gICAgc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICAgIHdpbmRvdy5zY3JvbGwoeyB0b3A6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgZmlyc3QgZGlzcGxheWVkIHR5cGUgb2Ygc2tpbGxzXHJcbiAgICBpbml0U2tpbGxzRmlyc3RUeXBlKCkge1xyXG4gICAgICBjb25zdCBza2lsbHNTd2l0Y2hCdG4gPSB0aGlzLiRyZWZzLnNraWxsc1N3aXRjaEJ0bjtcclxuXHJcbiAgICAgIC8vIHJldHVybiBpZiBkaXNhYmxlZFxyXG4gICAgICBpZiAoIXNraWxsc1N3aXRjaEJ0bikgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIHRoaXMuc2tpbGxzVHlwZSA9IHNraWxsc1N3aXRjaEJ0bi5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIFZhbmlsbGFUaWx0IGxpYnJhcnkgaW4gcG9ydGZvbGlvIHNlY3Rpb25cclxuICAgIGluaXRpYWxpemVUaWx0KCkge1xyXG4gICAgICBjb25zdCBwb3J0Zm9saW9JdGVtcyA9IHRoaXMuJHJlZnMucG9ydGZvbGlvSXRlbXM7XHJcblxyXG4gICAgICAvLyByZXR1cm4gaWYgZGlzYWJsZWRcclxuICAgICAgaWYgKCFwb3J0Zm9saW9JdGVtcykgeyByZXR1cm47IH1cclxuXHJcbiAgICAgIFZhbmlsbGFUaWx0LmluaXQocG9ydGZvbGlvSXRlbXMucXVlcnlTZWxlY3RvckFsbCgnLnBvcnRmb2xpby1pdGVtJyksIHtcclxuICAgICAgICBtYXg6IDgsXHJcbiAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICBnbGFyZTogdHJ1ZSxcclxuICAgICAgICAnbWF4LWdsYXJlJzogMC4zXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBnZXQgcG9ydGZvbGlvIGl0ZW1zXHJcbiAgICBnZXRQb3J0Zm9saW9JdGVtcygpIHtcclxuICAgICAgY29uc3QgaXRlbXNBcnIgPSB0aGlzLmFsbFBvcnRmb2xpb0l0ZW1zXHJcbiAgICAgICAgLmZpbHRlcihpdGVtID0+IHtcclxuICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgICAgICBjb25zdCB0YXggPSB1cmxQYXJhbXMuZ2V0KCd0YXgnKTtcclxuXHJcbiAgICAgICAgICBpZiAodGF4KSB7XHJcbiAgICAgICAgICAgIGlmICh0YXggPT09ICdjYXQnKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY2F0ID0gdXJsUGFyYW1zLmdldCgnY2F0Jyk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvQXJjaGl2ZU5hbWUgPSBjYXQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnkgPT09IGNhdDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGF4ID09PSAndG9vbHMnKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdG9vbCA9IHVybFBhcmFtcy5nZXQoJ3Rvb2xzJyk7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvQXJjaGl2ZU5hbWUgPSB0b29sO1xyXG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLnRvb2xzLmluY2x1ZGVzKHRvb2wpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEZpbHRlciA9PT0gJ0FsbCcgfHwgaXRlbS5jYXRlZ29yeSA9PT0gdGhpcy5jdXJyZW50RmlsdGVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNsaWNlKHRoaXMuZmlsdGVyZWRQb3J0Zm9saW9JdGVtcy5sZW5ndGgsIHRoaXMucG9ydGZvbGlvSXRlbXNQYWdlICogdGhpcy5pdGVtc1BlclBhZ2UpO1xyXG5cclxuICAgICAgLy8gY2hlY2sgaWYgaGF2ZSB3b3JrcyBvciBub3RcclxuICAgICAgaWYgKGl0ZW1zQXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMucG9ydGZvbGlvSXRlbXMucHVzaCguLi5pdGVtc0Fycik7XHJcblxyXG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuICAgICAgICAgIC8vIHJlaW5pdGlhbGl6ZSBWYW5pbGxhVGlsdCBmb3IgbmV3IGl0ZW1zXHJcbiAgICAgICAgICB0aGlzLnBvcnRmb2xpb0l0ZW1zUGFnZSA+IDEgJiYgdGhpcy5pbml0aWFsaXplVGlsdCgpO1xyXG5cclxuICAgICAgICAgIC8vIEZvcmNlcyB0aGUgU2Nyb2xsVHJpZ2dlciBpbnN0YW5jZSB0byByZS1jYWxjdWxhdGUgaXRzIHN0YXJ0IGFuZCBlbmQgdmFsdWVzXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpLCA1MDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBvcnRmb2xpb0l0ZW1zUGFnZSsrO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gc2hvdyBtZXNzYWdlIFwiTm8gd29ya3NcIiB0byB0aGUgdXNlclxyXG4gICAgICAgIHRoaXMuc2V0Tm90aWZ5KHtcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2RhbmdlcicsXHJcbiAgICAgICAgICBtc2c6IHRoaXMuJHJlZnMucG9ydGZvbGlvSXRlbXMuZ2V0QXR0cmlidXRlKCdkYXRhLW5vLXdvcmtzLW1zZycpLFxyXG4gICAgICAgICAgdGltZTogMzAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGZpbHRlciBwb3J0Zm9saW8gaXRlbXNcclxuICAgIGZpbHRlclBvcnRmb2xpb0l0ZW1zKGZpbHRlcikge1xyXG4gICAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSBmaWx0ZXI7XHJcbiAgICAgIHRoaXMucG9ydGZvbGlvSXRlbXNQYWdlID0gMTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmZpbHRlcmVkUG9ydGZvbGlvSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgICAgICAgLy8gcmVpbml0aWFsaXplIFZhbmlsbGFUaWx0IGZvciBuZXcgaXRlbXNcclxuICAgICAgICAgIHRoaXMucG9ydGZvbGlvSXRlbXNQYWdlID4gMSAmJiB0aGlzLmluaXRpYWxpemVUaWx0KCk7XHJcblxyXG4gICAgICAgICAgLy8gRm9yY2VzIHRoZSBTY3JvbGxUcmlnZ2VyIGluc3RhbmNlIHRvIHJlLWNhbGN1bGF0ZSBpdHMgc3RhcnQgYW5kIGVuZCB2YWx1ZXNcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gU2Nyb2xsVHJpZ2dlci5yZWZyZXNoKCksIDUwMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGdldCBuZXcgcG9ydGZvbGlvIGl0ZW1zXHJcbiAgICAgICAgdGhpcy5nZXRQb3J0Zm9saW9JdGVtcygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNvbnRhY3QgZm9ybSB2YWxpZGF0aW9uXHJcbiAgICBjb250YWN0Rm9ybVZhbGlkYXRpb24oKSB7XHJcblxyXG4gICAgICAvLyBjb250YWN0IGZvcm1cclxuICAgICAgY29uc3QgY29udGFjdEZvcm0gPSB0aGlzLiRyZWZzLmNvbnRhY3RGb3JtO1xyXG5cclxuICAgICAgLy8gZm9ybSBjb250cm9sc1xyXG4gICAgICBjb25zdCBuYW1lICAgICAgICA9IGNvbnRhY3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XHJcbiAgICAgIGNvbnN0IGVtYWlsICAgICAgID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVtYWlsXCJdJyk7XHJcbiAgICAgIGNvbnN0IHBob25lICAgICAgID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInBob25lXCJdJyk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgICAgID0gY29udGFjdEZvcm0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKTtcclxuXHJcbiAgICAgIC8vIGZvcm0gdmFsaWRhdGlvbiBzdGF0dXNcclxuICAgICAgbGV0IGVycm9ycyA9IHtcclxuICAgICAgICBuYW1lOiB7IHJlcXVpcmVkOiB0cnVlLCBtaW5MZW5ndGg6IHRydWUgfSxcclxuICAgICAgICBlbWFpbDogeyByZXF1aXJlZDogdHJ1ZSwgaW52YWxpZDogdHJ1ZSB9LFxyXG4gICAgICAgIHBob25lOiB7IGludmFsaWQ6IHRydWUgfSxcclxuICAgICAgICBtZXNzYWdlOiB7IHJlcXVpcmVkOiB0cnVlIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgICAvKiBuYW1lIHZhbGlkYXRpb24gKi9cclxuICAgICAgLyogLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG4gICAgICAvLyByZXF1aXJlZCB2YWxpZGF0aW9uXHJcbiAgICAgIGlmIChuYW1lLnZhbHVlID09PSAnJykge1xyXG4gICAgICAgIGVycm9ycy5uYW1lLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldE5vdGlmeSh7XHJcbiAgICAgICAgICBpZDogJ25hbWVSZXF1aXJlZCcsXHJcbiAgICAgICAgICBjbGFzc05hbWU6ICdkYW5nZXInLFxyXG4gICAgICAgICAgbXNnOiBuYW1lLmNsb3Nlc3QoJy5jb250cm9sJykucXVlcnlTZWxlY3RvcignLmVycm9ycy1tc2dzIC5yZXF1aXJlZCcpLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVycm9ycy5uYW1lLnJlcXVpcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXNtaXNzTm90aWZ5KCduYW1lUmVxdWlyZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbWlubGVuZ3RoIHZhbGlkYXRpb25cclxuICAgICAgaWYgKG5hbWUudmFsdWUubGVuZ3RoID4gMCAmJiBuYW1lLnZhbHVlLmxlbmd0aCA8IG5hbWUuZ2V0QXR0cmlidXRlKCdtaW5sZW5ndGgnKSkge1xyXG4gICAgICAgIGVycm9ycy5uYW1lLm1pbkxlbmd0aCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXROb3RpZnkoe1xyXG4gICAgICAgICAgaWQ6ICduYW1lTWluTGVuZ3RoJyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2RhbmdlcicsXHJcbiAgICAgICAgICBtc2c6IG5hbWUuY2xvc2VzdCgnLmNvbnRyb2wnKS5xdWVyeVNlbGVjdG9yKCcuZXJyb3JzLW1zZ3MgLm1pbkxlbmd0aCcpLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVycm9ycy5uYW1lLm1pbkxlbmd0aCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzbWlzc05vdGlmeSgnbmFtZU1pbkxlbmd0aCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0b2dnbGUgaW52YWxpZCBlcnJvcnMgJiBzdHlsZSBjbGFzc2VzXHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyhlcnJvcnMubmFtZSkuc29tZShlcnIgPT4gZXJyb3JzLm5hbWVbZXJyXSA9PT0gdHJ1ZSkpIHtcclxuICAgICAgICBuYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkJyk7XHJcbiAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJyk7XHJcbiAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKCd2YWxpZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgIC8qIGVtYWlsIHZhbGlkYXRpb24gKi9cclxuICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgICAgLy8gcmVxdWlyZWQgdmFsaWRhdGlvblxyXG4gICAgICBpZiAoZW1haWwudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgZXJyb3JzLmVtYWlsLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldE5vdGlmeSh7XHJcbiAgICAgICAgICBpZDogJ2VtYWlsUmVxdWlyZWQnLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnZGFuZ2VyJyxcclxuICAgICAgICAgIG1zZzogZW1haWwuY2xvc2VzdCgnLmNvbnRyb2wnKS5xdWVyeVNlbGVjdG9yKCcuZXJyb3JzLW1zZ3MgLnJlcXVpcmVkJykudmFsdWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JzLmVtYWlsLnJlcXVpcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXNtaXNzTm90aWZ5KCdlbWFpbFJlcXVpcmVkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGVtYWlsIHZhbGlkYXRpb25cclxuICAgICAgaWYgKGVtYWlsLnZhbHVlLmxlbmd0aCA+IDAgJiYgIS9eW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXStAW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKiQvLnRlc3QoZW1haWwudmFsdWUpKSB7XHJcbiAgICAgICAgZXJyb3JzLmVtYWlsLmludmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0Tm90aWZ5KHtcclxuICAgICAgICAgIGlkOiAnZW1haWxJbnZhbGlkJyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2RhbmdlcicsXHJcbiAgICAgICAgICBtc2c6IGVtYWlsLmNsb3Nlc3QoJy5jb250cm9sJykucXVlcnlTZWxlY3RvcignLmVycm9ycy1tc2dzIC5pbnZhbGlkJykudmFsdWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JzLmVtYWlsLmludmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRpc21pc3NOb3RpZnkoJ2VtYWlsSW52YWxpZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0b2dnbGUgaW52YWxpZCBlcnJvcnMgJiBzdHlsZSBjbGFzc2VzXHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyhlcnJvcnMuZW1haWwpLnNvbWUoZXJyID0+IGVycm9ycy5lbWFpbFtlcnJdID09PSB0cnVlKSkge1xyXG4gICAgICAgIGVtYWlsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkJyk7XHJcbiAgICAgICAgZW1haWwuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVtYWlsLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcclxuICAgICAgICBlbWFpbC5jbGFzc0xpc3QuYWRkKCd2YWxpZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAgIC8qIHBob25lIHZhbGlkYXRpb24gKi9cclxuICAgICAgLyogLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgICAgLy8gcGhvbmUgdmFsaWRhdGlvblxyXG4gICAgICBpZiAocGhvbmUudmFsdWUubGVuZ3RoID4gMCAmJiAhL15bXFwrXT9bKF0/WzAtOV17M31bKV0/Wy1cXHNcXC5dP1swLTldezN9Wy1cXHNcXC5dP1swLTldezQsNn0kL2ltLnRlc3QocGhvbmUudmFsdWUpKSB7XHJcbiAgICAgICAgZXJyb3JzLnBob25lLmludmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0Tm90aWZ5KHtcclxuICAgICAgICAgIGlkOiAncGhvbmVJbnZhbGlkJyxcclxuICAgICAgICAgIGNsYXNzTmFtZTogJ2RhbmdlcicsXHJcbiAgICAgICAgICBtc2c6IHBob25lLmNsb3Nlc3QoJy5jb250cm9sJykucXVlcnlTZWxlY3RvcignLmVycm9ycy1tc2dzIC5pbnZhbGlkJykudmFsdWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JzLnBob25lLmludmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRpc21pc3NOb3RpZnkoJ3Bob25lSW52YWxpZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0b2dnbGUgaW52YWxpZCBlcnJvcnMgJiBzdHlsZSBjbGFzc2VzXHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyhlcnJvcnMucGhvbmUpLnNvbWUoZXJyID0+IGVycm9ycy5waG9uZVtlcnJdID09PSB0cnVlKSkge1xyXG4gICAgICAgIHBob25lLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkJyk7XHJcbiAgICAgICAgcGhvbmUuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBob25lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcclxuICAgICAgICBwaG9uZS5jbGFzc0xpc3QuYWRkKCd2YWxpZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgICAgLyogbWVzc2FnZSB2YWxpZGF0aW9uICovXHJcbiAgICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgICAgLy8gcmVxdWlyZWQgdmFsaWRhdGlvblxyXG4gICAgICBpZiAobWVzc2FnZS52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBlcnJvcnMubWVzc2FnZS5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXROb3RpZnkoe1xyXG4gICAgICAgICAgaWQ6ICdtZXNzYWdlUmVxdWlyZWQnLFxyXG4gICAgICAgICAgY2xhc3NOYW1lOiAnZGFuZ2VyJyxcclxuICAgICAgICAgIG1zZzogbWVzc2FnZS5jbG9zZXN0KCcuY29udHJvbCcpLnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcnMtbXNncyAucmVxdWlyZWQnKS52YWx1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlcnJvcnMubWVzc2FnZS5yZXF1aXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzbWlzc05vdGlmeSgnbWVzc2FnZVJlcXVpcmVkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRvZ2dsZSBpbnZhbGlkIGVycm9ycyAmIHN0eWxlIGNsYXNzZXNcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycy5tZXNzYWdlKS5zb21lKGVyciA9PiBlcnJvcnMubWVzc2FnZVtlcnJdID09PSB0cnVlKSkge1xyXG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQnKTtcclxuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcclxuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNlbmQgdGhlIG1lc3NhZ2UgaWYgdGhlIGZvcm0gaXMgdmFsaWRcclxuICAgICAgKCFPYmplY3QudmFsdWVzKGVycm9ycykuc29tZShjb250cm9sID0+IE9iamVjdC52YWx1ZXMoY29udHJvbCkuc29tZShCb29sZWFuKSkpICYmIHRoaXMuc2VuZENvbnRhY3RGb3JtTWVzc2FnZShjb250YWN0Rm9ybSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHNlbmQgbWVzc2FnZSBmcm9tIGNvbnRhY3QgZm9ybVxyXG4gICAgc2VuZENvbnRhY3RGb3JtTWVzc2FnZShmb3JtKSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGZvcm0uZ2V0QXR0cmlidXRlKCdhY3Rpb24nKTtcclxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblxyXG4gICAgICAvLyBzdGFydCBsb2FkaW5nIHNwaW5uZXJcclxuICAgICAgdGhpcy5zdGFydExvYWRpbmcoKTtcclxuXHJcbiAgICAgIC8vIHNlbmQgcG9zdCByZXF1ZXN0XHJcbiAgICAgIGZldGNoKHVybCwgeyBtZXRob2Q6ICdQT1NUJywgYm9keTogZm9ybURhdGEgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLnRleHQoKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgIGlmIChkYXRhID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgLy8gc2hvdyBzdWNjZXNzIG1lc3NhZ2VcclxuICAgICAgICAgICAgdGhpcy5zZXROb3RpZnkoeyBjbGFzc05hbWU6ICdzdWNjZXNzJywgbXNnOiBmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWNjZXNzLW1zZycpLCB0aW1lOiA1MDAwIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgYWxsIGZvcm0gaW5wdXRzXHJcbiAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBpbnB1dHMgdmFsaWQgY2xhc3Nlc1xyXG4gICAgICAgICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy52YWxpZCcpLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWQnKSk7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIC8vIHNob3cgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgICAgICB0aGlzLnNldE5vdGlmeSh7IGNsYXNzTmFtZTogJ2RhbmdlcicsIG1zZzogZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZXJyLW1zZycpLCB0aW1lOiA1MDAwIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGVuZCBsb2FkaW5nIHNwaW5uZXJcclxuICAgICAgICAgIHRoaXMuZW5kTG9hZGluZygpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2hvdyBtZXNzYWdlcyBieSB0b2FzdCBub3RpZmljYXRpb25zXHJcbiAgICBzZXROb3RpZnkoe2lkLCBjbGFzc05hbWUsIG1zZywgdGltZX0pIHtcclxuICAgICAgY29uc3Qgbm90aWZ5ID0ge1xyXG4gICAgICAgIGlkOiBpZCB8fCBgJHtEYXRlLm5vdygpfSR7dGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aH1gLFxyXG4gICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICBtc2csXHJcbiAgICAgICAgdGltZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgKCF0aGlzLm5vdGlmaWNhdGlvbnMuc29tZShlID0+IGUuaWQgPT09IGlkKSkgJiYgdGhpcy5ub3RpZmljYXRpb25zLnB1c2gobm90aWZ5KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7IHRoaXMubm90aWZpY2F0aW9ucy5wdXNoKG5vdGlmeSk7IH1cclxuXHJcbiAgICAgIC8vIHJlbW92ZSB0aGlzIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBhcnJheSBhZnRlciAobikgc2Vjb25kc1xyXG4gICAgICB0aW1lICYmIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNtaXNzTm90aWZ5KG5vdGlmeS5pZCksIHRpbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBkaXNtaXNzIHRoZSBub3RpZmljYXRpb25zXHJcbiAgICBkaXNtaXNzTm90aWZ5KGlkKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5ub3RpZmljYXRpb25zLmZpbmRJbmRleChub3RpZnkgPT4gbm90aWZ5LmlkID09PSBpZCk7XHJcbiAgICAgIChpbmRleCA+IC0xKSAmJiB0aGlzLm5vdGlmaWNhdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYWRkIGFqYXggbG9hZGluZyBzcGlubmVyXHJcbiAgICBzdGFydExvYWRpbmcoKSB7XHJcbiAgICAgIHRoaXMuYWpheExvYWRpbmcucHVzaCh0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gcmVtb3ZlIGFqYXggbG9hZGluZyBzcGlubmVyXHJcbiAgICBlbmRMb2FkaW5nKCkge1xyXG4gICAgICB0aGlzLmFqYXhMb2FkaW5nLnBvcCgpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIGNvbXB1dGVkOiB7XHJcbiAgICAvLyBmbGFnIHRvIHRvZ2dsZSBhamF4IGxvYWRpbmcgc3Bpbm5lclxyXG4gICAgaXNBamF4TG9hZGluZygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWpheExvYWRpbmcuc29tZShzdGF0ZSA9PiBzdGF0ZSA9PT0gdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGdldCB0aGUgdG90YWwgeWVhcnMgb2YgZXhwZXJpZW5jZVxyXG4gICAgZXhwZXJpZW5jZVllYXJzKCkge1xyXG4gICAgICByZXR1cm4gbmV3IERhdGUobmV3IERhdGUoKSAtIG5ldyBEYXRlKFN0cmluZyh0aGlzLmNhcmVlclN0YXJ0RGF0ZSkpKS5nZXRGdWxsWWVhcigpIC0gMTk3MDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3BsaXQgZXhwZXJpZW5jZSBpdGVtcyBpbnRvIGNodW5rcyBvZiAzIGl0ZW1zXHJcbiAgICBleHBlcmllbmNlQ2h1bmtzKCkge1xyXG4gICAgICByZXR1cm4gWy4uLkFycmF5KE1hdGguZmxvb3IoKHRoaXMuZXhwZXJpZW5jZUl0ZW1zLmxlbmd0aCAtMSkgLyAzKSldO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBmaWx0ZXJlZCBwb3J0Zm9saW8gaXRlbXNcclxuICAgIGZpbHRlcmVkUG9ydGZvbGlvSXRlbXMoKSB7XHJcbiAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICAgIGNvbnN0IHRheCA9IHVybFBhcmFtcy5nZXQoJ3RheCcpO1xyXG5cclxuICAgICAgaWYgKHRheCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRmb2xpb0l0ZW1zO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0Zm9saW9JdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmN1cnJlbnRGaWx0ZXIgPT09ICdBbGwnIHx8IGl0ZW0uY2F0ZWdvcnkgPT09IHRoaXMuY3VycmVudEZpbHRlcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gZ2V0IHNpbmdsZSBwb3J0Zm9saW8gaXRlbVxyXG4gICAgZ2V0U2luZ2xlUG9ydGZvbGlvSXRlbSgpIHtcclxuICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuICAgICAgY29uc3QgaWQgPSB1cmxQYXJhbXMuZ2V0KCdpZCcpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuYWxsUG9ydGZvbGlvSXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBnZXQgdGhlIHRvdGFsIHllYXJzIG9mIGNvcHlyaWdodFxyXG4gICAgY29weXJpZ2h0RGF0ZSgpIHtcclxuICAgICAgY29uc3QgeWVhcnNEdXJhdGlvbiA9IG5ldyBEYXRlKG5ldyBEYXRlKCkgLSBuZXcgRGF0ZShTdHJpbmcodGhpcy5jb3B5cmlnaHRTdGFydERhdGUpKSkuZ2V0RnVsbFllYXIoKSAtIDE5NzA7XHJcbiAgICAgIHJldHVybiB5ZWFyc0R1cmF0aW9uID09PSAwID8gdGhpcy5jb3B5cmlnaHRTdGFydERhdGUgOiBgJHt0aGlzLmNvcHlyaWdodFN0YXJ0RGF0ZX0gLSAke3RoaXMuY29weXJpZ2h0U3RhcnREYXRlICsgeWVhcnNEdXJhdGlvbn1gO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlyZWN0aXZlczoge1xyXG4gICAgLy8gY2xvbmUgZGlyZWN0aXZlXHJcbiAgICBjbG9uZToge1xyXG4gICAgICBtb3VudGVkKGVsKSB7XHJcbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwuY2xvbmVOb2RlKHRydWUpLCBlbC5uZXh0U2libGluZyk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gYWRkIHN0YWdnZXIgZGVsYXkgdG8gY2hpbGRyZW4gZWxlbWVudHNcclxuICAgIHN0YWdnZXJkZWxheToge1xyXG4gICAgICBtb3VudGVkKGVsLCBiaW5kaW5nKSB7XHJcbiAgICAgICAgWy4uLmVsLmNoaWxkcmVuXS5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBhbmltYXRpb24tZGVsYXk6ICR7KGkgKyAxKSAqIChiaW5kaW5nLnZhbHVlIHx8IDEwMCl9bXNgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB0b29sdGlwIGRpcmVjdGl2ZVxyXG4gICAgdG9vbHRpcDoge1xyXG4gICAgICBtb3VudGVkKGVsLCBiaW5kaW5nKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGFzLXRvb2x0aXAnKTtcclxuICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VzdG9tLXRvb2x0aXAgY3VzdG9tLXRvb2x0aXAtJHtiaW5kaW5nLnZhbHVlLmRpcn1cIj4ke2JpbmRpbmcudmFsdWUudGV4dH08L2Rpdj5gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5hcHAubW91bnQoJyNhcHAnKTtcclxuIl0sIm5hbWVzIjpbIm1vdW50ZWQiLCJhbmltUHJlbG9hZGVyU2NyZWVuIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRBbmltYXRpb24iLCJtZXRob2RzIiwiY291bnQiLCJwcmVsb2FkZXIiLCIkcmVmcyIsInByZWxvYWRlckNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW1ncyIsImRvY3VtZW50IiwiaW1hZ2VzIiwiaW1nc0xlbmd0aCIsImxlbmd0aCIsImhpZGVQcmVsb2FkZXIiLCJzZXRBdHRyaWJ1dGUiLCJnc2FwIiwidGltZWxpbmUiLCJzZXQiLCJhdXRvQWxwaGEiLCJ0byIsImRlbGF5IiwieSIsImR1cmF0aW9uIiwiZWFzZSIsImltZ0xvYWRlZCIsImxvYWRpbmdQZXJjZW50YWdlIiwiZm9yRWFjaCIsImltZyIsInRJbWciLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJyZWdpc3RlclBsdWdpbiIsIlNjcm9sbFRyaWdnZXIiLCJhbmltQmFja1RvcFNjcm9sbEluZGljYXRvciIsImFuaW1TdGF0aXN0aWNzSXRlbXMiLCJhbmltU2VjdGlvblRleHRCb3giLCJhbmltQWJvdXRJbWFnZSIsImFuaW1Ta2lsbHNJdGVtcyIsImFuaW1FeHBlcmllbmNlSXRlbXNUaW1lbGluZSIsImFuaW1UZXN0aW1vbmlhbHNTZWN0aW9uVGl0bGUiLCJhbmltVGVzdGltb25pYWxzSXRlbXMiLCJhbmltQ29udGFjdEluZm8iLCJhbmltQ29udGFjdEZvcm0iLCJiYWNrVG9wQnRuIiwic2Nyb2xsVG9wQnRuIiwic2hvd0F0IiwiZ2V0QXR0cmlidXRlIiwiYmFja1RvcEJ0blBhdGgiLCJiYWNrVG9wQnRuUGF0aExlbmd0aCIsImdldFRvdGFsTGVuZ3RoIiwiZnJvbSIsInNjcm9sbFRyaWdnZXIiLCJ0cmlnZ2VyIiwic3RhcnQiLCJlbmQiLCJ0b2dnbGVBY3Rpb25zIiwic3Ryb2tlRGFzaGFycmF5Iiwic3Ryb2tlRGFzaG9mZnNldCIsIm9uVXBkYXRlIiwic2VsZiIsInN0eWxlIiwicHJvZ3Jlc3MiLCJzdGF0aXN0aWNzSXRlbXMiLCJ1dGlscyIsInRvQXJyYXkiLCJzdGF0aXN0aWNzSXRlbXNUTCIsInNjcnViIiwiZWwiLCJpIiwicG9zIiwidGV4dEJveGVzIiwiYm94IiwidG9wIiwicXVlcnlTZWxlY3RvckFsbCIsInN0YWdnZXIiLCJhYm91dFNlY3Rpb24iLCJzY2FsZSIsInNraWxsc0dyb3VwcyIsImdyb3VwIiwic2tpbGxzSXRlbXNUTCIsImV4cGVyaWVuY2VUaW1lcGF0aCIsImV4cGVyaWVuY2VJdGVtcyIsImV4cGVyaWVuY2VUaW1lcGF0aFRMIiwiZXhwZXJpZW5jZUl0ZW1zVEwiLCJtYWluRXhwZXJpZW5jZVRMIiwiZXhwZXJpZW5jZVRpbWVwYXRoSXRlbXMiLCJkb2NEaXIiLCJkb2N1bWVudEVsZW1lbnQiLCJkaXIiLCJmcm9tRGlyIiwicmV2ZXJzZURpciIsImNvb3JkcyIsIngiLCJyZXZlcnNlIiwiYyIsInN0MSIsInN0MiIsInN0MyIsImxpbmVPZGQiLCJsaW5lRXZlbiIsInNlbWljaXJjbGVPZGQiLCJzZW1pY2lyY2xlRXZlbiIsImNsaXBQYXRoIiwiaW5jbHVkZXMiLCJhZGQiLCJ0ZXN0aW1vbmlhbHNTZWN0aW9uIiwidGVzdGltb25pYWxzSXRlbXMiLCJ0ZXN0aW1vbmlhbHNJdGVtc1RMIiwiY29udGFjdEluZm9JdGVtcyIsImNvbnRhY3RJbmZvVEwiLCJjb250YWN0Rm9ybSIsImFwcCIsIlZ1ZSIsImNyZWF0ZUFwcCIsIm1peGlucyIsImFuaW1hdGlvbnNNaXhpbiIsImRhdGEiLCJjYXJlZXJTdGFydERhdGUiLCJjb3B5cmlnaHRTdGFydERhdGUiLCJhcHBUaGVtZSIsInNhdmVkVGhlbWUiLCJpc1ByZWxvYWRpbmciLCJub3RpZmljYXRpb25zIiwiYWpheExvYWRpbmciLCJzdGFydE1pbmltaXppbmdIZWFkZXJBdCIsImlzSGVhZGVyQmlnIiwibGFzdFNjcm9sbFBvc2l0aW9uIiwiaXNIZWFkZXJIaWRkZW4iLCJpc0FueUZvY3VzIiwiaXNOYXZNZW51T3BlbiIsIm5hdkxpbmtzIiwidXJsIiwidGl0bGUiLCJlbiIsImFyIiwic2tpbGxzVHlwZSIsInNraWxsc0l0ZW1zIiwiaW1nVXJsIiwidG9vbHNJdGVtcyIsImRhdGUiLCJjb21wYW55TmFtZSIsImpvYlRpdGxlIiwiZGVzYyIsInBvcnRmb2xpb0l0ZW1zUGFnZSIsIml0ZW1zUGVyUGFnZSIsImZpbHRlcnMiLCJjdXJyZW50RmlsdGVyIiwicG9ydGZvbGlvQXJjaGl2ZU5hbWUiLCJhbGxQb3J0Zm9saW9JdGVtcyIsImlkIiwiY2F0ZWdvcnkiLCJ0b29scyIsInNjcmVlbnNob3RzIiwiaW1nMSIsImNhcHRpb24iLCJpbWcyIiwiaW1nMyIsImltZzQiLCJpbWc1IiwicG9ydGZvbGlvSXRlbXMiLCJxdW90ZUNvbnRlbnQiLCJxdW90ZUF1dGhvciIsImNyZWF0ZWQiLCJnZXRBcHBUaGVtZSIsImlubmVyV2lkdGgiLCJpbml0Q2lyY2xlQ3Vyc29yIiwiaGVyb0ltZ1BhbkVmZmVjdCIsImluaXRpYWxpemVUaWx0IiwibmF2TWVudVRhYlRyYXAiLCJzY3JvbGxpbmdPcHRpb25zIiwiUG9wcGVyIiwiY3JlYXRlUG9wcGVyIiwicGxhY2VtZW50IiwibW9kaWZpZXJzIiwibmFtZSIsIm9wdGlvbnMiLCJvZmZzZXQiLCJnZXRQb3J0Zm9saW9JdGVtcyIsIkdMaWdodGJveCIsImF1dG9wbGF5VmlkZW9zIiwiaW5pdFNraWxsc0ZpcnN0VHlwZSIsImFwcFJlZiIsIm91dGVyIiwiY2lyY2xlQ3Vyc29yT3V0ZXIiLCJpbm5lciIsImNpcmNsZUN1cnNvcklubmVyIiwiZSIsImNsaWVudFkiLCJjbGllbnRYIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNldFRpbWVvdXQiLCJzdG9yYWdlU2F2ZWRUaGVtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInNldEl0ZW0iLCJjaGFuZ2VBcHBUaGVtZSIsInRvZ2dsZU5hdk1lbnUiLCJvcGVuTmF2TWVudSIsImNsb3NlTmF2TWVudSIsImJvZHlFbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaGVhZGVyTmF2IiwiZm9jdXMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJuYXZNZW51VG9nZ2xlQnRuIiwibmF2IiwiZm9jdXNhYmxlRWxlbWVudHNTdHJpbmciLCJmaXJzdFRhYlN0b3AiLCJsYXN0VGFiU3RvcCIsImlzRmlyc3RUYWJTdG9wIiwiaXNMYXN0VGFiU3RvcCIsImNvbnRhaW5zIiwidmlzaWJsZUZvY3VzYWJsZUVscyIsImZpbHRlciIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiY29kZSIsInNoaWZ0S2V5IiwiYWN0aXZlRWwiLCJhY3RpdmVFbGVtZW50IiwicGFyZW50IiwiaGVyb1NlY3Rpb24iLCJsYXllcjEiLCJsYXllcjIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUb1RvcCIsInNjcm9sbCIsImJlaGF2aW9yIiwic2tpbGxzU3dpdGNoQnRuIiwidmFsdWUiLCJWYW5pbGxhVGlsdCIsImluaXQiLCJtYXgiLCJzcGVlZCIsImdsYXJlIiwiaXRlbXNBcnIiLCJpdGVtIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwibG9jYXRpb24iLCJzZWFyY2giLCJ0YXgiLCJnZXQiLCJjYXQiLCJ0b29sIiwic2xpY2UiLCJmaWx0ZXJlZFBvcnRmb2xpb0l0ZW1zIiwicHVzaCIsIiRuZXh0VGljayIsInJlZnJlc2giLCJzZXROb3RpZnkiLCJjbGFzc05hbWUiLCJtc2ciLCJ0aW1lIiwiZmlsdGVyUG9ydGZvbGlvSXRlbXMiLCJjb250YWN0Rm9ybVZhbGlkYXRpb24iLCJlbWFpbCIsInBob25lIiwibWVzc2FnZSIsImVycm9ycyIsInJlcXVpcmVkIiwibWluTGVuZ3RoIiwiaW52YWxpZCIsImRpc21pc3NOb3RpZnkiLCJPYmplY3QiLCJrZXlzIiwic29tZSIsImVyciIsInRlc3QiLCJ2YWx1ZXMiLCJjb250cm9sIiwiQm9vbGVhbiIsInNlbmRDb250YWN0Rm9ybU1lc3NhZ2UiLCJmb3JtIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsInN0YXJ0TG9hZGluZyIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJ0ZXh0IiwicmVzZXQiLCJlbmRMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwibm90aWZ5IiwiRGF0ZSIsIm5vdyIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwicG9wIiwiY29tcHV0ZWQiLCJpc0FqYXhMb2FkaW5nIiwic3RhdGUiLCJleHBlcmllbmNlWWVhcnMiLCJTdHJpbmciLCJnZXRGdWxsWWVhciIsImV4cGVyaWVuY2VDaHVua3MiLCJBcnJheSIsIk1hdGgiLCJmbG9vciIsImdldFNpbmdsZVBvcnRmb2xpb0l0ZW0iLCJmaW5kIiwiY29weXJpZ2h0RGF0ZSIsInllYXJzRHVyYXRpb24iLCJkaXJlY3RpdmVzIiwiY2xvbmUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiY2xvbmVOb2RlIiwibmV4dFNpYmxpbmciLCJzdGFnZ2VyZGVsYXkiLCJiaW5kaW5nIiwiY2hpbGRyZW4iLCJjaGlsZCIsInRvb2x0aXAiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtb3VudCJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7O0VBQ0E7O0VBQ0E7QUFDQSx3QkFBZTtFQUNiQSxFQUFBQSxPQUFPLEdBQUc7RUFDUjtFQUNBLFNBQUtDLG1CQUFMLEdBRlE7O0VBS1JDLElBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBTSxLQUFLQyxhQUFMLEVBQXRD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