// Define the changeSrc function
function changeSrc(butval) {

    console.log("hello")
    console.log(butval)

    var heading = document.getElementById('selected_pub')

    console.log(heading.innerText)

    // Get the iframe element by its id
    var iframe = document.getElementById("main_iframe");
  
    // Get the new src value from a variable

    var newSrc = "pub/" + butval + '.pdf';
    
    if (butval!="FOST Newsletter"){
      heading.innerText = "List of issued " + butval
    } else {
      heading.innerText = butval
    }
    
    // Set the iframe src attribute to the new value
    iframe.setAttribute("src", newSrc);
  }