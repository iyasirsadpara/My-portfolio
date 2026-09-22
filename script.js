
const sidemenu = document.querySelector("#sidemenu");
const navbar = document.querySelector("nav")
const navbarul = document.querySelector("nav ul")

function openmenu(){
    sidemenu.style.transform = 'translateX(-16rem)';
}
function closemenu(){
    sidemenu.style.transform = "translateX(16rem)";
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add(
            "bg-white/50",
            "bg-opacity-50",
            "backdrop-blur-lg",
            "shadow-sm"
        );
        navbarul.classList.remove('bg-white','shadow-sm', 'bg-opacity-50')
    } else {
        navbar.classList.remove(
            "bg-white/50",
            "bg-opacity-50",
            "backdrop-blur-lg",
            "shadow-sm"
        );
        navbarul.classList.add('bg-white','shadow-sm', 'bg-opacity-50')
    }
});

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const savedTheme = localStorage.getItem("theme");

function setTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    themeIcon.src = isDark ? "./images/sun_icon.png" : "./images/moon_icon.png";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");
    setTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
// Array of titles to rotate through
const titles = [
    "Frontend Web Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "React Developer",
    "Machine Learning & AI",
    "Exploring Data Science"
];

let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const headingElement = document.getElementById("main_h1"); // Select your main heading
const typingSpeed = 90; // Speed of typing in milliseconds
const deletingSpeed = 60; // Speed of deleting (faster than typing)
const delayBetweenWords = 2000; // Pause before starting to delete

function typeWriter() {
    const currentText = titles[currentIndex];
    
    if (isDeleting) {
        // Remove one character
        headingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        // If finished deleting
        if (charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length; // Move to next title
            setTimeout(typeWriter, 500); // Short pause before typing next word
            return;
        }
        
        setTimeout(typeWriter, deletingSpeed);
    } else {
        // Add one character
        headingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        // If finished typing
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenWords); // Pause before deleting
            return;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
}

// Add blinking cursor effect (optional)
headingElement.style.borderRight = '2px solid ';
headingElement.style.paddingRight = '10px';
headingElement.style.animation = 'blink 0.9s infinite';

// Add cursor blink animation to your CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 49% { border-color: transparent; }
        50%, 100% { border-color: currentColor; }
    }
`;
document.head.appendChild(style);

// Start the typewriter effect
typeWriter();