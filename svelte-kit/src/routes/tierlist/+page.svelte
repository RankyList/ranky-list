<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.tierLists as tierList}
  <span>{ tierList.name }</span>
{:else}
  <span>No tier list found.</span>
{/each}
