let slideIndex = 0;
    showSlides();
    
    // function plusSlides(n) {
    //   showSlides(slideIndex += n);
    // }
    
    // function currentSlide(n) {
    //   showSlides(slideIndex = n);
    // }
    
    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      //var dots = document.getElementsByClassName("dot");
      //if (n > slides.length) {slideIndex = 1}    
      //if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";  
      }
      //for (i = 0; i < dots.length; i++) {
      //    dots[i].className = dots[i].className.replace(" active", "");
      //}
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex=1}
        slides[slideIndex-1].style.display = "block";  
      //dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 3000)
    }

/*window.addEventListener("click", function() {
    this.alert('cuidado con lo q haces funciona todo perfecto no rompas nada');
})*/