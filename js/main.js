import fetchJsonp from 'fetch-jsonp';
import {isValidZip, showAlert} from './validate.js';

const petForm = document.querySelector('#pet-form');
const animal = document.querySelector("#animal");
const breed = document.querySelector("#breed");

petForm.addEventListener('submit', fetchAnimal);
animal.addEventListener('change', fetchBreed);


// Fetch Breed
function fetchBreed(e){
	e.preventDefault();

	//Get user's input
	const animal = document.querySelector("#animal").value;
	console.log(animal);


	//Fetch breed
	fetchJsonp(`http://api.petfinder.com/breed.list?format=json
		&key=01c828c88c8b45cfd53fb643a3ae2236&animal=${animal}&callbacl=callback`,
		{jsonpCallbackFuntion: 'callback'})
	.then( res => res.json())
	.then( data => changeBreed(data.petfinder.breeds.breed, breed))
	.catch( err => console.log(err));
	//console.log(breeds);
}

function changeBreed(breeds){
	breed.innerHTML = "";

	//default
	var option = document.createElement('option');
	option.innerHTML = "";
	breed.options.add(option);

	breeds.forEach( item => {
		var newOption = document.createElement('option');
		newOption.innerHTML = item.$t;
		breed.options.add(newOption);
	});
}


//   下面的内容不要改了

function fetchAnimal(e){
	e.preventDefault();

	//Get user's input
	const animal = document.querySelector("#animal").value;
	const zip = document.querySelector("#zip").value;
	const breed = document.querySelector("#breed").value;
	const sex = document.querySelector("#sex").value;
	const age = document.querySelector("#age").value;

	if(!isValidZip(zip)){
		showAlert('Please enter a valid zipcode', 'danger');
		return;
	}

	//Fetch Animal
	fetchJsonp(`http://api.petfinder.com/pet.find?format=json
		&key=01c828c88c8b45cfd53fb643a3ae2236&animal=${animal}&location=${zip}&breed=${breed}&sex=${sex}&age=${age}&callbacl=callback`,
		{jsonpCallbackFuntion: 'callback'})
	.then( res => res.json())
	.then( data => showPet(data.petfinder.pets.pet))
	.catch( err => console.log(err));
}

//Show Pet
function showPet(pets) {
	const result = document.querySelector('#results');
	results.classList.add("wrap-contact100", "mt-3");

	results.innerHTML = '';

	//console.log(pets);

	pets.forEach(pet => {

		console.log(pet);
		const div = document.createElement("div");
		div.classList.add('card', 'card-body', 'mb-3', 'container');
		div.innerHTML = `
			<div class="row">
				<div class="col-sm-6">
                    <div class="generic_content clearfix">
                        
                        <div class="generic_head_price clearfix">
                            <div class="generic_head_content clearfix">
                                <div class="head_bg"></div>
                                <div class="head">
                                    <span>${pet.name.$t}</span>
                                </div>
                            </div>
                            <div class="generic_price_tag clearfix">	
                                <div class="head">
                                    <span>${pet.breeds.breed.$t}</span>
                                </div>
                            </div>
                        </div>    

                        <div class="generic_feature_list ">
                        	<ul>
                                <li><span><i class="fa fa-intersex"></i></span>${pet.sex.$t}</li>
                                <li><span><i class="fa fa-phone"></i></span>${pet.contact.phone.$t}</li>
                                ${pet.contact.email.$t ? ` <li><span><i class="fa fa-envelope"></i></span>${pet.contact.email.$t}</li>` : `` }
                                <li><span><i class="fa fa-address-book-o"></i></span>Shelter ID - ${pet.shelterId.$t}</li>
                                <li><span><i class="fa fa-home"></i></span>${pet.contact.address1.$t} ${pet.contact.city.$t}
						 ${pet.contact.state.$t}</li>
                            </ul>
                        </div> 
                    </div>                        
				</div>
				<div class="col-sm-6 text-center">
					<div class="generic_content clearfix">
						<img class="image shadow rounded" src="${pet.media.photos.photo[3].$t}">
						<div class="row border border-warning mt-3">
							<p class="mt-3 text-secondary description smooth-scroll">${pet.description.$t}</p>
						</div>
					</div>
				</div>
			
			</div>
		`;
		results.append(div);

		window.scrollTo({
		    top: 900,
		    behavior: "smooth"
		});
	});
}