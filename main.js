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

function showPage() {
	// Get the hash from the URL
	var hash = window.location.hash.substring(1) || 'home';
	var pages = document.querySelectorAll('.page');
	var cards = document.querySelectorAll('.card-wrapper');
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
		delays.forEach(delay => {
			page.classList.remove(delay);
		})
	})
	delays.forEach(delay => {
		mobileHeader.classList.remove(delay);
	})

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


function navigateTo(pageId) {
	// Set the hash in the URL
    var selectedPage = document.querySelector(`.page[data-page-target="${pageId}"]`);
	var cardClicked = document.querySelector(`.card-wrapper[data-page-target="${pageId}"]`);

	if(selectedPage.classList.contains('active')){
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

const toggleButton = document.getElementById("dark-mode-toggle");
const toggleGroup = document.getElementById("dark-mode-toggle-group");

const htmlElement = document.documentElement;

// Add an event listener to the button
toggleGroup.addEventListener("click", () => {
  // Toggle the 'dark-mode' class on the body
  htmlElement.classList.toggle("dark-mode");

  if(htmlElement.classList.contains('dark-mode')){
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Example new icon
  } else{
    toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Example new icon
	}
  toggleButton.classList.toggle('switched')

});

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
	  toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Example new icon
		toggleButton.classList.add('switched')
	} else {
	  htmlElement.classList.remove("dark-mode");
	  toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Example new icon

	}
}

applyUserPreference();
