<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { todoStorage } from './util'
import { nanoid } from 'nanoid'

const todos = ref<TodoType[]>([])
const name = ref('')
const input_content = ref('')
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
	if (input_content.value.trim() === '') return

	todos.value.push({
		id: nanoid(10),
		content: input_content.value,
		done: false,
		createdAt: new Date().getTime(),
	})
	input_content.value = ''
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
	todoStorage.set('name', newVal)
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
			<form @submit.prevent="addTodo">
				<h4>what's on your todo list today?</h4>
				<div class="wrapper">
					<input
						type="text"
						placeholder="e.g. study vue3"
						v-model="input_content"
					/>
					<input type="submit" value="ADD" />
				</div>
			</form>
		</section>

		<section class="todo-list">
			<h3>todo list</h3>
			<div class="list">
				<div
					v-for="todo in todos_asc"
					:class="`todo-item ${todo.done && 'done'}`"
				>
					<label>
						<input type="checkbox" v-model="todo.done" />
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
					</div>
					<div class="actions">
						<button class="delete" @click="removeTodo(todo.id)">delete</button>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped>
main {
	max-width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30px auto 0 auto;
}
input {
	background-color: #111;
	font-family: 'Roboto Mono', monospace;
	outline: none;
	border: none;
	padding: 8px;
	border-radius: 0.4em;
	color: #ddd;
}
.wrapper {
	display: flex;
	justify-content: center;
}
h4 {
	display: inline-block;
	padding-bottom: 3px;
	border-bottom: 2px solid #fb7b50;
}
.todo-item {
	display: flex;
	align-items: center;
	margin-top: 10px;
}
.list {
	position: relative;
}
input[type='submit'] {
	background: #fb7b50;
	color: #eee;
	font-weight: 600;
	margin-left: 10px;
}
.check {
	position: absolute;
	top: 0;
	right: 10;
	width: 30px;
	height: 30px;
	margin-right: 10px;
	background-color: #fb7b50;
}
button {
	margin-left: 10px;
	background-color: #3168e0;
	color: #eee;
	letter-spacing: 1px;
	border: none;
	padding: 8px;
	border-radius: 0.4em;
}
</style>
