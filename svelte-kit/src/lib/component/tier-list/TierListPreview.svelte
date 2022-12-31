<script lang="ts">
    import { truncateString } from '$src/lib/mixin/util/truncate';

    import type { TierList } from '@prisma/client';

    export let tierList: TierList;
</script>

<a
    class="
        block
        max-w-sm
        rounded-lg
        border
        border-gray-200
        bg-white
        p-6
        shadow-md
        hover:bg-gray-100
        dark:border-gray-700
        dark:bg-gray-800
        dark:hover:bg-gray-700
    "
    href="/user/tier-list/{tierList.slug}"
>
    <span class="text-lg">{tierList.name}</span>
    {#if tierList.description}
        <p>{truncateString(tierList.description, 100)}</p>
    {/if}
</a>
