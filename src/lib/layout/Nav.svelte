<script lang="ts">
	let isOpen = $state(false);
</script>

<nav class="flex items-center justify-between gap-3">
	<div class="flex items-center gap-2">
		<button
			aria-label="menu-toggle"
			onclick={() => (isOpen = !isOpen)}
			class="rounded-md border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text)] hover:bg-[var(--bg)] transition md:hidden"
		>
			<iconify-icon icon="majesticons:menu-line"></iconify-icon>
		</button>
		<span class="text-lg font-bold">Magic Move</span>
	</div>

	<div
		class={`flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm md:static md:flex-row md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${isOpen ? 'block' : 'hidden'} md:block`}
	>
		<a href="/" class="font-medium hover:text-[var(--primary)]">Home</a>
		<a href="/about" class="font-medium hover:text-[var(--primary)]">About</a>
		<a href="/contact" class="font-medium hover:text-[var(--primary)]">Contact</a>
	</div>
</nav>