//set up event listener
document.getElementById('generationType').addEventListener('change', function() {
    const type = this.value;
    const additionalInputs = document.getElementById('additionalInput');

    // Clear previous inputs
    additionalInputs.innerHTML = '';

    // Show inputs based on selection
    if (type === 'full' || type === 'partial') {
        additionalInputs.innerHTML += `
            <select class="dropdown form-select" id="gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select class="dropdown form-select" id="nationality">
                <option value="">Select Nationality</option>
                <option value="Random">Random</option>
                <option value="African American">African American</option>
                <option value="American">American</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Japanese">Japanese</option>
                <option value="Thai">Thai</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="Indian">Indian</option>
                <option value="Filipino">Filipino</option>
                <option value="Greek">Greek</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Polynesian">Polynesian</option>
            </select>
        `;
    } else if (type === 'random') {
        additionalInputs.innerHTML += `
            <select class="dropdown form-select" id="typeRandom">
                <option value="">Select Type</option>
                <option value="First">First Name</option>
                <option value="Last">Last Name</option>
                <option value="Both">First and Last Name</option>
                <option value="Pet">Pet Name</option>
            </select>

            <input class="form-control" type="text" id="customName" name="customName" autocomplete="off" placeholder="Enter your custom First or Last Name">

            <select class="dropdown form-select" id="genderRandom">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select class="dropdown form-select" id="nationalityRandom">
                <option value="">Select Nationality</option>
                <option value="Random">Random</option>
                <option value="African American">African American</option>
                <option value="American">American</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Japanese">Japanese</option>
                <option value="Thai">Thai</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="Indian">Indian</option>
                <option value="Filipino">Filipino</option>
                <option value="Greek">Greek</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Polynesian">Polynesian</option>
            </select>
            <input type="range" id="numberOfNames" min="1" max="20" value="10" oninput="this.nextElementSibling.value = this.value">
            <output>10</output>
        `;
    } else if(type === 'story'){
        additionalInputs.innerHTML += `
            <select class="dropdown form-select" id="typeStory">
                <option value="">Select Type</option>
                <option value="Sim">Sim</option>
                <option value="Household></option>
            </select>

            <select class="dropdown form-select" id="genderStory">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <select class="dropdown form-select" id="householdType">
                <option value="">Select houseHoldType</option>
                <option value="Male">Homogenous (one nationality) </option>
                <option value="Female">Mixed (two nationalities)</option>
            </select>


            <select class="dropdown form-select" id="nationalityStory2">
                <option value="">Select Nationality 1</option>
                <option value="Random">Random</option>
                <option value="American">American</option>
                <option value="French">French</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Japanese">Japanese</option>
                <option value="Thai">Thai</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="African American">African American</option>
                <option value="Indian">Indian</option>
                <option value="Filipino">Filipino</option>
                <option value="Greek">Greek</option>
                <option value="Arabic">Arabic</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Polynesian">Polynesian</option>
            </select>

            <select class="dropdown form-select" id="nationalityStory2">
                <option value="">Select Nationality 2</option>
                <option value="Random">Random</option>
                <option value="American">American</option>
                <option value="French">French</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Japanese">Japanese</option>
                <option value="Thai">Thai</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="African American">African American</option>
                <option value="Indian">Indian</option>
                <option value="Filipino">Filipino</option>
                <option value="Greek">Greek</option>
                <option value="Arabic">Arabic</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Hawaiian">Hawaiian</option>
            </select>
        `;
    }
});

document.getElementById('generate').addEventListener('click', function() {
    const genType = document.getElementById('generationType').value;
    let nationality = document.getElementById('nationality')?.value || document.getElementById('nationalityRandom')?.value;
    const gender = document.getElementById('gender')?.value || document.getElementById('genderRandom')?.value;
    const generatedOutput = document.getElementById('output');

    document.getElementById('output').innerHTML = ''; // Clear previous outputs

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const namesData = data.nationalities;
            const jobs = data.jobs;
            const degrees = data.degrees;

            // If "Random" nationality is selected, choose one at random
            if (nationality === "Random") {
                const nationalityKeys = Object.keys(namesData);
                nationality = nationalityKeys[Math.floor(Math.random() * nationalityKeys.length)];
            }

            // Ensure nationality exists in the dataset
            if (!namesData[nationality]) {
                generatedOutput.innerHTML = `<p class="outputText">Error: Nationality not found.</p>`;
                return;
            }

            // Generate first and last names
            let firstName = "No matching first names found.";
            let lastName = "No matching last names found.";

            if (genType === 'full' || genType === 'partial') {
                const firstNamesList = namesData[nationality][gender]?.First || [];
                const lastNamesList = namesData[nationality]["None"]?.Last || [];

                if (firstNamesList.length > 0) {
                    firstName = firstNamesList[Math.floor(Math.random() * firstNamesList.length)];
                }
                if (lastNamesList.length > 0) {
                    lastName = lastNamesList[Math.floor(Math.random() * lastNamesList.length)];
                }

                // Get random age category
                const ageCategories = ['Young Adult', 'Adult', 'Elder'];
                const randomAge = ageCategories[Math.floor(Math.random() * ageCategories.length)];

                if (genType === 'full') {
                    // Generate job and degree
                    const job = jobs[Math.floor(Math.random() * jobs.length)];
                    const degree = degrees[Math.floor(Math.random() * degrees.length)];

                    generatedOutput.innerHTML += `
                        <p class="outputText">Generated Profile:</p>
                        <p class="outputText">Nationality: ${nationality}</p>
                        <p class="outputText">Name: ${firstName} ${lastName}</p>
                        <p class="outputText">Age: ${randomAge}</p>
                        <p class="outputText">Job: ${job}</p>
                        <p class="outputText">Degree: ${degree}</p>
                    `;
                } else if (genType === 'partial') {
                    generatedOutput.innerHTML += `
                        <p class="outputText">Generated Profile:</p>
                        <p class="outputText">Nationality: ${nationality}</p>
                        <p class="outputText">Name: ${firstName} ${lastName}</p>
                        <p class="outputText">Age: ${randomAge}</p>
                    `;
                } else if (genType === 'random'){
                    const numberOfNames = document.getElementById('numberOfNames').value;
                    const randomType = document.getElementById('typeRandom').value;
                    const customName = document.getElementById('customName').value;

                    console.log('random generation')
                    console.log(`number of names is ${numberOfNames}`)
                    console.log(`custom name is${customName} `)

                    if(randomType == 'First'){
                        const firstNamesList = namesData[nationality][gender]?.First || [];
                        for (let i = 0; i < numberOfNames; i++) {
                            randomfirstName = firstNamesList[Math.floor(Math.random() * firstNamesList.length)];                            names = `${randomFirst} ${customName}`;
                            generatedOutput.innerHTML += `
                                <p class="outputText">Name: ${randomfirstName}</p>
                        `;
                        }                             
                    }else if(randomType == 'Last'){
                        const lastFilteredData = data.filter(item => item.Nationality === nationality && item.Type === 'Last');
                        for (let i = 0; i < numberOfNames; i++) {
                            const randomLast = lastFilteredData[Math.floor(Math.random() * lastFilteredData.length)].Name;
                            names = `${customName} ${randomLast} `;
                            generatedOutput.innerHTML += `
                                <p class="outputText">Name: ${names}</p>
                        `;
                        }  
                    }
            }
        }
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        generatedOutput.innerHTML = `<p class="outputText">Failed to load data.</p>`;
    });
            

    // Load the CSV file and generate names based on selections
    
    let file = 'names.csv'
    Papa.parse(file, {
        header: true,
        download:true,
        complete: function(results) {
            const data = results.data;
            // let output = '';

            if (genType === 'full' || genType === 'partial') {
                // Generate a full, partial

               // Generating the names

                const firstFilteredData = data.filter(item => item.Nationality === nationality && item.Gender === gender && item.Type === 'First');
                const lastFilteredData = data.filter(item => item.Nationality === nationality && item.Type === 'Last');

                let firstName = '';
                let lastName = '';

                // Select a random first name if available
                if (firstFilteredData.length > 0) {
                    firstName = firstFilteredData[Math.floor(Math.random() * firstFilteredData.length)].Name;
                } else {
                    firstName = 'No matching first names found.';
                }

                // Select a random last name if available
                if (lastFilteredData.length > 0) {
                    lastName = lastFilteredData[Math.floor(Math.random() * lastFilteredData.length)].Name;
                } else {
                    lastName = 'No matching last names found.';
                }

                // Combine first and last name for output
                names = `${firstName} ${lastName}`;

                if(genType == 'full'){
                    Promise.all([getDetails('job'), getDetails('degree')]).then(([job, degree]) => {
                        generatedOutput.innerHTML += `
                            <p class="outputText">Generated Profile:</p>
                            <p class="outputText">Nationality: ${nationality}</p>
                            <p class="outputText">Name: ${names}</p>
                            <p class="outputText">Age: ${randomAge}</p>
                            <p class="outputText">Job: ${job}</p>
                            <p class="outputText">Degree: ${degree}</p>
                        `;
                    }).catch(error => {
                        console.error(error);
                    });

                } else if(genType == 'partial'){
                    generatedOutput.innerHTML += `
                            <p class="outputText">Generated Profile:</p>
                            <p class="outputText">Nationality: ${nationality}</p>
                            <p class="outputText">Name: ${names}</p>
                            <p class="outputText">Age: ${randomAge}</p>

                    `;
                } 


            } else if (genType === 'random') { 
                // Generate random names
                const numberOfNames = document.getElementById('numberOfNames').value;
                const randomType = document.getElementById('typeRandom').value;
                const customName = document.getElementById('customName').value;

                console.log('random generation')
                console.log(`number of names is ${numberOfNames}`)
                console.log(`custom name is${customName} `)

                if(randomType == 'First'){
                    const firstFilteredData = data.filter(item => item.Nationality === nationality && item.Gender === gender && item.Type === 'First');
                    for (let i = 0; i < numberOfNames; i++) {
                        const randomFirst = firstFilteredData[Math.floor(Math.random() * firstFilteredData.length)].Name;
                        names = `${randomFirst} ${customName}`;
                        generatedOutput.innerHTML += `
                            <p class="outputText">Name: ${names}</p>
                    `;
                    }                             
                }else if(randomType == 'Last'){
                    const lastFilteredData = data.filter(item => item.Nationality === nationality && item.Type === 'Last');
                    for (let i = 0; i < numberOfNames; i++) {
                        const randomLast = lastFilteredData[Math.floor(Math.random() * lastFilteredData.length)].Name;
                        names = `${customName} ${randomLast} `;
                        generatedOutput.innerHTML += `
                            <p class="outputText">Name: ${names}</p>
                    `;
                    }        

                }else if(randomType == 'Both'){
                    

                }


            } else if(genType === 'story'){

                const household = document.getElementById('householdType')

                // step 1: generate names
                const firstFilteredData = data.filter(item => item.Nationality === nationality && item.Gender === gender && item.Type === 'First');
                const lastFilteredData = data.filter(item => item.Nationality === nationality && item.Type === 'Last');

                let firstName = '';
                let lastName = '';

                // Select a random first name if available
                if (firstFilteredData.length > 0) {
                    firstName = firstFilteredData[Math.floor(Math.random() * firstFilteredData.length)].Name;
                } else {
                    firstName = 'No matching first names found.';
                }

                // Select a random last name if available
                if (lastFilteredData.length > 0) {
                    lastName = lastFilteredData[Math.floor(Math.random() * lastFilteredData.length)].Name;
                } else {
                    lastName = 'No matching last names found.';
                }


                // Combine first and last name for output
                names = `${firstName} ${lastName}`;
                generatedOutput.innerHTML += `
                            <p class="outputText">Sims 4 Description</p>
                            <p class="outputText> This sim's name is ${names}. They are of ${nationality} nationality and ${gender} gender. </p>

                    `;

            }
        }
    });
});
