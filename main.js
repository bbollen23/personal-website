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
	var cards = document.querySelectorAll('.card');

	// Add transition delays

	// Case 1: Mobile version, moving home
	// Header and Active Page get delay-1, Home gets delay-2

	var activePage = document.querySelector('.page.active');
	var mobileHeader = document.querySelector('.mobile-header');
	var home = document.querySelector('[data-target="home"]');
    var selectedPage = document.querySelector(`.page[data-target="${hash}"]`);
	var cardClicked = document.querySelector(`.card[data-page-card="${hash}"]`);

	// console.log('i am here')

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

	if(activePage && activePage.getAttribute('data-target') !== 'home' && hash === 'home'){
		console.log(activePage)
		console.log('got here')
		if(activePage){
			console.log('am i here?')
			activePage.classList.add('delay-1');
			mobileHeader.classList.add('delay-1')
			home.classList.add('delay-2')
		}
	} 
	else if (activePage && activePage.getAttribute('data-target') === 'home') {
		if(activePage){
			console.log('woah')
			home.classList.add('delay-1')
			selectedPage.classList.add('delay-2');
			mobileHeader.classList.add('delay-2');
		}
	} else if (activePage && activePage.getAttribute('data-target') !== 'home' && hash !== 'home') {
		if(activePage){
			console.log('huzzah!')
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

	// Show the selected page

    if (selectedPage) {
        selectedPage.classList.toggle('active');
		if(cardClicked){
			cardClicked.classList.add('static-hover');
		}
    }
}

function navigateTo(pageId) {
	// Set the hash in the URL
    var selectedPage = document.querySelector(`.page[data-target="${pageId}"]`);
	var cardClicked = document.querySelector(`.card[data-page-card="${pageId}"]`);

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
  
  // Apply user preference on initial load
  applyUserPreference();


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