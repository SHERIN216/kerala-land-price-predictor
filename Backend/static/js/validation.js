const predictForm = document.getElementById('predictForm');

predictForm.addEventListener('submit', function (e) {

    let valid = true;

    // 🔹 Validate visible fields only
    this.querySelectorAll('input, select').forEach(field => {

        if (
            field.type === 'hidden' ||
            field.type === 'button' ||
            field.type === 'submit' ||
            field.hasAttribute('readonly')
        ) return;

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

    // 🔹 Validate map coordinates
    const lat = document.getElementById('latitude').value;
    const lng = document.getElementById('longitude').value;

    if (!lat || !lng) {
        valid = false;
        alert("📍 Please select a location on the map or auto-detect.");
    }

    // ❌ Stop submission if invalid
    if (!valid) {
        e.preventDefault();

        const firstInvalid = this.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();

        return false;
    }

    // ✅ Allow form to submit normally
    console.log("✅ Form validation passed. Submitting...");
});
