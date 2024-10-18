document.getElementById('resume-form')!.addEventListener('submit', function (e: Event) {
    e.preventDefault();

    const name: string = (document.getElementById('name') as HTMLInputElement).value;
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const phone: string = (document.getElementById('phone') as HTMLInputElement).value;
    const about: string = (document.getElementById('about') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const education: string = (document.getElementById('education') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const experience: string = (document.getElementById('experience') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const skills: string = (document.getElementById('skills') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const certificates: string = (document.getElementById('certificates') as HTMLTextAreaElement).value.replace(/,/g, '<br>');
    const volunteer: string = (document.getElementById('volunteer') as HTMLTextAreaElement).value.replace(/,/g, '<br>');

    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const profilePic = profilePicInput.files ? profilePicInput.files[0] : null;
    let profilePicUrl: string = '';

    if (profilePic) {
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        reader.onload = function (e) {
            profilePicUrl = e.target!.result as string;
            generateResume(profilePicUrl);
        };
    } else {
        generateResume();
    }

    function generateResume(profilePicUrl: string = '') {
        const resumeContent: string = `
            <div class="resume-header">
                ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture">` : ''}
                <div>
                    <h2>${name}</h2>
                    <p>${email} | ${phone}</p>
                </div>
            </div>
            <div class="resume-section">
                <h3>About</h3>
                <p class="editable-section" data-field="about">${about}</p>
            </div>
            <div class="resume-section">
                <h3>Education</h3>
                <p class="editable-section" data-field="education">${education}</p>
            </div>
            <div class="resume-section">
                <h3>Work Experience</h3>
                <p class="editable-section" data-field="experience">${experience}</p>
            </div>
            <div class="resume-section">
                <h3>Skills</h3>
                <p class="editable-section" data-field="skills">${skills}</p>
            </div>
            <div class="resume-section">
                <h3>Certificates</h3>
                <p class="editable-section" data-field="certificates">${certificates}</p>
            </div>
            <div class="resume-section">
                <h3>Volunteer Experience</h3>
                <p class="editable-section" data-field="volunteer">${volunteer}</p>
            </div>
        `;

        const resumeContainer = document.getElementById('resume-container')!;
        const resumeContentElement = document.getElementById('resume-content')!;

        resumeContentElement.innerHTML = resumeContent;
        resumeContainer.style.display = 'block';

        // Add click-to-edit functionality
        document.querySelectorAll('.editable-section').forEach(section => {
            section.addEventListener('click', handleEdit);
        });
    }

    function handleEdit(e: Event) {
        const target = e.target as HTMLElement;
        const field = target.getAttribute('data-field')!;
        const currentValue = target.innerHTML.replace(/<br>/g, ',');  // Convert <br> to commas for editing

        const inputElement = document.createElement('textarea');
        inputElement.classList.add('editable');
        inputElement.value = currentValue;

        target.replaceWith(inputElement);
        inputElement.focus();  // Automatically focus the input element

        inputElement.addEventListener('blur', () => {
            const updatedValue = inputElement.value.replace(/,/g, '<br>');
            const updatedElement = document.createElement('p');
            updatedElement.classList.add('editable-section');
            updatedElement.setAttribute('data-field', field);
            updatedElement.innerHTML = updatedValue;

            inputElement.replaceWith(updatedElement);

            // Re-apply click-to-edit functionality to the new element
            updatedElement.addEventListener('click', handleEdit);
        });
    }
});
