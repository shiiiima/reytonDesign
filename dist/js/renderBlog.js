
async  function loadBlogJson(){
	let result={};
try{
	result = await $.get('https://reyton.net/wp-json/wp/v2/cpt_1457?_embed');
	console.log(result);
	return result ;

}catch(e){
console.error('API is Down or bad requested!')
}
} 
async function renderblog(){
	let posts = await loadBlogJson();
	posts = posts.slice(posts.length - 4,posts.length)
	let html = '';
	posts.forEach(post => {
		
		let temp = `<div class="col-md-3 col-6 postblog text-secondary p-2 ">
		<div class="card bordershadow recordCard" >
		<img class="card-img-top " src="${post._embedded['wp:featuredmedia'][0].source_url}">
		<a href="${post.link}">
		<div class="card-body">
		 <p class="card-title text-secondary h6 ">${post.title.rendered}</p>
		 <span class="badge badge-pill badge-success"> comments :${post.id}
		</div>
		</a>
	  </div>
	  </div>`;
		html+=temp;
		
	});
	$('#postsPart').append(html);
} 
renderblog();