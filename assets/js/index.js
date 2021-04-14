const d = document;

function MoveTop (element1,element2,element3) {

	const scrolling = d.documentElement.scrollTop;

	const alturaBoxpurchase = element2.offsetTop;

	if (scrolling  > alturaBoxpurchase) {

		element2.style.transform = `translateY(-100%)`;
		element3.style.background = 'transparent';
		element1.classList.remove('active');

	}else{
		element2.style.transform = `translateY(0%)`;
		element3.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.5) 10%, rgba(128,128,135,0.0	) 35%, rgba(0,212,255,0) 100%)'
	} 

}

function Magic (element4) {
	const scrollTop = d.documentElement.scrollTop;
	for( i=0 ; i < element4.length ; i++){
		let elementHeigh = element4[i].offsetTop;
		if (elementHeigh - 280 < scrollTop) {
			element4[i].style.opacity = 1;
			element4[i].classList.add('moveIn');
		}
	}
	
}


function MagicLeft (element5) {
	const scrollTop = d.documentElement.scrollTop;
	for( i=0 ; i < element5.length ; i++){
		let elementHeigh = element5[i].offsetTop;
		if (elementHeigh - 280 < scrollTop) {
			element5[i].style.opacity = 1;
			element5[i].classList.add('moveLeft');
		}
	}
	
}

function ContactForm(){
	const $input = d.querySelectorAll('.contact-form [required]');
	const $form = d.querySelector('.contact-form');

	$input.forEach((input)=>{
		const $span = d.createElement('span');
		$span.id = input.name;
		$span.textContent = input.title;
		$span.classList.add('active-span', 'none-active');

		input.insertAdjacentElement("afterend", $span);

	});

	d.addEventListener('keyup', (e)=>{ 
		 if(e.target.matches('.contact-form [required]')){
		 	let $input = e.target;
		 	const pattern = $input.pattern || $input.dataset.pattern;

		 	if(pattern && $input.value!==""){
		 		
		 		let regex = new RegExp(pattern);
		 		return !regex.exec($input.value)
		 			? d.getElementById($input.name).classList.add('is-active')
		 			: d.getElementById($input.name).classList.remove('is-active');
		 	}


		 }
		})

	d.addEventListener('submit', (e)=>{
		e.preventDefault();
		const $loader = d.querySelector('.contact-form-loader');
		const $response = d.querySelector('.contact-form-response');

		$loader.classList.remove('none');


		fetch("https://formsubmit.co/ajax/alanvera48@gmail.com",{
			method: "POST",
			body: new FormData(e.target)
		})
		.then(res=>res.ok 
			? res.json()
			: Promise.reject(res))
		
		.then((json)=>{
			$loader.classList.add('none');
			$response.classList.remove('none');
			$response.innerHTML =`<p>$${json.message}</p>`
			$form.reset();
			console.log(json)
		})
		.catch((err)=>{
			console.log(err);
			let message = err.statusText || "Ocurrio un error";
			$response.innerHTML = `<p> Error ${err.status} : ${message}</p>`
		})
		.finally(()=>{
			setTimeout(()=>{
				$response.classList.add('none');
				$response.innerHTML = "";
		}, 3000)
		})
	})

}


d.addEventListener('DOMContentLoaded', (e)=>{

	$menu = d.querySelector('.menu');
	$boxpurchase = d.querySelector('.box-purchase');
	$headerBackground = d.querySelector('header');
	$moveElements = d.querySelectorAll('.move');
	$moveElementsLeft = d.querySelectorAll('.moveFromLeft');
	
	ContactForm();

	d.addEventListener('scroll', (e)=>{
		MoveTop($menu,$boxpurchase, $headerBackground);
		Magic($moveElements);
		MagicLeft($moveElementsLeft);
	})

	d.addEventListener('click', e =>{
		if(e.target.matches('.toggle-menu')){

			$menu.classList.toggle('active');
			e.target.classList.toggle('toggle-mov');

		}else if(e.target.matches('.fasCard')){

			e.target.classList.toggle('selected')

			$padre = e.target.parentNode;

		}else return false
			
	})

})

