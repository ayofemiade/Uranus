// Booking Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Service selection
    const serviceOptions = document.querySelectorAll('.service-option');
    const serviceTypeInput = document.getElementById('service-type');
    const bookingSummary = document.getElementById('booking-summary');

    // Form inputs
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('booking-date');
    const timeInput = document.getElementById('booking-time');

    // Summary elements
    const summaryService = document.getElementById('summary-service');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryContact = document.getElementById('summary-contact');

    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Service option selection
    serviceOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove selected class from all options
            serviceOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            this.classList.add('selected');

            // Set the service type value
            const service = this.getAttribute('data-service');
            serviceTypeInput.value = service;

            // Update summary
            updateSummary();
        });
    });

    // Update summary when form inputs change
    if (fullNameInput) fullNameInput.addEventListener('input', updateSummary);
    if (emailInput) emailInput.addEventListener('input', updateSummary);
    if (phoneInput) phoneInput.addEventListener('input', updateSummary);
    if (dateInput) dateInput.addEventListener('change', updateSummary);
    if (timeInput) timeInput.addEventListener('change', updateSummary);

    function updateSummary() {
        // Check if we have enough information to show summary
        const hasService = serviceTypeInput && serviceTypeInput.value;
        const hasDate = dateInput && dateInput.value;
        const hasTime = timeInput && timeInput.value;
        const hasContact = (fullNameInput && fullNameInput.value) || (emailInput && emailInput.value);

        if (hasService || hasDate || hasTime || hasContact) {
            bookingSummary.style.display = 'block';

            // Update service
            if (hasService) {
                const serviceText = {
                    'buying': 'Property Buying',
                    'selling': 'Property Selling',
                    'consultation': 'Consultation',
                    'viewing': 'Property Viewing'
                };
                summaryService.textContent = serviceText[serviceTypeInput.value] || '-';
            }

            // Update date
            if (hasDate) {
                const date = new Date(dateInput.value);
                summaryDate.textContent = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            // Update time
            if (hasTime) {
                summaryTime.textContent = timeInput.options[timeInput.selectedIndex].text;
            }

            // Update contact
            if (hasContact) {
                summaryContact.textContent = fullNameInput.value || emailInput.value;
            }
        }
    }

    // Form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate service selection
            if (!serviceTypeInput.value) {
                alert('Please select a service type');
                return;
            }

            // Get form data
            const formData = {
                fullName: fullNameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                serviceType: serviceTypeInput.value,
                date: dateInput.value,
                time: timeInput.value,
                propertyInterest: document.getElementById('property-interest').value,
                budgetMin: document.getElementById('budget-min').value,
                budgetMax: document.getElementById('budget-max').value,
                notes: document.getElementById('notes').value
            };

            // Show success message
            showSuccessMessage(formData);

            // Reset form
            bookingForm.reset();
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            bookingSummary.style.display = 'none';
        });
    }

    function showSuccessMessage(data) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'feature-modal';
        modal.innerHTML = `
            <div class="modal-content" style="text-align: center; max-width: 500px;">
                <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div style="margin-bottom: 1.5rem;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary-red);"></i>
                </div>
                <h2 style="margin-bottom: 1rem;">Booking Confirmed!</h2>
                <p style="color: var(--medium-gray); margin-bottom: 1.5rem;">
                    Thank you, ${data.fullName}! Your session has been scheduled for 
                    ${new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
                    at ${data.time}.
                </p>
                <p style="color: var(--medium-gray); margin-bottom: 2rem;">
                    We've sent a confirmation email to <strong>${data.email}</strong>. 
                    Our team will contact you shortly to confirm the details.
                </p>
                <button class="btn" onclick="this.parentElement.parentElement.remove()">
                    Got it!
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Phone number formatting
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
});
