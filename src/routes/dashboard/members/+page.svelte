<!--
    dashboard/members/+page.svelte
    Author: Lin Jiang (@Injng)
    The members page for showing all member information, only accessible to admin.
-->

<script lang="ts">
  import MemberInfo from "$lib/MemberInfo.svelte";
  import type { Member } from "$lib/types";
  import { invalidateAll } from '$app/navigation';

  let { data } = $props();

  let showPopup = $state(false);
  let selectedMember = $state<Member | null>(null);
  let graduatedYear: number = new Date().getFullYear();

  // function to open the popup by toggling the state
  function openPopup(member: Member) {
    selectedMember = member;
    showPopup = true;
  }

  // function to close the popup by toggling the state
  function closePopup() {
    showPopup = false;
    selectedMember = null;
  }

  // handle Escape key to close popup
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showPopup) {
      closePopup();
    }
  }

  // graduates the selected member with the input year
  async function graduateMember() {
    const { error } = await data.supabase
          .from('members')
          .update({ graduated: graduatedYear })
          .eq('email', selectedMember?.email)
          .select();
    if (error) {
      console.error(error);
    } else {
      await invalidateAll();
      closePopup();
    }
  }
</script>

<svelte:head>
  <title>Members - Dashboard - BAYMS</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="px-10 sm:px-52 pt-5">
  <div class="text-2xl text-white">
    Members
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
    {#each data.memberData as member}
      <MemberInfo {member} handleClick={openPopup} />
    {/each}
  </div>
</div>

{#if showPopup && selectedMember}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-form border border-muted-b max-w-2xl w-full max-h-[90vh] overflow-y-auto 
                text-white font-serif relative">
      {#if !selectedMember.graduated}
        <div class="border-b border-muted-b py-3 px-5 grid grid-cols-[60%_40%] items-center">
          <h2 class="text-lg font-bold">{selectedMember.name}</h2>
          <div class="flex gap-4 justify-between items-center">
            <input type="number" min="1900" max="2199" step="1" bind:value={graduatedYear}
                   class="border border-muted-b bg-input" />
            <button type="button" onclick={graduateMember} 
                    class="border border-emerald-900 hover:border-emerald-800 p-2 pl-4 pr-4
                           hover:bg-emerald-700 text-white font-bold w-32">
              Graduate
            </button>
            <button type="button" onclick={closePopup}
                    class="text-white hover:text-emerald-400 text-2xl font-bold px-2 py-1">
              &times;
            </button>
          </div>
        </div>
      {:else}
        <div class="border-b border-muted-b py-3 px-5 flex justify-between items-center">
          <h2 class="text-lg font-bold">{selectedMember.name}</h2>
          <button type="button" onclick={closePopup}
                  class="text-white hover:text-emerald-400 text-2xl font-bold px-2 py-1">
            &times;
          </button>
        </div>
      {/if}
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if selectedMember.picture}
          <img src={selectedMember.picture} alt="{selectedMember.name}'s picture" 
               class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border border-muted-b 
                      bg-slate-700" />
                    {/if}
                    <div>
                      <h3 class="font-semibold text-base mb-1">Contact Info</h3>
                      <p><span class="font-bold">Email:</span> {selectedMember.email || 'N/A'}</p>
                      <p><span class="font-bold">Phone:</span> {selectedMember.phone || 'N/A'}</p>
                    </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Personal Info</h3>
          <p>
            <span class="font-bold">Birthday:</span> 
            {selectedMember.birthday ? new Date(selectedMember.birthday).toLocaleDateString() : 'N/A'}
          </p>
          <p><span class="font-bold">Grade:</span> {selectedMember.grade || 'N/A'}</p>
          <p><span class="font-bold">School:</span> {selectedMember.school || 'N/A'}</p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Address</h3>
          <p>{selectedMember.street || 'N/A'}</p>
          <p>{selectedMember.city || 'N/A'}, 
            {selectedMember.state || 'N/A'} {selectedMember.zip || 'N/A'}
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Music</h3>
          <p><span class="font-bold">Instruments:</span> 
            {selectedMember.instruments ? selectedMember.instruments.join(', ') : 'N/A'}
          </p>
        </div>
        {#if selectedMember.bio}
        <div class="md:col-span-2">
          <h3 class="font-semibold text-base mb-1">Bio</h3>
          <p class="whitespace-pre-wrap">{selectedMember.bio}</p>
        </div>
        {/if}
        {#if selectedMember.parent1name || selectedMember.parent1email || selectedMember.parent1phone}
        <div>
          <h3 class="font-semibold text-base mb-1">Parent/Guardian 1</h3>
          <p><span class="font-bold">Name:</span> {selectedMember.parent1name || 'N/A'}</p>
          <p><span class="font-bold">Email:</span> {selectedMember.parent1email || 'N/A'}</p>
          <p><span class="font-bold">Phone:</span> {selectedMember.parent1phone || 'N/A'}</p>
        </div>
        {/if}
        {#if selectedMember.parent2name || selectedMember.parent2email || selectedMember.parent2phone}
        <div>
          <h3 class="font-semibold text-base mb-1">Parent/Guardian 2</h3>
          <p><span class="font-bold">Name:</span> {selectedMember.parent2name || 'N/A'}</p>
          <p><span class="font-bold">Email:</span> {selectedMember.parent2email || 'N/A'}</p>
          <p><span class="font-bold">Phone:</span> {selectedMember.parent2phone || 'N/A'}</p>
        </div>
        {/if}
      </div>
      <div class="w-full flex justify-end p-4 pt-0">
        <button type="button" onclick={closePopup} 
                class="border border-emerald-900 hover:border-emerald-800 p-2 bg-emerald-800 
                       hover:bg-emerald-700 text-white font-bold w-32">
          Close
        </button>
      </div>
    </div>
  </div>
{/if}
