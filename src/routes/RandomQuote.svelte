<script lang="ts">
    /// curl -X GET "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom" \
  ///-H "X-Api-Key: 5mLdxVrMdFYGTOZeypgvG3E1kPQ9x10pWFaWAyJy"

  import { NINJA_QUOTES_API } from '$env/static/public'

    import { onMount } from "svelte";

    let quote = $state({ quote: "", author: "" });

    onMount(async () => {
        const response = await fetch("https://api.api-ninjas.com/v2/quotes?categories=success,wisdom", {
            headers: {
                "X-Api-Key": NINJA_QUOTES_API
            }        });
        const data = await response.json();
        quote = data[0];
    });
</script>

<div>
    <p>"{quote.quote}"</p>
    <p>- {quote.author}</p>
</div>