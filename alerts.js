document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swal === "undefined") {
    console.error("SweetAlert2 is not loaded.");
    return;
  }

  const f1Alert = Swal.mixin({
    customClass: {
      popup: "f1-swal-popup",
      confirmButton: "f1-swal-button",
      cancelButton: "f1-swal-cancel"
    },
    buttonsStyling: false
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      // IMPORTANT: stop the POST request causing the 405 error
      event.preventDefault();
      event.stopPropagation();

      const isRegister = !!form.querySelector("#firstname");
      const email = form.querySelector("#email")?.value.trim() || "";
      const password = form.querySelector("#password")?.value || "";

      if (!email || !password) {
        await f1Alert.fire({
          icon: "warning",
          title: "Missing details",
          text: "Please enter your email address and password.",
          confirmButtonText: "Try again"
        });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await f1Alert.fire({
          icon: "error",
          title: "Invalid email",
          text: "Please enter a valid email address.",
          confirmButtonText: "OK"
        });
        return;
      }

      if (isRegister) {
        const firstName = form.querySelector("#firstname")?.value.trim();
        const lastName = form.querySelector("#lastname")?.value.trim();
        const dob = form.querySelector("#dob")?.value;
        const country = form.querySelector("#country")?.value;
        const passwordValid =
          password.length >= 8 &&
          password.length <= 30 &&
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[0-9]/.test(password) &&
          /[!@#%^&+=-]/.test(password);

        if (!firstName || !lastName || !dob || !country) {
          await f1Alert.fire({
            icon: "warning",
            title: "Incomplete registration",
            text: "Please complete all required fields.",
            confirmButtonText: "OK"
          });
          return;
        }

        if (!passwordValid) {
          await f1Alert.fire({
            icon: "error",
            title: "Weak password",
            text: "Use 8–30 characters, uppercase and lowercase letters, a number, and one allowed special character.",
            confirmButtonText: "Try again"
          });
          return;
        }

        await f1Alert.fire({
          icon: "success",
          title: "Validation successful!",
          text: "Your registration details are valid.",
          confirmButtonText: "Great!"
        });
      } else {
        await f1Alert.fire({
          icon: "info",
          title: "Sign-in form validated",
          text: "Your details have been checked.",
          confirmButtonText: "OK"
        });
      }
    });
  });
});