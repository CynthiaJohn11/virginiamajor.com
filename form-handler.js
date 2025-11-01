function handleSubmit(event) {
    alert('Form submitted!');
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-submission-message');

    // Required by Netlify for AJAX/Fetch submissions
    formData.append('form-name', form.getAttribute('name')); 

    // Use Fetch API to submit data to the Netlify endpoint
    fetch('/', {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (response.ok) {
            // SUCCESS: Display the "Sent" message
            messageDiv.innerHTML = '✅ **Sent**'; 
            form.reset(); // Clear the form fields
        } else {
            // FAILURE: Display an error message
            messageDiv.innerHTML = '❌ Oops! Something went wrong. Please try again.';
        }
    })
    .catch(error => {
        console.error('Submission Error:', error);
        messageDiv.innerHTML = '❌ Error submitting form.';
    });

    return false;

}
