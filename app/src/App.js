import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [jobData, setJobData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const json = await callApi();
      setJobData(json);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <h1>Jobs</h1>
        <ul>
          {jobData.map(job => (
            <li key={job.id}>{job.title}</li>
          ))}
        </ul>
      </body>
    </div>
  );
}

function callApi() {
  return fetch('https://62bc8d086b1401736cfcd8fb.mockapi.io/jobs')
    .then(response => response.json())
    .then(data => {
      console.log("data", data);
      return data;
    });
}

export default App;
