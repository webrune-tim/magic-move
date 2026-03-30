<script lang="ts">
    let password = $state("");
    let strenthPercent = $state(0);

    const calculateStrength = (password: string) => {
        let strength = 0;
        if (password.length > 5) strength += 20;
        if (password.length > 10) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        return strength;
    };

    const togglePasswordVisibility = () => {
        const input = document.getElementById('password') as HTMLInputElement;
        input.type = input.type === 'password' ? 'text' : 'password';
    };
</script>

<section class="card">
    <h2 class="card-header">Password Strength</h2>

    <div class="card-field">
        <label class="card-label" for="password">Password</label>
        <input
            id="password"
            type="password"
            class="card-input"
            bind:value={password}
            oninput={() => strenthPercent = calculateStrength(password)}
            placeholder="Enter a strong password"
        />
    </div>

    <div class="flex gap-2 mb-4">
        <button class="card-button" onclick={togglePasswordVisibility}>
            {password ? 'Toggle visibility' : 'Show password'}
        </button>
    </div>

    <div class="card-field">
        <label class="card-label">Strength</label>
        <div class="h-3 rounded-md bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
                class="h-full rounded-md bg-green-500 transition-all"
                style="width: {strenthPercent}%"
            ></div>
        </div>
        <p class="mt-2 text-sm">{strenthPercent}%</p>
    </div>
</section>