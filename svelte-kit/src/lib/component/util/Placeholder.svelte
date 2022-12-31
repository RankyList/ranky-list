<script lang="ts">
    export let height: number;
    export let animate = true;
</script>

<div class="placeholder" class:animate-pulse={animate} style={`height: ${height}px;`} />
