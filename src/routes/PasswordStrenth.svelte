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

<div>
    <label for="password">Password:</label>
    <input
        id="password"
        type="password"
        bind:value={password}
        oninput={() => strenthPercent = calculateStrength(password)}
    />
    <button onclick={togglePasswordVisibility}>Show Password</button>
    <div style="margin-top: 10px; width: 100%; background: #eee; height: 20px; border-radius: 5px;">
        <div
            style="height: 100%; background: green; border-radius: 5px;"
            style:width={`${strenthPercent}%`}
        ></div>
    </div>
    <p>Password Strength: {strenthPercent}%</p>
</div>