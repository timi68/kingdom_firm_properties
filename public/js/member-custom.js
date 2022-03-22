
!function(e){
    "use-strict";
    var u = document.querySelectorAll('.delete');
    
    e('.m-menu').click(()=>{
        e('.linker').toggleClass('active');

        e('.m-close').click(()=>{
            e('.linker').removeClass('active')
        })
    })

    if(!u?.length) return
    e(u).each((i, el)=>{
        e(el).click((ev)=>{
            ev.preventDefault()
            let id = e(el).attr("id");

            let data = {id};

            (async ()=>{
                $.ajax({
                url:"/delete",
                type:"POST",
                data:JSON.stringify(data),
                dataType:"text",
                headers:{
                    "Content-Type":"application/json"
                },
                success: data => {
                    
                        data === "success" 
                        ?(()=>{
                            e(`#${id}`).remove();
                            e('.message').html("Property Successfully deleted").addClass('success');

                            setTimeout(() => {
                                e('.message').removeClass('success');
                            }, 2000);
                        })()
                        : (()=>{
                            e('.message').html("Unable to delete Property. check your connection").addClass('error');

                            setTimeout(() => {
                                e('.message').removeClass('error');
                            }, 2000);
                        })();

                        let reg = new RegExp(/[\w]/),
                        html = e('.card-wrappers').html(),
                        m = html.match(reg);

                        if(m == null ?? m == "null"){
                            let p = `<div class="empty_upload my-5 text-center">
                                        <h3>Uploads Empty</h3>
                                        <div class="my-5 col-12">
                                            <div class="upload-link m-auto">
                                                <a href="/membership/upload" class="pd-2 text-center outline-none">Upload</a>
                                            </div>
                                        </div>
                                    </div>`
                            e('.card-wrappers').html(p)
                        }
                    },
                error: (err) => {
                    e('.message').html("Unable to delete property").addClass('error');

                    setTimeout(() => {
                        e('.message').removeClass('error')
                    }, 2000);
                    }
                })

            })()
        })
});
    
}(jQuery)