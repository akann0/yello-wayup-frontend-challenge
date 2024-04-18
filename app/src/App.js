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
          <h1 class="">Available Jobs</h1>
          <input class="filter search" type="text" placeholder="Search jobs" onChange={() => filterData()}/>
          {/* <select class="filter" name="location" id="location">
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
          </select> */}
          
          
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


/**
 * Calls the mock api and returns the data
 * @returns {Promise} 
 */
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

/**
 * Filters the job data based on the input of all three values in the header
 * @returns {void}
 */
function filterData() {
  const searchInput = document.querySelector('.search').value;
  const jobs = document.querySelectorAll('.job');
  jobs.forEach(job => {
    const title = job.querySelector('.title').textContent;
    const companyText = job.querySelector('.company').textContent;
    const locationText = job.querySelector('.location').textContent;
    if (companyText.toLowerCase().includes(searchInput.toLowerCase()) || title.toLowerCase().includes(searchInput.toLowerCase()) || locationText.toLowerCase().includes(searchInput.toLowerCase())){
      job.style.display = 'block';
    } else {
      job.style.display = 'none';
    }
  });
}

export default App;
