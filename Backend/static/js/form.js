// ===============================
// Form Validation for Kerala Land Price Predictor
// ===============================

const predictForm = document.getElementById('predictForm');
const predictBtn = predictForm.querySelector('button[type="submit"]');

// ===============================
// Enable/disable submit button based on filled fields
// ===============================
function checkFormValidity() {
    let allFilled = true;

    predictForm.querySelectorAll('input, select').forEach(field => {
        if (field.type === 'button' || field.type === 'submit' || field.hasAttribute('readonly'))
            return;

        if (field.tagName === 'SELECT' && field.value === "") allFilled = false;
        if (field.tagName === 'INPUT' && (!field.value || field.value.trim() === "")) allFilled = false;
    });

    predictBtn.disabled = !allFilled;
}

// Listen to input and select changes
predictForm.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', checkFormValidity);
    field.addEventListener('change', checkFormValidity);
});

// Initial check in case fields are pre-filled
checkFormValidity();

// ===============================
// Form submission validation
// ===============================
predictForm.addEventListener('submit', function (e) {

    let valid = true;

    // Validate all visible fields
    this.querySelectorAll('input, select').forEach(field => {

        if (field.type === 'button' || field.type === 'submit' || field.hasAttribute('readonly'))
            return;

        // SELECT validation
        if (field.tagName === 'SELECT' && field.value === "") {
            valid = false;
            field.classList.add('is-invalid');
            return;
        }

        // INPUT validation
        if (field.tagName === 'INPUT' && (!field.value || field.value.trim() === "")) {
            valid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    // Validate Latitude & Longitude manually entered
    const lat = document.getElementById('latitude').value;
    const lng = document.getElementById('longitude').value;

    if (!lat || !lng) {
        valid = false;
        alert("📍 Please enter Latitude and Longitude manually.");
    }

    // Stop submission if invalid
    if (!valid) {
        e.preventDefault();
        const firstInvalid = this.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return false;
    }

    console.log("✅ Form validation passed. Submitting...");
});
