import ratelimit from '../../config/upstash.js';

const Ratelimiter =async(req,res,next)=>{
    try {
        const {success}= await ratelimit.limit("ratelimit",)

        if(!success){
            return res.status(429).json({
                message:"Too many requests"
            })
        }

        next();
        
    } catch (error) {
        console.log("Error in ratelimiter middleware:", error);
        next(error);
    }
}

export default Ratelimiter;