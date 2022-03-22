!function(j){
    j('document').ready(()=>{

        setTimeout(()=>{
            j('.loader').fadeOut(1000)
        },5000)
        const checkIn = document.querySelector('#check-in');

        var galleryThumbs = new Swiper('.swiper-container', {
            spaceBetween: 10,
            slidesPerView: 1,
            freeMode: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
              },
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            loop:true
          });

        const video = document.querySelectorAll('.home-video');
        x = 0
        j(video).each((i, el)=>{
            el.addEventListener('ended', e => {
                el.play()
            })
        })
        if(window.scrollY >= 60){
            j(".home-header").addClass('fixed');
        }else if(window.scrollY >= checkIn.offsetTop - 30 && window.scrollY < (checkIn.offsetTop + checkIn.clientHeight + 30)){
            j('li.check-link').addClass('active');
        }

        j('.menu').click(()=>{
            j('.navigator-wrapper').addClass('active');
            j('.menu').fadeOut(200)
        }),
        j('.close').click(()=>{
            j('.navigator-wrapper').removeClass('active');
            j('.menu').fadeIn(1200);

        })
        j('.link').each((index,element)=>{
            j(element).click(()=>{
                j(element).addClass('active')
            })           
        }),
        j(window).on('scroll',()=>{
            if(window.scrollY >= 60){
                j('.home-header').addClass('fixed');
                j('.back-to-top').show();
                j('.back-to-top').fadeIn(200);
            }else{
                j('.home-header').removeClass('fixed');
                j('.back-to-top').fadeOut(200);
            }

            if(window.scrollY >= checkIn.offsetTop - 30 && window.scrollY < (checkIn.offsetTop + checkIn.clientHeight + 30)){
                j('li.check-link').addClass('active');

            }else{
                j('li.check-link').removeClass('active');
            }
        }),
        j('a.check-link').click((e)=>{
            e.preventDefault();
            document.body.scrollTop = checkIn.offsetTop - 120 ;
            document.documentElement.scrollTop = checkIn.offsetTop - 120;
            if(j('.navigator-wrapper').hasClass('active')){
                j('.navigator-wrapper').removeClass('active')
                j('.menu').fadeIn(1200)
            }

        }),

        j('.back-to-top').click(()=>{

            currentYOffset = window.pageYOffset;
            initYOffset = currentYOffset;
            
            var intervalId = setInterval(function(){
            currentYOffset -= initYOffset*0.05;
            document.body.scrollTop = currentYOffset ;
            document.documentElement.scrollTop = currentYOffset;

                if(self.pageYOffset == 0){
                clearInterval(intervalId);
                }
            }, 30);
        })
        
        // ----- Scrollreveal script ---------
        const sr = ScrollReveal({
            origin: 'bottom',
            duration:1500,
            distance:'150px',
        })

        sr.reveal('.attract-student',{delay:300}),
        sr.reveal('#check-in',{delay:300}),
        sr.reveal('.members-shortcut-section',{delay:300}),
        sr.reveal('.fast-preview',{delay: 300})
        
        //-------Scroll Reveal Script--------------
    })
}(jQuery)
