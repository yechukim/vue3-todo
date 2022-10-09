<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { todoStorage } from './util'
import { nanoid } from 'nanoid'

const todos: any = ref([])
const name = ref('')
const input_content = ref('')
const input_category = ref(null)
const todos_asc = computed(() =>
	todos.value.sort((a: any, b: any) => {
		return b.createdAt - a.createdAt
	})
)
onMounted(() => {
	name.value = localStorage.getItem('name') || ''
	todos.value = todoStorage.get('@todos')
})

const addTodo = () => {
	if (input_content.value.trim() === '' || input_category.value === null) return

	todos.value.push({
		id: nanoid(10),
		content: input_content.value,
		category: input_category.value,
		done: false,
		createdAt: new Date().getTime(),
	})
}

const removeTodo = (id: string) => {
	todos.value = todos.value.filter((todo: any) => todo.id !== id)
}
watch(
	todos,
	(newVal) => {
		todoStorage.set('@todos', newVal)
	},
	{ deep: true }
)

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})
</script>

<template>
	<main class="app">
		<section class="greeting">
			<h2 class="title">
				what's up,
				<input type="text" placeholder="lovely user" v-model="name" />
			</h2>
		</section>
		<section class="create-todo">
			<h3>CREATE A TODO</h3>
			<form @submit.prevent="addTodo">
				<h4>what's on your todo list?</h4>
				<input
					type="text"
					placeholder="e.g. study vue3"
					v-model="input_content"
				/>
				<h4>pick a category</h4>
				<div class="options">
					<label>
						<input
							type="radio"
							name="category"
							value="business"
							v-model="input_category"
						/>
						<span class="bubble business"></span>
						<div>business</div>
					</label>

					<label>
						<input
							type="radio"
							name="category"
							value="business"
							v-model="input_category"
						/>
						<span class="bubble personal"></span>
						<div>personal</div>
					</label>
				</div>
				<input type="submit" value="add todo" />
			</form>
		</section>

		<setion class="todo-list">
			<h3>todo list</h3>
			<div class="list">
				<div
					v-for="todo in todos_asc"
					:class="`todo-item ${todo.done && 'done'}`"
				>
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${todo.category}`"> </span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
					</div>
					<div class="actions">
						<button class="delete" @click="removeTodo(todo.id)">delete</button>
					</div>
				</div>
			</div>
		</setion>
	</main>
</template>

<style scoped>
.options {
	display: flex;
	justify-content: space-evenly;
}
</style>
