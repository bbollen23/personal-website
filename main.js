function copy(copyString) {
	// Define the static value to be copied
	var staticValue = copyString;

	// Create a temporary textarea element to hold the static value
	var tempTextarea = document.createElement("textarea");
	tempTextarea.value = staticValue;
	document.body.appendChild(tempTextarea);

	// Select the text in the textarea
	tempTextarea.select();
	tempTextarea.setSelectionRange(0, 99999); // For mobile devices

	// Copy the selected text to the clipboard
	document.execCommand("copy");

	// Remove the temporary textarea
	document.body.removeChild(tempTextarea);


	var notification = document.getElementById("notification")
	notification.innerHTML = 'Copied!'
	notification.classList.add('visible');
	setTimeout(function() {
		notification.classList.remove("visible");
	}, 1500); // 3000 milliseconds = 3 seconds
}

// let userNavigatedWithSwipe = false;
// let swipeDetected = false;

function showPage() {

	// Get the hash from the URL
	var hash = window.location.hash.substring(1) || 'home';
	var pages = document.querySelectorAll('.page');
	var cards = document.querySelectorAll('.card-wrapper');
	var insideCards = document.querySelectorAll('.card');
	var cardContainers = document.querySelectorAll('.card-container');
	var cardShadows = document.querySelectorAll('.card-shadow');
	var buttons = document.querySelectorAll('.nav-button');

	// Add transition delays

	// Case 1: Mobile version, moving home
	// Header and Active Page get delay-1, Home gets delay-2

	var activePage = document.querySelector('.page.active');
	var mobileHeader = document.querySelector('.mobile-header');
	var home = document.querySelector('[data-page-target="home"]');
    var selectedPage = document.querySelector(`.page[data-page-target="${hash}"]`);
	var cardClicked = document.querySelector(`.card-wrapper[data-page-target="${hash}"]`);
	var buttonClicked = document.querySelector(`.button[data-page-target="${hash}"]`)


	// Remove all delays
	const delays = ['delay-1','delay-2','delay-3']
	pages.forEach(page => {
		page.classList.remove('no-transition')
		delays.forEach(delay => {
			page.classList.remove(delay);
		})
	})
	mobileHeader.classList.remove('no-transition')
	delays.forEach(delay => {
		mobileHeader.classList.remove(delay);
	})


	if(!bScrolled){

		if(activePage && activePage.getAttribute('data-page-target') !== 'home' && hash === 'home'){
			if(activePage){
				activePage.classList.add('delay-1');
				mobileHeader.classList.add('delay-1')
				home.classList.add('delay-2')
			}
		} 
		else if (activePage && activePage.getAttribute('data-page-target') === 'home') {
			if(activePage){
				home.classList.add('delay-1')
				selectedPage.classList.add('delay-2');
				mobileHeader.classList.add('delay-2');
			}
		} else if (activePage && activePage.getAttribute('data-page-target') !== 'home' && hash !== 'home') {
			if(activePage){
				activePage.classList.add('delay-1');
				selectedPage.classList.add('delay-3')
			}
		}
	} else {
		pages.forEach(page => {
			page.classList.add('no-transition')
		})
		mobileHeader.classList.add('no-transition')

		cards.forEach(card => {
			card.classList.add('no-transition')
		})
		cardContainers.forEach(container => {
			container.classList.add('no-transition')
		})
		cardShadows.forEach(shadow => {
			shadow.classList.add('no-transition')
		})
		insideCards.forEach(insideCard => {
			insideCard.classList.add('no-transition')
		})
		bScrolled = false;
	}

	// // Hide all pages
	pages.forEach(function(page) {
			page.classList.remove('active');
	});

	cards.forEach(card => {
		card.classList.remove('static-hover')
	});

	buttons.forEach(button => {
		button.classList.remove('clicked')
	})	

	// Show the selected page

    if (selectedPage) {
        selectedPage.classList.toggle('active');
		if(cardClicked){
			cardClicked.classList.add('static-hover');
		}
		if(buttonClicked){
			buttonClicked.classList.add('clicked')
		}
    }
}

function openMenu(){
	var menu = document.querySelector('.mobile-menu')
	menu.classList.toggle('opened')
}

function navigateTo(pageId, mobile=false) {
	// Set the hash in the URL
    var selectedPage = document.querySelector(`.page[data-page-target="${pageId}"]`);
	var cardClicked = document.querySelector(`.card-wrapper[data-page-target="${pageId}"]`);

	var mobileMenu = document.querySelector('.mobile-menu')
	mobileMenu.classList.remove('opened');
	if(selectedPage.classList.contains('active') && mobile===false){
		window.location.hash = "home"
		cardClicked.classList.remove('static-hover')
	} else {
		window.location.hash = pageId;
		cardClicked.classList.add('static-hover')
	}
}



// Add an event listener for hash changes
window.addEventListener('hashchange', showPage);

// Show the page based on the current hash
window.addEventListener('load', showPage);

const toggleButton = document.querySelectorAll(".dark-mode-toggle");
const toggleGroup = document.querySelectorAll(".dark-mode-toggle-group");
console.log(toggleGroup);

const htmlElement = document.documentElement;

// Add an event listener to the button
toggleGroup.forEach(group => {
	group.addEventListener("click", () => {
		// Toggle the 'dark-mode' class on the body
		htmlElement.classList.toggle("dark-mode");
	  
		if(htmlElement.classList.contains('dark-mode')){
		  toggleButton.forEach(item => {
			  item.innerHTML = '<i class="bi bi-moon"></i>';
		  })
		} else{
		  toggleButton.forEach(item => {
			  item.innerHTML = '<i class="bi bi-sun"></i>';
		  })
	  }
		  toggleButton.forEach(item=>{
			  item.classList.toggle('switched')
		  })
	  });
})


const buttons = document.querySelectorAll(".nav-button");
const cards = document.querySelectorAll('.card-wrapper')

// Loop through each button and attach the event listener
buttons.forEach(button => {
	button.addEventListener("mousedown", () => {
		button.classList.add('pressed')
	});
	button.addEventListener("mouseup", () => {
		button.classList.remove('pressed')
	});
	button.addEventListener("mouseleave", () => {
		button.classList.remove('pressed')
	});
	button.addEventListener("touchstart", () => {
		button.classList.add('pressed')
	});
	button.addEventListener("touchend", () => {
		button.classList.remove('pressed')
	});
	button.addEventListener("touchcancel", () => {
		button.classList.remove('pressed')
	});
});

cards.forEach(card => {
	card.addEventListener("mousedown", () => {
		console.log('clicked!!')
		card.classList.add('pressed')
	});
	card.addEventListener("mouseup", () => {
		card.classList.remove('pressed')
	});
	card.addEventListener("mouseleave", () => {
		card.classList.remove('pressed')
	});
	card.addEventListener("touchstart", () => {
		card.classList.add('pressed')
	});
	card.addEventListener("touchend", () => {
		card.classList.remove('pressed')
	});
	card.addEventListener("touchcancel", () => {
		card.classList.remove('pressed')
	});
});

  
  // Apply user preference on initial load


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Manage your UI changes and history here
        if (targetElement) {
            window.history.pushState(null, null, `#${targetId}`);

            // Trigger your UI transition
            performTransition(targetElement);
        }
    });
});


function applyUserPreference() {
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
	if (prefersDarkScheme) {
	  htmlElement.classList.add("dark-mode");

	  toggleButton.forEach(button => {
		button.innerHTML = '<i class="bi bi-moon"></i>'; // Example new icon
		button.classList.add('switched')
	  })
	} else {
	  htmlElement.classList.remove("dark-mode");
	  toggleButton.forEach(button => {
		button.innerHTML = '<i class="bi bi-sun"></i>'; // Example new icon
	  })
	}
}

applyUserPreference();




// Boolean that stores if a swipe has been performed.
var bScrolled = false;
// Countdown in ms before resetting the boolean.
var iTime = 1000;
var oTimeout;
var startX, startY, endX, endY;
var xThreshold = 2;
var yThreshold = 2;


function handleSwipe() {
	if (!bScrolled) {
		// no need to set bScrolled to true if it has been done within the iTime time. 
		bScrolled = true;
		oTimeout = setTimeout(function(){
			bScrolled = false;
		}, iTime);
	}
}

window.addEventListener('mousewheel', function(e) {
	console.log("X Change: " + e.wheelDeltaX);
	console.log("Y Change: " + e.wheelDeltaY);
	let xChange = Math.abs(e.wheelDeltaX);
	let yChange = Math.abs(e.wheelDeltaY);
	if (yChange <= xChange && xChange > xThreshold) {
		handleSwipe();
	}
});

// Detect touch events on iOS
window.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, false);

window.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    var absDeltaX = Math.abs(deltaX);
    var absDeltaY = Math.abs(deltaY);

    // Check if swipe was horizontal
    if (absDeltaY < absDeltaX && absDeltaX > xThreshold) { // Threshold to avoid small movements
        handleSwipe();
    }
}, false);


window.onpopstate = function() {
	// clear the timeout to be sure we keep the correct value for bScrolled
	clearTimeout(oTimeout);
	// check if there has been a swipe prior to the change of history state
	if (bScrolled) {
		// check which browser & OS the user is using, then
		// trigger your awesome custom transition.
		console.log('we b scrolled')
	}
}

const overlay = document.getElementById('mobile-menu-background');

// Add click event listener on the overlay
overlay.addEventListener('click', function(event) {
  // Check if the clicked element is the overlay, not the modal
  if (event.target === overlay) {
	// Perform action (e.g., close the modal)
	// overlay.style.display = 'none';  // Example to hide the modal
	openMenu()
  }
});

// anime({
// 	targets: '.morphing-demo .polymorph',
// 	points: [
// 	  { value: [
// 		'70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
// 		'70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
// 	  },
// 	  { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
// 	  { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
// 	  { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
// 	],
// 	easing: 'easeOutQuad',
// 	duration: 2000,
// 	loop: true
//   });
  