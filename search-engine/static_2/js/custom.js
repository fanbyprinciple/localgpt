(function () {

	'use strict'


	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});

	var preloader = function() {

		var loader = document.querySelector('.loader');
		var overlay = document.getElementById('overlayer');

		function fadeOut(el) {
			el.style.opacity = 1;
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};

		setTimeout(function() {
			fadeOut(loader);
			fadeOut(overlay);
		}, 200);
	};
	preloader();

	var tinyslider = function() {

		var slider = document.querySelectorAll('.features-slider');
		var postSlider = document.querySelectorAll('.post-slider');
		var testimonialSlider = document.querySelectorAll('.testimonial-slider');
		
		
		
		if ( slider.length> 0 ) {
			var tnsSlider = tns({
				container: '.features-slider',
				mode: 'carousel',
				speed: 700,
				items: 3,
				// center: true,
				gutter: 30,
				loop: false,
				edgePadding: 80,
				controlsPosition: 'bottom',
				// navPosition: 'bottom',
				nav: false,
				// autoplay: true,
				// autoplayButtonOutput: false,
				controlsContainer: '#features-slider-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}

		if ( postSlider.length> 0 ) {
			var tnsPostSlider = tns({
				container: '.post-slider',
				mode: 'carousel',
				speed: 700,
				items: 3,
				// center: true,
				gutter: 30,
				loop: true,
				edgePadding: 10,
				controlsPosition: 'bottom',
				navPosition: 'bottom',
				nav: true,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#post-slider-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}

		if ( testimonialSlider.length> 0 ) {
			var tnsTestimonialSlider = tns({
				container: '.testimonial-slider',
				mode: 'carousel',
				speed: 700,
				items: 1,
				// center: true,
				gutter: 30,
				loop: true,
				edgePadding: 10,
				controlsPosition: 'bottom',
				navPosition: 'bottom',
				nav: true,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#testimonial-slider-nav',
				controls: false,
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 1
					},
					900: {
						items: 1
					}
				}
			});
		}

		
	}
	tinyslider();

	var lightboxVideo = GLightbox({
		selector: '.glightbox'
	});

	function clickEffect() {
		let balls = [];
		let longPressed = false;
		let longPress;
		let multiplier = 0;
		let width, height;
		let origin;
		let normal;
		let ctx;
		const colours = ["#4030FF", "#14FFEC", "#00BFFF", "#1030FF", "#1530FF"];
		const canvas = document.createElement("canvas");
		document.body.appendChild(canvas);
		canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
		const pointer = document.createElement("span");
		pointer.classList.add("pointer");
		document.body.appendChild(pointer);
	   
		if (canvas.getContext && window.addEventListener) {
		  ctx = canvas.getContext("2d");
		  updateSize();
		  window.addEventListener('resize', updateSize, false);
		  loop();
		  window.addEventListener("mousedown", function(e) {
			pushBalls(randBetween(10, 20), e.clientX, e.clientY);
			document.body.classList.add("is-pressed");
			longPress = setTimeout(function(){
			  document.body.classList.add("is-longpress");
			  longPressed = true;
			}, 500);
		  }, false);
		  window.addEventListener("mouseup", function(e) {
			clearInterval(longPress);
			if (longPressed == true) {
			  document.body.classList.remove("is-longpress");
			  pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
			  longPressed = false;
			}
			document.body.classList.remove("is-pressed");
		  }, false);
		  window.addEventListener("mousemove", function(e) {
			let x = e.clientX;
			let y = e.clientY;
			pointer.style.top = y + "px";
			pointer.style.left = x + "px";
		  }, false);
		} else {
		  console.log("canvas or addEventListener is unsupported!");
		}
	   
	   
		function updateSize() {
		  canvas.width = window.innerWidth * 2;
		  canvas.height = window.innerHeight * 2;
		  canvas.style.width = window.innerWidth + 'px';
		  canvas.style.height = window.innerHeight + 'px';
		  ctx.scale(2, 2);
		  width = (canvas.width = window.innerWidth);
		  height = (canvas.height = window.innerHeight);
		  origin = {
			x: width / 2,
			y: height / 2
		  };
		  normal = {
			x: width / 2,
			y: height / 2
		  };
		}
		class Ball {
		  constructor(x = origin.x, y = origin.y) {
			this.x = x;
			this.y = y;
			this.angle = Math.PI * 2 * Math.random();
			if (longPressed == true) {
			  this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
			} else {
			  this.multiplier = randBetween(6, 12);
			}
			this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
			this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
			this.r = randBetween(8, 12) + 3 * Math.random();
			this.color = colours[Math.floor(Math.random() * colours.length)];
		  }
		  update() {
			this.x += this.vx - normal.x;
			this.y += this.vy - normal.y;
			normal.x = -2 / window.innerWidth * Math.sin(this.angle);
			normal.y = -2 / window.innerHeight * Math.cos(this.angle);
			this.r -= 0.3;
			this.vx *= 0.9;
			this.vy *= 0.9;
		  }
		}
	   
		function pushBalls(count = 1, x = origin.x, y = origin.y) {
		  for (let i = 0; i < count; i++) {
			balls.push(new Ball(x, y));
		  }
		}
	   
		function randBetween(min, max) {
		  return Math.floor(Math.random() * max) + min;
		}
	   
		function loop() {
		  ctx.fillStyle = "rgba(255, 255, 255, 0)";
		  ctx.clearRect(0, 0, canvas.width, canvas.height);
		  for (let i = 0; i < balls.length; i++) {
			let b = balls[i];
			if (b.r < 0) continue;
			ctx.fillStyle = b.color;
			ctx.beginPath();
			ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
			ctx.fill();
			b.update();
		  }
		  if (longPressed == true) {
			multiplier += 0.2;
		  } else if (!longPressed && multiplier >= 0) {
			multiplier -= 0.4;
		  }
		  removeBall();
		  requestAnimationFrame(loop);
		}
	   
		function removeBall() {
		  for (let i = 0; i < balls.length; i++) {
			let b = balls[i];
			if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
			  balls.splice(i, 1);
			}
		  }
		}
	  }
	  clickEffect();


})()