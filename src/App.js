import './App.css';
import { useState, useEffect } from 'react';
import Axios from "axios";

function App() {
  const [measurementList, setMeasurementList] = useState([]);
  const [sensor, setSensor] = useState("");
  const [weight, setWeight] = useState(0);
  const [time,   setTime]   = useState(null);

  const isLocal = false; // Set this to true to use localhost, false to use DNS
  const SERVER_URL = isLocal ? "http://localhost:3001" : "https://fms-wgqj.onrender.com";

  useEffect(() => {
    Axios.get(SERVER_URL + "/getMeasurements").then ((response) => {
      setMeasurementList(response.data);
    })
  }, [SERVER_URL])

  const addMeasurement = () => {
    Axios.post(SERVER_URL + "/addMeasurement", {
      sensor, weight, time,
    }).then((response)=>{
      alert ("Measurement added ...");
    });
  }

  return (
    <div className="App">
      <div ClassName = "addMeasurementForm">
        <input 
          type="text" 
          placeholder="sensor ..." 
          onChange={(event) => {setSensor(event.target.value);}}
        />
        <input 
          type="number" 
          placeholder="weight (grams) ..."
          onChange={(event) => {setWeight(event.target.value);}}
        />
        <input 
          type="datetime-local" 
          step="1"
          placeholder="date ..."
          onChange={(event) => {setTime(event.target.value);}}
        />
        <button onClick={addMeasurement}> Add Measurement </button>
      </div>

      <div ClassName = "displayMeasurementList">
        {
          measurementList.map((measurment) => {
            return (
              <div>
                <h1>Sensor {measurment.sensor} </h1>
                <h1>Weight {measurment.weight} </h1>
                <h1>Time   {measurment.time}   </h1>
              </div> 
            );
          })
        }  
      </div>  

    </div>
  );
}

export default App;
