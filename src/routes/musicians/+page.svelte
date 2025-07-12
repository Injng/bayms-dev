<!--
    musicians/+page.svelte
    Author: Lin Jiang (@Injng)
    The website's musicians page for showing all members and alumni.
  -->

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // get page data and extract member data
  let { data } = $props();
  const members = data.memberData;

  // filter members to create a list of alumni (those with a graduation year)
  const alumni = $derived(members.filter(m => m.graduated));

  // filter members to find graduating seniors (grade 12 and not yet graduated)
  const graduatingSeniors = $derived(members.filter(m => m.grade === 12 && !m.graduated));

  // filter for current members (not grade 12 and not graduated)
  const currentMembers = $derived(members.filter(m => m.grade !== 12 && !m.graduated));

  // group alumni by their graduation year
  const alumniByYear = $derived(alumni.reduce((acc, member) => {
    const year = member.graduated;
    if (year) {
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(member);
    }
    return acc;
  }, {} as Record<string, typeof alumni>));

  // get a sorted list of graduation years to display alumni chronologicaly
  const alumniYears = $derived(Object.keys(alumniByYear).sort((a, b) => Number(b) - Number(a)));

  // state to track the currently selected alumni year
  let selectedAlumniYear = $state(alumniYears[0] ?? null);

  // a derived value that holds the list of alumni for the currently selected year
  const selectedAlumni = $derived(selectedAlumniYear ? alumniByYear[selectedAlumniYear] : []);

  // function to update the selected year when a year button is clicked
  function selectYear(year: string) {
    selectedAlumniYear = year;
  }

  // function to get the public URL of the image stored in Supabase Storage
  function getImageUrl(image: string) {
    if (!image) return "";
    const { data: imageData } = data.supabase.storage
          .from('profile-pictures')
          .getPublicUrl(image);
    return imageData.publicUrl;
  }
</script>

<svelte:head>
  <title>Musicians - BAYMS</title>
</svelte:head>

<!-- Header -->
<Header />

<!-- Main Content -->
<div class="relative bg-white font-serif min-h-screen">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
    <div class="relative p-5">
      <div class="text-5xl font-bold pl-60 p-5">MUSICIANS</div>
    </div>
  </div>

  <div class="p-4 md:p-8 lg:p-12">
    <!-- Graduating Seniors & Alumni Section -->
    <section class="mb-12">
      <h2 class="text-4xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-6">Graduating Seniors & Alumni</h2>
      
      <!-- Graduating Seniors -->
      {#if graduatingSeniors.length > 0}
        <h3 class="text-3xl font-semibold text-gray-800 mt-6 mb-4">Graduating Seniors</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each graduatingSeniors as member (member.name)}
            <div class="bg-gray-50 rounded-lg shadow-md flex flex-col overflow-hidden">
              <img src={getImageUrl(member.picture)} alt="Photo of {member.name}"
                   class="w-full object-cover aspect-[3/4]" />
              <div class="p-6 flex flex-col flex-grow">
                <h4 class="text-xl font-bold text-center text-emerald-800">{member.name}</h4>
                <p class="text-center text-gray-600 mb-2">{member.instruments?.join(', ')}</p>
                <p class="text-gray-700 text-sm flex-grow">{member.bio}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Alumni by Year -->
      {#if alumniYears.length > 0}
        <h3 class="text-3xl font-semibold text-gray-800 mt-8 mb-4">Alumni</h3>
        
        <!-- Horizontal year selection tabs -->
        <div class="flex flex-wrap gap-2 mb-6 border-b border-gray-300 pb-2">
          {#each alumniYears as year (year)}
            <button 
              onclick={() => selectYear(year)}
              class="px-4 py-2 rounded-t-lg text-base font-medium transition-colors duration-200"
              class:bg-emerald-700={selectedAlumniYear === year}
              class:text-white={selectedAlumniYear === year}
              class:bg-gray-200={selectedAlumniYear !== year}
              class:text-gray-600={selectedAlumniYear !== year}
              class:hover:bg-gray-300={selectedAlumniYear !== year}
            >
              Class of {year}
            </button>
          {/each}
        </div>

        <!-- Display alumni for the selected year -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each selectedAlumni as member (member.name)}
            <div class="bg-gray-50 rounded-lg shadow-md flex flex-col overflow-hidden">
              <img src={getImageUrl(member.picture)} alt="Photo of {member.name}"
                   class="w-full object-cover aspect-[3/4]" />
              <div class="p-6 flex flex-col flex-grow">
                <h4 class="text-xl font-bold text-center text-emerald-800">{member.name}</h4>
                <p class="text-center text-gray-600 mb-2">{member.instruments?.join(', ')}</p>
                <p class="text-gray-700 text-sm flex-grow">{member.bio}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <!-- Current Members Section -->
    <section>
      <h2 class="text-4xl font-bold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-6">Current Members</h2>
      {#if currentMembers.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each currentMembers as member (member.name)}
            <div class="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
              {#if member.picture !== null}
                <img src={getImageUrl(member.picture)} alt="Photo of {member.name}"
                     class="w-full object-cover aspect-[3/4]" />
              {/if}
              <div class="p-6 flex flex-col flex-grow">
                <h4 class="text-xl font-bold text-center text-emerald-800">{member.name}</h4>
                <p class="text-center text-gray-600 mb-2">{member.instruments?.join(', ')}</p>
                <p class="text-gray-700 text-sm flex-grow">{member.bio}</p>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-600">No current members to display.</p>
      {/if}
    </section>
  </div>
</div>

<!-- Footer -->
<Footer />
