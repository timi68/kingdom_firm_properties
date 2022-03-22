!function(j){
    
    j(document).ready(()=>{
        "use-strict";

        if(window.scrollY >= 60){
            j(".home-header").addClass('fixed');
        }

        j('.menu').click(()=>{
            j('.navigator-wrapper').addClass('active');
            j('.menu').fadeOut(200)
        }),
        j('.close').click(()=>{
            j('.navigator-wrapper').removeClass('active');
            j('.menu').fadeIn(1200);

        }),
        j(j(".links .link")[1]).addClass("active"),
        j('li.check-link').html(
            "<a href='/' class='link'>Home</a>"
        )
        .removeClass('check-link'),
        j(window).on('scroll',()=>{
            if(window.scrollY >= 60){
                j('.home-header').addClass('fixed');
            }else{
                j('.home-header').removeClass('fixed');
            }
        }),
        j('.search-list li').each((index, element)=>{
            j(element).click(()=>{
                //removing activeness from previous active search-type
                j('.search-list li').each((i , el)=>{
                    j(el).removeClass('active');
                })
                
                // Now adding activeness to new selectedd search-type
                j(element).addClass('active');

                // hiding back search-options
                j('.search-options').removeClass('active');
                var el_html = j(element).html();

                //display search-type box if window.innerWidth is less than specified width
                j('.search-type span').html(el_html)

                j('.type').val(el_html)
                if(j(element).html() == "All"){
                    j('textarea.search').attr('placeholder',`Search for a property`);
                    return;
                }

                j('textarea.search').attr('placeholder',`Enter the ${j(element).html()}`)
            })
        }),

        j('.search-list-close').click(()=>{
            j('.search-options').removeClass('active');

        }),

        j('.toggle').click(()=>{
            j('.search-options').addClass('active');
        }),

        j('#submit-button').click(e => checkValidation(e));

        const checkValidation = (e)=> {
            e.preventDefault();
            if(j('.search').val() == ""){
                j('.invalid').html('Empty Search').fadeIn();
                 setTimeout(()=>{
                    j('.invalid').fadeOut()
                 },2000)
                return;
            }else{
                const search_text = j('.search').val();
                let type 
                j('.search-list li').each((i , el)=>{
                    if(j(el).hasClass('active')){
                        type = j(el).html();

                        switch (type) {
                            case "Location":
                                var reg = new RegExp(/[\d$#%!@^&*()_+=~`'";:,.<>{}]/);
                                // checking if user has enter address like location
                                var checker = search_text.match(reg);
                                
                                if(checker != null){
                                    j('.invalid').html('An address like text will not fetch you result, you should enter text like: state, town , community...').fadeIn();
                                    setTimeout(()=>{
                                        j('.invalid').fadeOut();
                                    },3000)
                                }else{

                                    j('form').attr("method", "POST").attr("action","/getProperties")
                                    document.querySelector('form').submit()
                                }
                                break;
                            case "Price":
                                var reg = new RegExp(/[a-zA-Z]/);

                                if(search_text.match(reg) != null){
                                    j('.invalid').html('Only digits are allowed in price search').fadeIn();
                                    setTimeout(()=>{
                                        j('.invalid').fadeOut();
                                    },3000)
                                }else{
                                    let price = search_text.replace(/[\D]/,"");
                                    
                                    //turning the search request to json format
                                    var data = {
                                        price,
                                        type
                                    };

                                    j('form').attr("method", "post").attr("action","/getProperties")
                                    document.querySelector('form').submit()
                                }
                                break;
                        
                            default:
                                j('form').attr("method", "POST").attr("action","/getProperties")
                                document.querySelector('form').submit()
                                break;
                        }
                    }
                })
            }
        }

        j('.search').on('keyup', e => {

            const search_text = j('.search').val(),
            type = j('.type').val(),
            skipper = 0;

            const data = {
                search_text,
                type,
                skipper
            };
            
            (async ()=> {
                if(search_text == ""){
    
                    j(".on-search-box").html("").removeClass('active');
    
                    return
                };
                const fet = await fetch("/matched/properties",{
                    method: "POST",
                    body: JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })

                const matched = await fet.json();

                if(!matched.not_found && search_text != ""){
                    
                    const box = j('.on-search-box');
                    box.addClass("active").html("");

                    j(matched).each((i, el)=>{

                        const prop_div = document.createElement("div");

                        let link = `<a href="/explore?serach_text=${search_text}&type=${type}">Property at ${el.lga},${el.state} state.</a>`;

                        j(prop_div).attr("class","property-matched").html(link)
                        
                        box.append(prop_div);
                    })
                }else{
                    j(".on-search-box").html("").removeClass('active')
                }
            })()
        })
    })
}(jQuery)