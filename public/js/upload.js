
!function(e){
    "use-strict";
    e(document).ready(()=>{
        const a = document.querySelector('.form-control-select-files-container');
     
        let imageFileStamp = [],
        active = false,
        params = window.location.search,
        reader = new URLSearchParams(params),
        getter = reader.get("property_id"),
        url = '/property/update';
        
        if(getter){
            e('.upload-button').html("Update");
            e('.member-uploader-text span').html("Updater")
        }

        e('.m-menu').click(()=>{
            e('.linker').toggleClass('active');
    
            e('.m-close').click(()=>{
                e('.linker').removeClass('active')
            })
        }),
        e(a).click(()=>{
            selected()
        })

        e(a).on("drop", (ev)=>{
            a.ondrop = (ev)=>{
                ev.preventDefault();
            }
            Controller.drop(ev.originalEvent)
        })
        
        e(a).on("dragover", (ev)=>{
            a.ondragover = (e)=>{
                e.preventDefault();
            }
            ev.preventDefault();
            e(a).addClass('over');
        }),
        e(a).on("dragleave", ()=>{
            e(a).removeClass('over');
        })

        let p = document.querySelector('.price');
        p.addEventListener('keyup',e => {
            e.preventDefault()

            let key = e.key,
            r = new RegExp(/[\d]/),
            m = key.match(r);

            if(m == null || m == "null" ){
                if(key.length > 1){
                    return;
                }
                else{
                    let v = p.value,
                    sub = p.value.replace(/[\D]/g,"");
                    p.value = sub;
                }

            }else{
                let v = p.value.replace(/[\D]/g,""),
                l =  Number(v).toLocaleString();
                p.value = l.toString();
            }
        }),
        e('.modal-warning').fadeOut(),
        e('.upload-button').click(()=>{
            
            if(active) {
                alert("Let finish the uploading before you can upload another one");
                return;
            }

            const w = window.innerWidth, 
            s = 700 , wh = window.scrollY + 100 + "px", 
            m = document.querySelector('.modal-warning');
        
            e(m).html("");
            
            if(imageFileStamp.length < 6){
                let p = "<p class='alert alert-warning p-1'>You didn't submit any image of the property*</p>"
            m.innerHTML += p
            }            
            if( e('.description').val() == ""){
                let p = "<p class='alert alert-warning p-1'>Provide a short description of the property to attract client</p>"
                m.innerHTML += p
            }
            if(e('.prop-title-text').val() == ""){
                let p = "<p class='alert alert-warning p-1'>Property title is Required*</p>"
                m.innerHTML += p
            }            
            if(e('.price').val() == ""){
                let p = "<p class='alert alert-warning p-1'>Property Price Required*</p>"
                m.innerHTML += p
            }
            if(e('.negotiable').val() == ""){

                let p = "<p class='alert alert-warning p-1'>Negotiable Required*</p>"
                m.innerHTML += p;

            }
            if(e('.state').val() == ""){

                let p = "<p class='alert alert-warning p-1'>State of property required*</p>"
                m.innerHTML += p;

            }
            if(e('.status').val() == ""){

                let p = "<p class='alert alert-warning p-1'>Status Required*</p>"
                m.innerHTML += p;

            }
            if(e('.select-lga').val() == null){

                let p = "<p class='alert alert-warning p-1'>LGA required*</p>"
                m.innerHTML += p;

            }
        
            if(m.innerHTML != ""){
                e(m).addClass('active').fadeIn()

                if(e('.modal-response-wrapper').fadeOut().addClass('active').fadeIn(500)) e('.modal-warning').fadeIn(1000)
                       
                let timeout = setTimeout(() => {
                    if(e('.modal-response-wrapper').fadeOut()) e(m).fadeOut();
                }, 10000);

                e('#close').click(()=>{
                    if(active){
                        alert("Wait while Uploader finish uploading");
                        return
                    }
                    clearTimeout(timeout);
                    e('.modal-response-wrapper').fadeOut(500)
                    setTimeout(() => {
                        e(m).fadeOut();
                        e('.modal-response-wrapper').removeClass('active')
                    },1000);
                })
            }else{

                e('#multiple-file').remove();

                var form_data = new FormData(document.querySelector('form'));
                form_data.append("up_id", up_id);
                form_data.append("up_name", up_name);
                
                e(imageFileStamp).each((i, el)=>{                    
                    form_data.append("index", el.index);
                    form_data.append("image", el.file);
                });

                if(getter){
                    form_data.append("id", getter)
                };
                
                e('#close').click(()=>{
                    if(active){
                        alert("Wait while Uploader finish uploading");
                        return
                    }
                    e('.modal-response-wrapper').fadeOut(500)
                    setTimeout(() => {
                        e(m).fadeOut();
                        e('.modal-response-wrapper').removeClass('active')
                    },1000);
                })
                let status

                if(getter){
                    status = "Updating"
                }else{
                    status = "Uploading"
                }
                var loading = `<div class="loader">${status}<span></span><span></span><span></span></div>`;

                if(e('.modal-response-wrapper').addClass('active').fadeIn(500)) e('.modal-warning').fadeIn(1000).html(loading)
                
                let ct = 0
                e('.loader span').each((i,el)=>{
                    e(el).fadeOut();
                });
                
                let loadInterval = setInterval(()=>{
                    e('.loader span').each((i, el)=>{
                        if(ct > 0){
                            if(ct > 2){
                                e(e('.loader span')[ct - 1]).fadeOut(600)
                                ct = 0;
                                
                            }else{
                                e(e('.loader span')[ct - 1]).fadeOut(800)
                            }
                        }
                        if(i === ct){
                            e(el).fadeIn(1000)
                        }
        
                        ct++
                        
                    })
                },1000);
                

                (async ()=> {
                    let fet ;
                    active = true
                    const connection = await fetch('https://api.github.com/users',{
                        method: "GET"
                    })

                    const conn_err = await connection.error;
                    const conn_res = await connection.json();

                    if(conn_err && !conn_res){
                        var err = `<div class="p-2">
                        <div class="alert alert-warning">No connection Or Poor connection</div>
                        <p style="color:var(--dark-grey)">Either your connection is disconnected or Poor</p></div>`;
                        

                        m.innerHTML = err

                        let input = document.createElement('input')
                        e(input)
                        .attr("type","file")
                        .attr('id',"multiple-file")
                        .attr("multiple","multiple")
                        .attr('name',"images")
                        .attr('accept',"image/*");

                        e('.drag-drop-wrapper').prepend(input);
                        active = false;

                        return
                    }

                    if(getter){
                        const verify = await fetch('/verifyProp',{
                            method: "POST",
                            body: JSON.stringify({
                                id : getter
                            }),
                            headers: {
                                "Content-Type":"application/json"
                            }
                        })

                        const verification = await verify.json()
                        const verify_error = await verify.error

                        if(verification.error || verify_error){
                            var err = `<div class="p-2">
                            <div class="alert alert-warning">${verification.error ?? verify_error}</div>
                            <p style="color:var(--dark-grey)">Error updating Property</p></div>`;
                            
                            m.innerHTML = err

                            let input = document.createElement('input')
                            e(input)
                            .attr("type","file")
                            .attr('id',"multiple-file")
                            .attr("multiple","multiple")
                            .attr('name',"images")
                            .attr('accept',"image/*");

                            e('.drag-drop-wrapper').prepend(input);
                            active = false;
                        }else if(verification.success){
                            fet = await fetch(url,{
                                method: "POST",
                                body: form_data
                            })
                        }
                    }else{
                        fet = await fetch('/property/upload',{
                            method: "POST",
                            body: form_data
                        })
                    }

                    
                    var response = await fet.json();

                    timeout = setTimeout(()=>{
                        if(response = "" ?? response == null) {
                            response = {
                                error: "Connection disconnected or poor connection"
                            }
                        } 
                    },10000) 

                    const {success, error} = response;
                    
                    if(success){
                        suc = `<div class="p-2">
                                    <p style='color:var(--dark-grey)'>Property will be viewable to the public after checking property details are unambigious and valid</p>
                                    <div class="alert alert-success">${success}</div>
                                </div>`;

                        e('.prop-title-text').val(""),
                        e('.price').val(""),
                        e('.description').val(""),
                        e('.status').val(null)
                        e('.negotiable').val(null)
                        e('.select-lga').html('').val(""),
                        e('.address').val(""),
                        e('.image_wrapper').html("")
                        e('.state').val(null);

                        let input = document.createElement('input')
                        e(input)
                        .attr("type","file")
                        .attr('id',"multiple-file")
                        .attr("multiple","multiple")
                        .attr('name',"images")
                        .attr('accept',"image/*");

                        e('.drag-drop-wrapper').prepend(input);
                        active = false

                        m.innerHTML = suc

                    }else if(error){
                        var err = `<div class="p-2">
                        <div class="alert alert-warning">${response.error}</div>
                        <p style="color:var(--dark-grey)">Either your connection is disconnected or Poor</p></div>`;
                        

                        m.innerHTML = err

                        let input = document.createElement('input')
                        e(input)
                        .attr("type","file")
                        .attr('id',"multiple-file")
                        .attr("multiple","multiple")
                        .attr('name',"images")
                        .attr('accept',"image/*");

                        e('.drag-drop-wrapper').prepend(input);
                        active = false;

                    }else{
                        window.location = "/";
                    }

                })()
            }    
        })

        function selected(){
            const m = document.querySelector('#multiple-file');
            e(m).click();
            m.onchange = (ev)=>{
               Controller.multiChange(ev);
            }           
        }

        class Controller{

            constructor(){
                
            }

            static multiChange(ev){
               const files = ev.target.files,
               accept = ["image/jpeg","image/jpg","image/png"];
               let imageFile = []
               let not_image_file = [];
    
               if(files.length > 0){
                    e(files).each((index,element)=> {
                        let type = element.type
                        if(!accept.includes(type)){
                            not_image_file.push(element)
                            
                        }else{
                            imageFile.push(element)
                        }
                    });
               }
               if(files.length > 6 || files.length < 6){
                    var nf = document.querySelector(".form-control-select-files-container  .not_file");
                    let p = `<p>${files.length} file Selected, Exactly 6 file image is required</p>`;
                    
                    e(nf).fadeIn().addClass('active').html(p);
                    setTimeout(()=>{
                        e(nf).fadeOut()
                        nf.innerHTML = "";
                        setTimeout(()=>{
                            e(nf).removeClass('active');
                        },2000) 
                    },3000)
    
                    return;
    
                }
                
                if(not_image_file.length > 0){
                    var nf = document.querySelector(".form-control-select-files-container  .not_file");
                    e(not_image_file).each((ind, ele)=>{
                        let p = `<p>${ele.name} file not accepted</p>`;
                        nf.innerHTML += p 
                    })
    
                    e(nf).fadeIn().addClass('active');
                    setTimeout(()=>{
                        e(nf).fadeOut()
                        nf.innerHTML = "";
                        setTimeout(()=>{
                            e(nf).removeClass('active');
                        },2000) 
                    },3000)
                }else{

                    e('.image_wrapper').html(''),
                    e(imageFile).each((i, el)=>{
                        const filereader = new FileReader();

                        filereader.onload = ()=>{
                            let result = filereader.result;
                            var div = document.createElement('div')
                            e(div).addClass("col-4","col-md-4");

                            let img = `<img src="${result}" class="img-fluid" alt="uploaded-image">`;
                            div.innerHTML = img;
                            
                            e('.image_wrapper').append(div)
                        }
                        
                        filereader.readAsDataURL(el);
                    
                    })
    
                    e(imageFile).each((i, el)=>{
                        let imageData = {
                            index: i,
                            file: el
                        }

                        imageFileStamp.push(imageData)
                    })
                } 
            }

            static drop(ev){
                ev.preventDefault();
                e(a).removeClass('over')
                const files = ev.dataTransfer.files,
                accept = ["image/jpeg","image/jpg","image/png"];
                
                let imageFile = [];
                let not_image_file = [];
    
                if(files.length > 6 || files.length < 6){
                    var nf = document.querySelector(".form-control-select-files-container .not_file");
                    let p = `<p>${files.length} file Selected, Exactly 6 file image is required</p>`;
                    
                    e(nf).fadeIn().addClass('active').html(p);
                    setTimeout(()=>{
                        e(nf).fadeOut()
                        nf.innerHTML = "";
                        setTimeout(()=>{
                            e(nf).removeClass('active');
                        },2000) 
                    },3000)
    
                    return;
                }
    
                e(files).each((index,element)=> {
                    let type = element.type
                    if(!accept.includes(type)){
                        not_image_file.push(element)
                        
                    }else{
                        imageFile.push(element)
                    }
                });
    
                if(not_image_file.length > 0){
                    var nf = document.querySelector(".form-control-select-files-container .not_file");
                    e(not_image_file).each((ind, ele)=>{
                        let p = `<p>${ele.name} file not accepted</p>`;
                        nf.innerHTML += p 
                    })
    
                    e(nf).fadeIn().addClass('active');
                    setTimeout(()=>{
                        e(nf).fadeOut()
                        nf.innerHTML = "";
                        setTimeout(()=>{
                            e(nf).removeClass('active');
                        },2000) 
                    },3000)
                }else{
                    
                    
                    e('.image_wrapper').html(''),
                    e(imageFile).each(async (i, el)=>{
                        const filereader = new FileReader();

                        filereader.onload = ()=>{
                            let result = filereader.result;
                            var div = document.createElement('div')
                            e(div).addClass("col-4","col-md-4");

                            let img = `<img src="${result}" class="img-fluid" alt="uploaded-image">`;
                            div.innerHTML = img;
                            
                            e('.image_wrapper').append(div)
                        }
                        
                        filereader.readAsDataURL(el);
                    
                    })
    
                    e(imageFile).each((i, el)=>{
                        var imageData = {
                            index: i,
                            file: el
                        }
                        imageFileStamp.push(imageData);
                    })
                }
                
            };
        }
    })
}(jQuery)