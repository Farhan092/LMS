'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");
const dropdownLinks = document.querySelectorAll(".dropdown > a");

// Toggle navbar and overlay visibility
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to burger menu togglers
addEventOnElem(navTogglers, "click", toggleNavbar);

// Close navbar and overlay when a normal link is clicked
const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

// Attach event only to non-dropdown links
navLinks.forEach((link) => {
  if (!link.closest(".dropdown")) {
    link.addEventListener("click", closeNavbar);
  }
});

// Function to close all sibling dropdowns except the clicked one
function closeOtherDropdowns(currentDropdown) {
  const allDropdownLists = document.querySelectorAll('.dropdown-list');
  allDropdownLists.forEach(list => {
    if (list !== currentDropdown) {
      list.style.display = 'none'; // Hide other dropdowns
    }
  });
}

// Function to close all sub-dropdowns within the current dropdown
function closeSubDropdowns(parentDropdown) {
  const subDropdownLists = parentDropdown.querySelectorAll('.dropdown-list .sub-dropdown-list');
  subDropdownLists.forEach(list => {
    list.style.display = 'none'; // Hide all sub-dropdowns
  });
}

// Function to close all dropdowns when clicking outside the navbar
function closeAllDropdowns() {
  const allDropdownLists = document.querySelectorAll('.dropdown-list');
  allDropdownLists.forEach(list => {
    list.style.display = 'none'; // Hide all dropdowns
  });
}

// Handle dropdown toggle and navigation
dropdownLinks.forEach((dropdownLink) => {
  dropdownLink.addEventListener("click", (e) => {
    const href = dropdownLink.getAttribute('href');

    // Allow navigation for valid links
    if (href && !href.startsWith('#')) {
      window.location.href = href; // Navigate to the desired page
    } else {
      e.preventDefault(); // Prevent navigation for links with '#'

      const dropdownList = dropdownLink.nextElementSibling; // Get the associated dropdown list

      // Toggle dropdown visibility
      if (dropdownList) {
        if (dropdownList.style.display === 'none' || dropdownList.style.display === '') {
          closeOtherDropdowns(dropdownList); // Close sibling dropdowns
          dropdownList.style.display = 'block'; // Show the selected dropdown
        } else {
          dropdownList.style.display = 'none'; // Hide if already visible
        }

        // Close any open sub-dropdowns when toggling a parent dropdown
        closeSubDropdowns(dropdownList);
      }
    }
  });
});

/**
 * Header active when scrolling down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeElem);

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
  if (!event.target.closest('.navbar')) {
    closeAllDropdowns(); // Close dropdowns if clicked outside the navbar
  }
});

// Prevent dropdown from closing when clicking inside it
document.querySelectorAll('.dropdown-list').forEach(list => {
  list.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent clicks within the dropdown from closing it
  });
});

// Handle sub-dropdown toggle and ensure only one sub-dropdown is visible at a time
document.querySelectorAll('.dropdown-item > .sub-dropdown-link').forEach(link => {
  link.addEventListener('click', function (event) {
    event.stopPropagation(); // Stop event from bubbling up

    const subDropdownList = this.nextElementSibling; // Get associated sub-dropdown

    if (subDropdownList) {
      // Close other sub-dropdowns inside the same parent dropdown
      const parentDropdown = this.closest('.dropdown-list');
      closeSubDropdowns(parentDropdown); // Close all other sub-dropdowns under the same parent

      // Toggle visibility of the clicked sub-dropdown
      subDropdownList.style.display = subDropdownList.style.display === 'block' ? 'none' : 'block';
    }
  });
});
