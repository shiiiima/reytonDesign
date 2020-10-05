$(document).ready(function() {
	$('#fullpage').fullpage({
		'verticalCentered': false,
		'css3': true,
		'sectionsColor': ['#F0F2F4', '#fff', '#fff', '#fff'],
		'navigation': true,
		'navigationPosition': 'right',
		'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],

		'afterLoad': function(anchorLink, index){
			if(index == 2){
				$('#iphone3, #iphone2, #iphone4').addClass('active');
			}
		},
		'anchors':['1','2','3','4','5','6'],

		'onLeave': function(index, nextIndex, direction){
			if (index == 3 && direction == 'down'){
				$('.section').eq(index -1).removeClass('moveDown').addClass('moveUp');
			}
			else if(index == 3 && direction == 'up'){
				$('.section').eq(index -1).removeClass('moveUp').addClass('moveDown');
			}

			$('#staticImg').toggleClass('active', (index == 2 && direction == 'down' ) || (index == 4 && direction == 'up'));
			$('#staticImg').toggleClass('moveDown', nextIndex == 4);
			$('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up');
			if(index==1 && direction=='down' || direction=='up'){
				$('#img-web-2').hide()
				var content1left=document.querySelector('#img-web-2');
				// content1left.style.display='none';
				var time1left=new TimelineMax({delay:0.6});
				time1left.fromTo(content1left,0.9,{x:'-450' , opacity:0},{x:'0',opacity:1,display:'inline-block'})
				
				
			}
		}
	});
});