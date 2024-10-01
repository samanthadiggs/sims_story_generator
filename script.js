//set up event listener

document.getElementById('generationType').addEventListener('change', function() {
    const type = this.value;
    const additionalInputs = document.getElementById('additionalInput');

    // Clear previous inputs
    additionalInputs.innerHTML = '';

    // Show inputs based on selection
    if (type === 'full' || type === 'partial') {
        additionalInputs.innerHTML += `
            <select id="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select id="nationality">
                <option value="">Select Nationality</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Chinese">Chinese</option>
                <option value="Korean">Korean</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Japanese">Japanese</option>
            </select>
        `;
    } else if (type === 'randomNames') {
        additionalInputs.innerHTML += `
            <select id="genderForNames">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <select id="nationalityForNames">
                <option value="">Select Nationality</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Canadian">Canadian</option>
            </select>
            <input type="range" id="numberOfNames" min="1" max="20" value="10" oninput="this.nextElementSibling.value = this.value">
            <output>10</output>
        `;
    } else if (type === 'nameMatching') {
        additionalInputs.innerHTML += `
            <input type="text" id="lastName" placeholder="Last Name">
            <input type="number" id="numberOfMatches" placeholder="Number of Matches (e.g., 10)">
        `;
    }
});

document.getElementById('generateButton').addEventListener('click', function() {
    const type = document.getElementById('generationType').value;
    const nationality = document.getElementById('nationality')?.value || document.getElementById('nationalityForNames')?.value;
    const gender = document.getElementById('gender')?.value || document.getElementById('genderForNames')?.value;
    const numberOfNames = document.getElementById('numberOfNames').value;
    const lastName = document.getElementById('lastName')?.value;
    const numberOfMatches = document.getElementById('numberOfMatches')?.value;

    // Load the CSV file and generate names based on selections
    Papa.parse('names.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            let output = '';

            if (type === 'fullProfile' || type === 'partialProfile') {
                // Generate a full or partial profile
                const filteredData = data.filter(item => item.Nationality === nationality && item.Gender === gender);
                if (filteredData.length > 0) {
                    const randomItem = filteredData[Math.floor(Math.random() * filteredData.length)];
                    output = `Generated Profile: ${randomItem.Name}`;
                } else {
                    output = 'No matching profiles found.';
                }
            } else if (type === 'randomNames') {
                // Generate random names
                const filteredData = data.filter(item => item.Nationality === nationality && item.Gender === gender);
                const names = [];
                for (let i = 0; i < numberOfNames; i++) {
                    const randomItem = filteredData[Math.floor(Math.random() * filteredData.length)];
                    if (randomItem) names.push(randomItem.Name);
                }
                output = `Random Names: ${names.join(', ')}`;
            } else if (type === 'nameMatching') {
                // Generate names matching the last name
                const filteredData = data.filter(item => item.Nationality === nationality && item.Name.endsWith(lastName));
                const names = [];
                for (let i = 0; i < numberOfMatches; i++) {
                    const randomItem = filteredData[Math.floor(Math.random() * filteredData.length)];
                    if (randomItem) names.push(randomItem.Name);
                }
                output = `Matching Names: ${names.join(', ')}`;
            }

            document.getElementById('output').innerText = output;
        }
    });
});
