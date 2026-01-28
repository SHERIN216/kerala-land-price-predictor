// ===============================
// Form validation for Predict button
// ===============================

const predictBtn = document.querySelector('.btn-success'); // updated button class

function checkFormValidity() {
    const form = document.getElementById('predictForm');
    let allFilled = true;

    // Check all input and select fields
    form.querySelectorAll('input, select').forEach(field => {
        // Ignore buttons
        if (field.type === 'button' || field.type === 'submit' || field.hasAttribute('readonly'))
            return;

        if (field.tagName === 'SELECT' && field.value === "") allFilled = false;
        if (field.tagName === 'INPUT' && (!field.value || field.value.trim() === "")) allFilled = false;
    });

    predictBtn.disabled = !allFilled;
}

// ===============================
// Listen to form input changes
// ===============================
document.querySelectorAll('#predictForm input, #predictForm select').forEach(field => {
    field.addEventListener('input', checkFormValidity);
    field.addEventListener('change', checkFormValidity);
});

// ✅ Initial check in case some fields are pre-filled
checkFormValidity();
