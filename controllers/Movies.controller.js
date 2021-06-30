const Movies=require('../models/Movies.model');

const movieController=(req,res)=>{
  let query=req.query.query
  let urlMovie=`https://api.themoviedb.org/3/search/movie?api_key=46d08c58562bf1fb960bba0c5a501ea1&query=${query}`
  axios.get(urlMovie).then(response=>{
  const movies=response.data.results.map((item,idx)=>{
  return new Movie(item)     
})
res.send(movies)
}).catch(error=>res.send(error.message));

}

module.exports=movieController