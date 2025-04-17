// script.js

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    // Toggle mobile nav
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuToggle.setAttribute(
        "aria-label",
        navLinks.classList.contains("active") ? "Close Menu" : "Open Menu"
      );
    });
  
    // Close mobile nav on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.setAttribute("aria-label", "Open Menu");
        }
      });
    });
  
    // Highlight current page in nav
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  
    // Fetch meeting data from Google Sheet
    const sheetCsvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRW3YmpAdkiPbAWBlDFgkuLWQf0XZ-oeac-ss8_U8AokuPMzRp-5Cf3E2o6HN-U6yQbK7jEFmf6Gtyn/pub?output=csv";
  
    const tableBody = document.querySelector("#meetings-table tbody");
    if (tableBody) {
      fetch(sheetCsvUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
          return response.text();
        })
        .then(csv => {
          const rows = csv.trim().split("\n").slice(1); // Skip header
          rows.forEach(row => {
            const cols = row.split(",");
            const tr = document.createElement("tr");
            cols.forEach(cell => {
              const td = document.createElement("td");
              td.textContent = cell.trim();
              tr.appendChild(td);
            });
            tableBody.appendChild(tr);
          });
        })
        .catch(error => {
          console.error("Failed to load Google Sheet data:", error);
          tableBody.innerHTML =
            "<tr><td colspan='4'>Could not load meeting data.</td></tr>";
        });
    }
  });
  
