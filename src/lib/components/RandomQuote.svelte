<script lang="ts">
  import { PUBLIC_NINJA_QUOTES_API } from '$env/static/public'

    import { onMount } from "svelte";

    let quote = $state({ quote: "", author: "" });

    onMount(async () => {
        const response = await fetch("https://api.api-ninjas.com/v2/quotes?categories=success,wisdom", {
            headers: {
                "X-Api-Key": PUBLIC_NINJA_QUOTES_API
            }        });
        const data = await response.json();
        quote = data[0];
    });
</script>

<section class="card">
    <h2 class="card-header">Daily Quote</h2>
    <div class="card-field">
        <p class="text-lg italic text-[var(--text)]">"{quote.quote || 'Fetching quote...'}"</p>
        <p class="mt-2 text-sm text-[var(--muted)]">- {quote.author || 'Loading...'}</p>
    </div>
</section>