const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector(".feedback-form");

let formData = {
  email: "",
  message: "",
};

// Restore saved state on load
const savedState = localStorage.getItem(STORAGE_KEY);

if (savedState) {
  try {
    const parsedState = JSON.parse(savedState);

    formData = {
      email: parsedState.email ?? "",
      message: parsedState.message ?? "",
    };

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (err) {
    // If storage is corrupted, reset it cleanly
    localStorage.removeItem(STORAGE_KEY);
  }
}

// Save on input (delegation) 
formEl.addEventListener("input", (event) => {
  const { name, value } = event.target;

  // only react to fields we care about
  if (name !== "email" && name !== "message") return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Handle submit
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = { email: "", message: "" };

  formEl.reset();
});
