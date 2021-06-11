/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "642f6390f89ff5e481d2c293e11cb0df";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Get Data from open weather map api 
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zip =  document.getElementById('zip').value;
const userResponse = document.getElementById("feelings").value;
if(zip != "")
{
    getWeatherData(baseURL,zip,apiKey)
      .then(function(data){
        postData('/add', {temperature:data.main.temp, date: newDate, userResponse:userResponse} );
      }).then(()=> updateUI())
}
else{
    alert("Please Enter ZIP code");
}

}
const getWeatherData = async (baseURL, zip, apiKey)=>{
  let url = baseURL+zip+"&appid="+apiKey;
  const res = await fetch(url)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }
  catch(error) {
    console.log("error", error); 
  }
}

const postData = async ( url = '', data = {})=>{
    console.log("Posting Data");
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
  });

    try {
      const newData = await response.json();
      return newData
    }
    catch(error) {
      console.log("error", error);
    }
}

const updateUI = async () => {
    console.log("Updating UI");
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      document.getElementById('temp').innerHTML = "Temperature: " +allData.temperature;
      document.getElementById('date').innerHTML = "Date: " +allData.date;
      document.getElementById('content').innerHTML = "Feeling: " +allData.userResponse;
  
    }catch(error){
      console.log("error", error);
    }
}



