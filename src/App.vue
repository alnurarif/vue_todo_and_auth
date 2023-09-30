<script setup>



</script>

<template>
	<div class="flex justify-center">
		<div class=" w-full md:w-400 bg-blue-300 p-4">
			<div class="flex justify-center">
				<RouterLink to="/" class="text-white hover:text-gray-200 font-semibold text-lg transition duration-300">
					<div class="text-center bg-blue-500 px-4 py-2 rounded-l-lg border-r border-white hover:bg-blue-700" :class="[$route.name == 'todo' ? 'bg-blue-700' : '']">Todo App</div>
				</RouterLink>

				<RouterLink to="/dashboard" class="text-white hover:text-gray-200 font-semibold text-lg transition duration-300">
					<div class="text-center bg-blue-500 px-4 py-2 rounded-r-lg hover:bg-blue-700" :class="[$route.name != 'todo' ? 'bg-blue-700' : '']">Auth App</div>
				</RouterLink>
			</div>
		</div>
	</div>
	<RouterView />
</template>

<style scoped></style>
