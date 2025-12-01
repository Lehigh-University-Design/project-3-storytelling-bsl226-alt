// Start JS script code, feel free to not use this or remove it

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('animate');
		  return;
		}
		
	  });
	}, { threshold: 0.5 });

    const allAnimatedElements = document.querySelectorAll('.text, .texts, .image, .imagey, .image1');

    allAnimatedElements.forEach((element) => observer.observe(element));

    });             