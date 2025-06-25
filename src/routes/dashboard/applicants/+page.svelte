<!--
    dashboard/applicants/+page.svelte
    Author: Lin Jiang (@Injng)
    The applicants page for showing all applicant information, only accessible to admin.
-->

<script lang="ts">
  import { goto } from "$app/navigation";
  import ApplicantInfo from "$lib/ApplicantInfo.svelte";
  import type { Member } from "$lib/types";

  let { data } = $props();

  // states to show members
  let showPopup = $state(false);
  let selectedMember = $state<Member | null>(null);
  let memberData = $state<Member[]>(data.memberData);

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

  // function to handle approve action
  async function handleApprove(member: Member) {
    // get largest id from members table
    let { data: maxIdData, error: maxIdError } = await data.supabase
        .from('members')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
    if (maxIdError) {
      console.error('Error getting largest id from members table:', maxIdError);
      return;
    }
    let maxId = maxIdData![0].id;

    // add member to members table
    let { error: memberError } = await data.supabase.from('members').insert({
      id: maxId + 1,
      ...member
    });
    if (memberError) {
      console.error('Error adding member to members table:', memberError);
      return;
    }

    // remove member from applicants table
    let { error: applicantError } = await data.supabase
        .from('applicants')
        .delete()
        .eq('email', member.email);
    if (applicantError) {
      console.error('Error removing member from applicants table:', applicantError);
      return;
    }

    // change user role to member
    let { error: userError } = await data.supabase
        .from('user_roles')
        .update({ role: 'member' })
        .eq('email', member.email);
    if (userError) {
      console.error('Error updating user role:', userError);
      return;
    }

    // remove applicant from memberData
    memberData = memberData.filter(m => m.email !== member.email);
  }

  // function to handle reject action
  async function handleReject(member: Member) {
    // set rejected to true
    let { error: updateError } = await data.supabase
        .from('applicants')
        .update({ rejected: true })
        .eq('email', member.email);
    if (updateError) {
      console.error('Error updating applicant status:', updateError);
      return;
    }

    // remove applicant from memberData
    memberData = memberData.filter(m => m.email !== member.email);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="px-10 sm:px-52 pt-5">
  <div class="text-2xl text-white">
    Applicants
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
    {#each memberData as member}
      <div class="flex flex-col">
        <ApplicantInfo {member} handleClick={openPopup} {handleApprove} {handleReject} />
      </div>
    {/each}
  </div>
</div>

{#if showPopup && selectedMember}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-form border border-muted-b max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white font-serif relative">
      <div class="border-b border-muted-b py-3 px-5 flex justify-between items-center">
        <h2 class="text-lg font-bold">{selectedMember.name}</h2>
        <button type="button" onclick={closePopup} class="text-white hover:text-emerald-400 text-2xl font-bold px-2 py-1">&times;</button>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if selectedMember.picture}
          <img src={selectedMember.picture} alt="{selectedMember.name}'s picture" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border border-muted-b bg-slate-700" />
        {/if}
        <div>
          <h3 class="font-semibold text-base mb-1">Contact Info</h3>
          <p><span class="font-bold">Email:</span> {selectedMember.email || 'N/A'}</p>
          <p><span class="font-bold">Phone:</span> {selectedMember.phone || 'N/A'}</p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Personal Info</h3>
          <p><span class="font-bold">Birthday:</span> {selectedMember.birthday ? new Date(selectedMember.birthday).toLocaleDateString() : 'N/A'}</p>
          <p><span class="font-bold">Grade:</span> {selectedMember.grade || 'N/A'}</p>
          <p><span class="font-bold">School:</span> {selectedMember.school || 'N/A'}</p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Address</h3>
          <p>{selectedMember.street || 'N/A'}</p>
          <p>{selectedMember.city || 'N/A'}, {selectedMember.state || 'N/A'} {selectedMember.zip || 'N/A'}</p>
        </div>
        <div>
          <h3 class="font-semibold text-base mb-1">Music</h3>
          <p><span class="font-bold">Instruments:</span> {selectedMember.instruments ? selectedMember.instruments.join(', ') : 'N/A'}</p>
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
        <button type="button" onclick={closePopup} class="border border-emerald-900 hover:border-emerald-800 p-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold w-32">Close</button>
      </div>
    </div>
  </div>
{/if}
