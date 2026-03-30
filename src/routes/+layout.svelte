<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import 'iconify-icon';
	import './global.css';

	import { Nav } from '$lib';

	let { children } = $props();
	let theme = $state<'light' | 'dark'>('dark');

	const toggleTheme = () => {
		theme = theme === 'dark' ? 'light' : 'dark';
	};

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('theme');
			if (saved === 'light' || saved === 'dark') {
				theme = saved;
			} else {
				theme = 'dark';
			}
		}
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = theme;
		}
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('theme', theme);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex items-center justify-between gap-3 px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)]">
	<Nav />
	<button
		aria-label="Toggle theme"
		class="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-semibold hover:bg-[var(--bg)] transition"
		onclick={toggleTheme}
	>
		{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
	</button>
</header>

<main>
	{@render children()}
</main>