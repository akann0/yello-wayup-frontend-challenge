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
      <body>
        <h1>Jobs</h1>
        <div class='jobsList'>
          {jobData.map(job => (
            <div class="job" key={job.id}>
              <h1 class="title">{job.title}</h1>
              <p class="company">{job.company}</p>
              <p class="location">{job.location}</p>
              <p class="description">{job.description}</p>
              {job.tags.map(tag => (
                <span class={`tag ${tag}`} key={tag}>{tag}</span>
              ))}
              <button class="apply">Apply</button>
              </div>
          ))}
        </div>
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
