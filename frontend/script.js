var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

// ================= BACKEND CONNECTION =================

// Fetch products from backend
fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");

    if (!container) {
      console.log("Container not found");
      return;
    }

    container.innerHTML = "";

    data.forEach(item => {
      container.innerHTML += `
        <div style="width:200px; margin:10px; border:1px solid #ddd; padding:10px;">
          <img src="${item.image}" style="width:100%">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
      `;
    });
  })
  .catch(err => console.log(err));
fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products");

    container.innerHTML = "";

    data.forEach(item => {
      container.innerHTML += `
        <div style="width:200px; margin:10px;">
          <img src="${item.image}" style="width:100%">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
      `;
    });
  })
  .catch(err => console.log(err));