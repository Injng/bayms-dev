<!--
    $lib/MemberInfo.svelte
    Author: Lin Jiang (@Injng)
    A card for showing a summary of member information under the members dashboard tab.
-->

<script lang="ts">
  import type { Member } from "./types";

  let { member, handleClick }: { member: Member, handleClick: (member: Member) => void } = $props();
</script>

<button type="button" class="border border-muted-b w-2xs p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-150 text-left bg-transparent flex flex-col items-start" 
        onclick={() => handleClick(member)}>
  <h1 class="font-bold text-xl text-white mb-4 w-full pb-2">{member.name}</h1>
  <div>
    {#if member.email}
      <p>{member.email}</p>
    {/if}
    {#if member.phone}
      <p>{member.phone}</p>
    {/if}
    {#if member.grade}
      <p>Grade {member.grade}</p>
    {/if}
    {#if member.instruments}
      <p>{member.instruments}</p>
    {/if}
  </div>
</button>

