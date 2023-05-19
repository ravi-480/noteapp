exports.homepage = async (req,res)=>{
    
        const locals ={
           title :"Node js",
           description:"free node js  notes app"
        }
        res.render("index",{
                locals,
                layout:"../views/layouts/front-page"
        })
        
    
}
exports.aboutpage = async (req,res)=>{
    
        const locals ={
           title :"Node js",
           description:"free node js  notes app"
        }
        res.render("about",locals)
        
    
}