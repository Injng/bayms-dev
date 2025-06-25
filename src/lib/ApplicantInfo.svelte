<!--
    $lib/ApplicantInfo.svelte
    Author: Lin Jiang (@Injng)
    A card for showing a summary of applicant information with approve and reject buttons.
  -->

<script lang="ts">
  import type { Member } from "./types";

  let { member, handleClick, handleApprove, handleReject }:
      { member: Member,
        handleClick: (member: Member) => void,
        handleReject: (member: Member) => void,
        handleApprove: (member: Member) => void } = $props();
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
<div class="flex justify-center w-2xs">
  <button 
    type="button" 
    class="bg-constructive hover:bg-link text-white font-bold py-2 px-4 transition-colors
           duration-150 flex items-center justify-center flex-1"
    onclick={() => handleApprove(member)}
    >
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0
               011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd">
      </path>
    </svg>
    Approve
  </button>
  <button 
    type="button" 
    class="bg-destructive hover:bg-destructive-600 text-white font-bold py-2 px-4
           transition-colors duration-150 flex items-center justify-center flex-1"
    onclick={() => handleReject(member)}
    >
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0
                                   111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414
                                   1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586
                                   10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
      </path>
    </svg>
    Reject
  </button>
</div>

