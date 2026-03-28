<script lang="ts">
	let celsius = $state(0);

	let fahrenheit = $derived.by(() => celsius * 9/5 + 32);

	function temperatureInput(node: HTMLInputElement, params: { value: number; onInput: (value: number) => void }) {
		const updateValue = () => node.value = params.value.toString();
		updateValue();

		const handleInput = (e: Event) => {
			const target = e.target as HTMLInputElement;
			params.onInput(+target.value);
		};

		node.addEventListener('input', handleInput);

		return {
			update(newParams: { value: number; onInput: (value: number) => void }) {
				params = newParams;
				updateValue();
			},
			destroy() {
				node.removeEventListener('input', handleInput);
			}
		};
	}
</script>

<div>
	<label for="celsius">Celsius</label>
	<input
		id="celsius"
		type="number"
		use:temperatureInput={{ value: celsius, onInput: (v) => celsius = v }}
	/>
</div>

<div>
	<label for="fahrenheit">Fahrenheit</label>
	<input
		id="fahrenheit"
		type="number"
		use:temperatureInput={{ value: fahrenheit, onInput: (v) => celsius = (v - 32) * 5/9 }}
	/>
</div>