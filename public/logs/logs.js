getData(); 
async function getData(){
  const res = await fetch('/api');
  const data = await res.json(); 
  console.log(data);
  console.log(data.data);

  for(i = 0; i < data.data.length; i++){
      // console.log("hello") - just testing with hellos 
  const root = document.createElement('div');
  const vegetable = document.createElement('div');
  const geo = document.createElement('div');
  const date = document.createElement('div');
  const image = document.createElement('img');
  vegetable.textContent = `vegetable: ${data.data[i].vegetable}`;
  geo.textContent = `lat: ${data.data[i].lat}°, lon: ${data.data[i].lon}°`;
  console.log(data.data[i].lat,data.data[i].lon);
  //     //item.lat is the same as data.data[0], data.data[1], etc. 
  //     //converting date to local time in a string 
  const dateString = new Date(data.data[i].timestamp).toLocaleString(); 
  date.textContent = dateString;
  console.log(dateString);
  //date is sometimes working, sometimes not 
  image.src = data.data[i].image64;
  console.log(data.data[i].image64);
  root.append(vegetable,geo,date, image);
  // root.append(geo);
  document.body.append(root);
  }
  
  //same as for Loop above 
  //item is the index in the array
  //item is data.data 
  //forEach 
  // for (item of data.data) {
  //     const root = document.createElement('div');
  //     const vegetable = document.createElement('div');
  //     const geo = document.createElement('div');
  //     const date = document.createElement('div');
  //     vegetable.textContent = `vegetable: ${item.vegetable}`;
  //     geo.textContent = `${item.lat}°, ${item.lon}°`;
  //     //item.lat is the same as data.data[0], data.data[1], etc. 
  //     //converting date to local time in a string 
  //     const dateString = new Date(item.timestamp).toLocaleString(); 
  //     date.textContent = dateString;
  //     root.append(vegetable, geo);
  //     document.body.append(root);
  // }
}