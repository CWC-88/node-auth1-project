

function restriction(req,res){
    if(req.session && req.session.user){
        next()
    }
    else{
        res.status(401).json({
            error:"blokd"
        })
    }
}

module.exports = restriction