import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	const users = ref([])
	const currentUser = ref(null)
	const registerFieldsError = ref({
		email: '',
		password: '',
		confirm_password: ''
	})
	const loginError = ref("")

	const registerUser = (user) => {
		// Validate email and password, and check for duplicate email
		const isValid = validateUser(user);

		if (isValid) {
			users.value.push({ ...user });
			localStorage.setItem('users', JSON.stringify(users.value))
			registerFieldsError.value = {
				email: '',
				password: '',
				confirm_password: ''
			}
		} else {
			return false
		}

		return true;
	}
	const loginUser = (credentials) => {
		// Find user by email and validate password
		const user = users.value.find((u) => u.email === credentials.email);

		if (user && user.password === credentials.password) {
			console.log('camp')
			currentUser.value = user;
			localStorage.setItem('loggedInUser', JSON.stringify(user))
			return true;
		}
		loginError.value = "Email & password didn't match"
		return false;
	}

	const logoutUser = () => {
		localStorage.removeItem('loggedInUser')
		currentUser.value = null;
	}

	const validateUser = (user) => {
		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(user.email)) {
			registerFieldsError.value.email = "Enter a valid email"
			return false;
		}

		// Check for duplicate email
		if (users.value.find((u) => u.email === user.email)) {
			registerFieldsError.value.email = "This email already exists"
			return false;
		}

		if (user.password == "") {
			registerFieldsError.value.password = "Password must be provided"
			return false;
		}

		// Check if passwords match
		if (user.password !== user.confirm_password) {
			registerFieldsError.value.password = "Confirm password doesn't match"
			return false;
		}
		return true;
	}

	const isAuthenticated = () => {
		return (localStorage.getItem('loggedInUser') !== null) ? true : false;
	}

	return {
		users, registerFieldsError, isAuthenticated, currentUser, registerUser, loginUser, logoutUser, validateUser
	}

});
