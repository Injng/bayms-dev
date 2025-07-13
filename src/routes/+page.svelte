<!-- 
     +page.svelte
     Author: Lin Jiang (@Injng)
     The website's homepage, containing About Us and Join Us content as well as hero.
  -->

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // get page data loaded from server
  let { data } = $props();

  // the gap of the header from the document side
  let headerGap = $state(40);

  /**
   * Calculates the gap of the header based on scroll distance
   */
  function calcHeader() {
    headerGap = Math.round(scrollY < 1000 ? 40 - scrollY / 1000 * 40 : 0);
  }

  // format date for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // format time for display
  function formatTime(timeString: string | null): string {
    if (!timeString) return '';
    return timeString;
  }

  // state for audition dropdown
  let showAuditions = $state(false);
</script>

<svelte:head>
  <title>BAYMS - Home</title>
</svelte:head>

<svelte:window on:scroll={calcHeader} />

<div class="relative">
  <!-- Hero -->
  <div class="relative w-screen h-screen">
    <video class="relative object-cover w-full h-full" autoplay muted loop>
      <source src="hero.mp4" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center font-serif px-4">
      <div class="text-white text-2xl md:text-5xl font-bold text-center">
        Bay Area Youth Music Society
      </div>
      <a href="/#about" class="text-white mt-10 pl-5 pr-5 p-2 outline-1 outline-white outline">
        Learn more
      </a>
    </div>
  </div>
  
  <!-- Header -->
  <Header {headerGap} />

  <!-- About -->
  <div id="about" class="relative flex flex-col font-serif bg-black/60">
    <div class="relative flex flex-col mt-20 md:mt-40 mb-20 md:mb-40 px-6 md:px-80 p-5 text-white">
      <div class="text-3xl md:text-5xl font-bold pb-5">ABOUT US</div>
      <div class="pb-2 text-lg md:text-xl">
        BAYMS, 501(c)(3) Public Charity EIN# 74-3247617, is a
        non-profit volunteer organization that brings together youth
        from the Bay Area. We are dedicated to nurturing and enhancing
        children's musical talents by involving them in various
        community service activities. By participating in services,
        our younger members improve their musical abilities and learn
        the significance of giving back to our community.
      </div>
      <div class="text-lg md:text-xl">
        At BAYMS, we offer opportunities for children to perform,
        collaborate, and grow as musicians. We host events such as
        concerts, workshops, and masterclasses that connect them with
        diverse audiences and causes. Our mission is to educate young
        musicians and encourage community engagement to allow them to
        develop their skills while making meaningful contributions to
        society.
      </div>
    </div>
  </div>

  <!-- Upcoming Events -->
  <div class="relative flex flex-col font-serif bg-white">
    <div class="relative flex flex-col mt-10 md:mt-20 mb-10 md:mb-20 px-6 md:px-80 p-5 text-black">
      <div class="text-3xl md:text-5xl font-bold pb-5">UPCOMING EVENTS</div>
      {#if data.upcomingEvents && data.upcomingEvents.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each data.upcomingEvents as event}
            <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div class="mb-3">
                <div class="font-semibold text-lg text-black mb-2">{event.name}</div>
                <div class="text-emerald-600 text-sm font-medium">
                  {formatDate(event.date)}
                  {#if event.time}
                    <div class="text-gray-600 mt-1">at {formatTime(event.time)}</div>
                  {/if}
                </div>
              </div>
              <div class="text-gray-700 mb-3">
                <span class="text-emerald-600">📍</span> {event.locations.name}
              </div>
              {#if event.description}
                <div class="text-gray-600 text-sm">{event.description}</div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-lg md:text-xl text-gray-600">
          No upcoming events at the moment. Check back soon for new events and performances!
        </div>
      {/if}
    </div>
  </div>

  
  <!-- Join -->
  <div class="relative flex flex-col font-serif bg-black/60">
    <div class="relative flex flex-col mt-20 md:mt-40 mb-20 md:mb-40 px-6 md:px-80 p-5 text-white">
      <div class="text-3xl md:text-5xl font-bold pb-5">JOIN US</div>
      <div class="pb-8 text-lg md:text-xl">
        We are always on the lookout for talented musicians to join
        us. If you're interested in auditioning, please review the
        information below.
      </div>
      
      <!-- Auditions Section -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 pl-8 pr-8 border border-white/20">
        <button 
          class="w-full flex items-center justify-between text-left"
          onclick={() => showAuditions = !showAuditions}
        >
          <div class="text-2xl md:text-3xl font-bold text-emerald-400">Requirements</div>
          <div class="text-emerald-400 text-2xl transition-transform duration-300 ease-in-out" class:rotate-180={showAuditions}>
            ▼
          </div>
        </button>
        
        <div 
          class="overflow-hidden transition-all duration-500 ease-in-out"
          class:max-h-0={!showAuditions}
          class:max-h-[2000px]={showAuditions}
        >
          <div class="mt-6 pt-6 border-t border-white/20">
            <div class="text-lg md:text-xl pb-6">
              Candidates should be technically proficient in their target instrument, with several years of private lessons. See below for specific requirements.
            </div>
            
            <!-- Instrument Categories -->
            <div class="space-y-8">
              <!-- Piano -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <div class="text-xl md:text-2xl font-bold pb-4 text-emerald-300">Piano</div>
                <ul class="space-y-2 text-lg">
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 four-octave scale in any key</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 five-minute solo piece</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>Sight reading will be tested</span>
                  </li>
                </ul>
              </div>
              
              <!-- Strings -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <div class="text-xl md:text-2xl font-bold pb-4 text-emerald-300">Strings</div>
                <div class="text-lg mb-4 text-emerald-200">ABRSM Grade 7 or CM Level 8</div>
                <ul class="space-y-2 text-lg">
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 major and 1 minor three-octave scale</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 unaccompanied solo piece (1 movement from a standard concerto, Bach sonata/partita, or 1 full showpiece)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 BAYMS excerpt (will be provided prior to audition)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>Sight reading will be tested</span>
                  </li>
                </ul>
              </div>
              
              <!-- Woodwinds -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <div class="text-xl md:text-2xl font-bold pb-4 text-emerald-300">Woodwinds</div>
                <ul class="space-y-2 text-lg">
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 chromatic scale demonstrating full range, slurred and with articulated tonguing</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 unaccompanied solo piece (1 movement from a standard concerto, Bach sonata/partita, or 1 full showpiece)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 BAYMS excerpt (will be provided prior to audition)</span>
                  </li>
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>Sight reading will be tested</span>
                  </li>
                </ul>
              </div>
              
              <!-- Choir -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <div class="text-xl md:text-2xl font-bold pb-4 text-emerald-300">Choir</div>
                <ul class="space-y-2 text-lg">
                  <li class="flex items-start">
                    <span class="text-emerald-400 mr-3 mt-1">•</span>
                    <span>1 song</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Apply Button -->
      <div class="mt-8 text-center">
        <a 
          href="/apply" 
          class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg"
        >
          Apply Now
        </a>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer />
</div>
