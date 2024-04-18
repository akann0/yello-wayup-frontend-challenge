import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [jobData, setJobData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const json = await callApi();
      setJobData(json);
    };

    fetchData();
    const [locations, tags] = getUniqueLocationsandTags(jobData);
    setLocations(locations);
    setTags(tags);
    // const tags = getUniqueTags(jobData);
  }, []);

  return (
    <div className="App">
      <body>
        <div class="header">
          <h1 class="filter">Available Jobs</h1>
          <input class="filter" type="text" placeholder="Search jobs" />
          <select class="filter" name="location" id="location">
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option value={location}>{location}</option>
            ))}
          </select>
          <select class="filter" name="tag" id="tag">
            <option value="all">All Tags</option>
            {tags.map(tag => (
              <option value={tag}>{tag}</option>
            ))}
          </select>
          
          
        </div>
        <div class='jobsList'>
          {jobData.map(job => (
            <div class="job" onClick={() => toggleSelected(job.id)} id={job.id}>
              <h1 class="title">{job.title}</h1>
              <h4 class="company">{job.company}</h4>
              <p class="location">{job.location}</p>
              <p hidden class="description">{job.description}</p>
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
/**
 * Toggles the selected class on the job element
 * @param {Event} event 
 * @returns {void}
 */
function toggleSelected(jobId) {
  const job = document.getElementById(jobId);
  console.log(job, jobId, "jobId")
  job.classList.toggle('selected');
}

/**
 * Returns two arrays of unique locations and tags
 * @param {Array} jobData 
 * @returns {Array}
 */
function getUniqueLocationsandTags(jobData) {
  const locations = jobData.map(job => job.location);
  const tags = jobData.map(job => job.tags).flat();
  return [Array.from(new Set(locations)), Array.from(new Set(tags))];
}

export default App;
