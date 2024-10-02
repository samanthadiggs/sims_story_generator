//set up event listener
document.getElementById('generationType').addEventListener('change', function() {
    const type = this.value;
    const additionalInputs = document.getElementById('additionalInput');

    // Clear previous inputs
    additionalInputs.innerHTML = '';

    // Show inputs based on selection
    if (type === 'full' || type === 'partial' || type === 'story') {
        additionalInputs.innerHTML += `
            <select class="dropdown form-select" id="gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select class="dropdown form-select" id="nationality">
                <option value="">Select Nationality</option>
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
            <input type="range" id="numberOfNames" min="1" max="20" value="10" oninput="this.nextElementSibling.value = this.value">
            <output>10</output>
        `;
    } 
});

document.getElementById('generate').addEventListener('click', function() {
    const genType = document.getElementById('generationType').value;
    const nationality = document.getElementById('nationality')?.value || document.getElementById('nationalityRandom')?.value;
    const gender = document.getElementById('gender')?.value || document.getElementById('genderRandom')?.value;
    
    const generatedOutput = document.getElementById('output');

    document.getElementById('output').innerHTML = ''; // Clear previous outputs

    // functions & their variables

    function getRandomAgeCategory(){
        const ageCategories = ['Child', 'Teen', 'Young Adult', 'Adult', 'Elder'];
        const randomIndex = Math.floor(Math.random() * ageCategories.length);
        return ageCategories[randomIndex];
    };

    const randomAge = getRandomAgeCategory();

    function getDetails(details){
        return new Promise((resolve, reject) => { // return a promise
            let file = 'details.csv';
            const detail = details;
            Papa.parse(file, {
                header: true,
                download: true,
                complete: function(results) {
                    if (detail === 'job') { 
                        const data = results.data;
                        const occupationsFilteredData = data.filter(item => item.Type === 'Job');
    
                        let job = '';
    
                        // Select a random job if available
                        if (occupationsFilteredData.length > 0) {
                            job = occupationsFilteredData[Math.floor(Math.random() * occupationsFilteredData.length)].Title;
                        } else {
                            job = 'No matching jobs found.';
                        }
                        
                        resolve(job); // Resolve the promise with the job
                    } else {
                        reject('No matching detail'); // Reject the promise if the detail doesn't match
                    }
                }
            });
        });
    }   


    // Load the CSV file and generate names based on selections
    
    let file = 'names.csv'
    Papa.parse(file, {
        header: true,
        download:true,
        complete: function(results) {
            const data = results.data;
            // let output = '';

            if (genType === 'full' || genType === 'partial' || genType ==='story') {
                // Generate a full, partial, or story

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
                    getDetails('job').then(job => {
                        generatedOutput.innerHTML += `
                            <p class="outputText">Generated Profile:</p>
                            <p class="outputText">Nationality: ${nationality}</p>
                            <p class="outputText">Name: ${names}</p>
                            <p class="outputText">Age: ${randomAge}</p>
                            <p class="outputText">Job: ${job}</p>
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
                } else if(genType == 'story'){
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


            } 
        }
    });
});
