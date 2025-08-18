<!--
    performances/+page.svelte
    Author: Lin Jiang (@Injng)
    The website's performances page for viewing recorded performances.
  -->

<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";

  // get page data loaded from server
  let { data } = $props();

  // state for navigation and display
  let selectedEvent = $state<any>(null);
  let recordingList = $state<any[]>([]);
  let selectedRecording = $state<any>(null);

  // get recordings for a specific event
  function getRecordingsForEvent(eventId: number) {
    recordingList =
      data.recordingData.filter((recording: any) => recording.event_id === eventId);
  }

  // select an event
  function selectEvent(event: any) {
    selectedEvent = event;
    getRecordingsForEvent(event.id);
    selectedRecording = null; // Reset selected recording when event changes
  }

  // select a recording
  function selectRecording(recording: any) {
    selectedRecording = recording;
  }

  // format youtube link for embedding
  function formatYoutubeLink(url: string) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
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
    
    // Parse the time string (assuming format like "14:30" or "14:30:00")
    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (!timeMatch) return timeString;
    
    const hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return `${displayHours}:${minutes} ${ampm}`;
  }

  // initialize with first event if available
  $effect(() => {
    if (data.eventData && data.eventData.length > 0 && !selectedEvent) {
      selectEvent(data.eventData[0]);
    }
  });
</script>

<svelte:head>
  <title>Performances - BAYMS</title>
</svelte:head>

<!-- Header -->
<Header />

<!-- Main Content -->
<div class="relative bg-white font-serif min-h-screen">
  <!-- Hero Section -->
  <div class="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
    <div class="relative p-5">
      <div class="text-3xl md:text-5xl font-bold px-4 md:pl-60 p-5">PERFORMANCES</div>
    </div>
  </div>

  <!-- Highlights Section -->
  {#if data.highlightData.length > 0}
    <div class="bg-gray-50 py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center">Featured Highlights</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each data.highlightData as highlight}
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <!-- Video Embed -->
              <div class="relative w-full" style="padding-bottom: 56.25%;">
                <iframe 
                  class="absolute top-0 left-0 w-full h-full"
                  src={formatYoutubeLink(highlight.recording_url)}
                  title={highlight.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" 
                  allowfullscreen>
                </iframe>
              </div>
              <!-- Video Info -->
              <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-800 mb-2">{highlight.name}</h3>
                {#if highlight.description}
                  <p class="text-gray-600 text-sm mb-2">{highlight.description}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Content Section -->
  <div class="max-w-7xl mx-auto p-4 md:p-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
      <!-- Event List -->
      <div class="lg:col-span-3">
        <div class="bg-gray-50 rounded-lg p-4 md:p-6 h-fit">
          <div class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Events</div>
          <div class="space-y-3">
            {#each data.eventData as event}
              <button 
                class="w-full text-left p-3 md:p-4 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 {selectedEvent?.id === event.id ? 'bg-white shadow-md border-gray-200' : 'hover:bg-gray-100'}"
                onclick={() => selectEvent(event)}
              >
                <div class="font-semibold text-base md:text-lg text-gray-800 mb-1">{event.name}</div>
                <div class="text-sm text-emerald-600 font-medium mb-2">
                  {formatDate(event.date)}
                </div>
                {#if event.locations?.name}
                  <div class="text-sm text-gray-600 flex items-center">
                    <span class="text-emerald-600 mr-1">📍</span> {event.locations.name}
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <!-- Video List -->
      <div class="lg:col-span-3">
        <div class="bg-gray-50 rounded-lg p-4 md:p-6 h-fit">
          <div class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Videos</div>
          {#if recordingList.length > 0}
            <div class="space-y-3">
              {#each recordingList as recording}
                <button 
                  class="w-full text-left p-3 md:p-4 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 {selectedRecording?.id === recording.id ? 'bg-white shadow-md border-gray-200' : 'hover:bg-gray-100'}"
                  onclick={() => selectRecording(recording)}
                >
                  <div class="font-semibold text-base md:text-lg text-gray-800 mb-2">{recording.name}</div>
                  {#if recording.description}
                    <div class="text-sm text-gray-600 line-clamp-2">{recording.description}</div>
                  {/if}
                  {#if recording.duration}
                    <div class="text-xs text-gray-500 mt-2">Duration: {recording.duration}</div>
                  {/if}
                </button>
              {/each}
            </div>
          {:else}
            <div class="text-gray-500 text-center py-8">
              {#if selectedEvent}
                No videos available for this event
              {:else}
                Select an event to view videos
              {/if}
            </div>
          {/if}
        </div>
      </div>

      <!-- Video Player -->
      <div class="lg:col-span-6">
        <div class="bg-gray-50 rounded-lg p-4 md:p-6">
          <div class="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Video Player</div>
          <div class="space-y-6">
            {#if selectedRecording}
              <!-- Video Embed -->
              <div class="relative w-full" style="padding-bottom: 56.25%;">
                <iframe 
                  class="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={formatYoutubeLink(selectedRecording.recording_url)}
                  title={selectedRecording.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" 
                  allowfullscreen>
                </iframe>
              </div>
              
              <!-- Video Details -->
              <div class="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-3">{selectedRecording.name}</h3>
                {#if selectedRecording.description}
                  <p class="text-gray-600 mb-4">{selectedRecording.description}</p>
                {/if}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {#if selectedEvent}
                    <div>
                      <span class="font-semibold text-gray-700">Event:</span>
                      <div class="text-gray-600">{selectedEvent.name}</div>
                    </div>
                    <div>
                      <span class="font-semibold text-gray-700">Date:</span>
                      <div class="text-gray-600">{formatDate(selectedEvent.date)}</div>
                    </div>
                    {#if selectedEvent.locations?.name}
                      <div class="md:col-span-2">
                        <span class="font-semibold text-gray-700">Location:</span>
                        <div class="text-gray-600">{selectedEvent.locations.name}</div>
                      </div>
                    {/if}
                  {/if}
                  {#if selectedRecording.duration}
                    <div>
                      <span class="font-semibold text-gray-700">Duration:</span>
                      <div class="text-gray-600">{selectedRecording.duration}</div>
                    </div>
                  {/if}
                </div>
              </div>
            {:else}
              <!-- Empty State -->
              <div class="bg-white rounded-lg p-8 md:p-12 text-center shadow-sm">
                <div class="text-4xl md:text-6xl mb-4">🎵</div>
                <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-2">No Video Selected</h3>
                <p class="text-gray-600">
                  {#if selectedEvent}
                    Choose a video from the list to start watching
                  {:else}
                    Select an event to view available videos
                  {/if}
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Footer -->
<Footer />
