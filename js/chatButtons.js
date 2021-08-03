function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  function contactButton(){
    document.getElementById("myForm").style.display = "none";
    $("#contact-forms").get(0).scrollIntoView();  
  }
  function productsButton(){
    console.log('product button hit');
    fetch("/products", {
      method: "get",
    }).then((response) => {
      return response;
    });
  }