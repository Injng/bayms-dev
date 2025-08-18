<!--
    dashboard/recordings/+page.svelte
    Author: Lin Jiang (@Injng)
    The recordings page for showing all recordings, as well as adding new recordings per event.
-->

<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { Trash } from "lucide-svelte";

  // get page data loaded from server
  let { data } = $props();

  // load recording form from superforms
  const {
    form: recordingForm,
    errors: recordingErrors,
    constraints: recordingConstraints,
    message: recordingMessage,
    enhance: recordingEnhance,
    submitting: recordingSubmitting,
  } = superForm(data.recordingForm, {
    resetForm: true,
  });

  // load highlight form from superforms
  const {
    form: highlightForm,
    errors: highlightErrors,
    constraints: highlightConstraints,
    message: highlightMessage,
    enhance: highlightEnhance,
    submitting: highlightSubmitting,
  } = superForm(data.highlightForm, {
    resetForm: true,
  });

  // state for selected event
  let selectedEvent: any = $state(null);
  let showAddForm = $state(false);

  // state for highlights
  let showAddHighlightForm = $state(false);

  // format date for display
  function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
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

  // handle event selection for adding recording
  function selectEventForRecording(event: any) {
    selectedEvent = event;
    $recordingForm.event_id = event.id;
    showAddForm = true;
  }

  // cancel adding recording
  function cancelAddRecording() {
    selectedEvent = null;
    showAddForm = false;
    $recordingForm.name = '';
    $recordingForm.description = '';
    $recordingForm.recording_url = '';
    $recordingForm.event_id = 0;
  }

  // get recordings for a specific event
  function getRecordingsForEvent(eventId: number) {
    return data.recordingData.filter((recording: any) => recording.event_id === eventId);
  }

  // format YouTube URL for embedding
  function formatYoutubeLink(url: string) {
    const videoId = url.split('v=')[1];
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }
</script>

<svelte:head>
  <title>Recordings - Dashboard - BAYMS</title>
</svelte:head>

<div class="px-4 md:px-10 lg:px-52 pt-5">
  <div class="text-2xl text-white mb-5">
    Recordings
  </div>

  <!-- Highlights Section -->
  <div class="bg-form border border-muted-b mb-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg flex justify-between items-center">
      <span>Highlights</span>
      <button 
        class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
               bg-emerald-800 hover:bg-emerald-700 text-white transition-all text-sm"
        onclick={() => showAddHighlightForm = !showAddHighlightForm}>
        {showAddHighlightForm ? 'Cancel' : 'Add Highlight'}
      </button>
    </div>
    
    <!-- Add Highlight Form -->
    {#if showAddHighlightForm}
      <div class="pt-3 pb-3 pl-5 pr-5 border-b border-muted-b">
        {#if $highlightMessage}
          <p class="mb-3 text-sm text-white">{$highlightMessage}</p>
        {/if}
        <form method="POST" action="?/add_highlight" use:highlightEnhance>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
              <div>Title</div>
              <div>
                <input 
                  name="name"
                  type="text" 
                  class="border border-muted-b bg-input w-full text-white"
                  placeholder="Highlight title"
                  {...$highlightConstraints.name}
                  bind:value={$highlightForm.name}>
                {#if $highlightErrors.name}
                  <p class="text-red-500 text-xs mt-1">{$highlightErrors.name}</p>
                {/if}
              </div>
            </label>
            <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
              <div>Recording URL</div>
              <div>
                <input 
                  name="recording_url"
                  type="url" 
                  class="border border-muted-b bg-input w-full text-white"
                  placeholder="https://www.youtube.com/watch?v=..."
                  {...$highlightConstraints.recording_url}
                  bind:value={$highlightForm.recording_url}>
                {#if $highlightErrors.recording_url}
                  <p class="text-red-500 text-xs mt-1">{$highlightErrors.recording_url}</p>
                {/if}
              </div>
            </label>
          </div>
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] mb-2 items-start gap-2">
            <div>Description</div>
            <div>
              <textarea 
                name="description"
                class="border border-muted-b bg-input w-full text-white"
                placeholder="Optional description"
                {...$highlightConstraints.description}
                bind:value={$highlightForm.description}></textarea>
              {#if $highlightErrors.description}
                <p class="text-red-500 text-xs mt-1">{$highlightErrors.description}</p>
              {/if}
            </div>
          </label>
          <div class="w-full flex justify-end">
            <button 
              class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                     mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={$highlightSubmitting}>
              {#if $highlightSubmitting}
                Adding...
              {:else}
                Add Highlight
              {/if}
            </button>
          </div>
        </form>
      </div>
    {/if}

    <!-- Highlights Display -->
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if data.highlightData.length === 0}
        <p class="text-gray-400">No highlights added yet. Add some highlights above.</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each data.highlightData as highlight}
            <div class="border border-muted-b p-3 bg-input">
              <div class="flex justify-between items-start mb-2">
                <div class="font-semibold text-white text-sm">{highlight.name}</div>
                <form method="POST" action="?/remove_highlight" style="display: inline;">
                  <input type="hidden" name="highlight_id" value={highlight.id}>
                  <button 
                    type="submit"
                    class="text-red-400 hover:text-red-300 text-sm">
                    <Trash size={16} />
                  </button>
                </form>
              </div>
              {#if highlight.description}
                <div class="text-gray-300 text-xs mb-2">{highlight.description}</div>
              {/if}
              <div class="text-emerald-400 text-xs">
                <a href={highlight.recording_url} target="_blank" rel="noopener noreferrer" class="hover:underline">
                  🔗 View Recording
                </a>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Add Recording Form (shown when event is selected) -->
  {#if showAddForm && selectedEvent}
    <div class="bg-form border border-muted-b mb-5">
      <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
        Add Recording for: {selectedEvent.name}
      </div>
      <div class="pt-3 pb-3 pl-5 pr-5">
        {#if $recordingMessage}
          <p class="mb-3 text-sm text-white">{$recordingMessage}</p>
        {/if}
        <form method="POST" action="?/add_recording" use:recordingEnhance>
          <div class="grid grid-cols-2 gap-5 mb-2">
            <label class="grid grid-cols-[120px_1fr] items-start">
              <div>Recording Name</div>
              <div>
                <input name="name" type="text" class="border border-muted-b bg-input w-full"
                       {...$recordingConstraints.name}
                       bind:value={$recordingForm.name}>
                {#if $recordingErrors.name}
                  <p class="text-red-500 text-xs mt-1">{$recordingErrors.name}</p>
                {/if}
              </div>
            </label>
            <label class="grid grid-cols-[120px_1fr] items-start">
              <div>Recording URL</div>
              <div>
                <input name="recording_url" type="url" class="border border-muted-b bg-input w-full"
                       placeholder="https://example.com/recording.mp3"
                       {...$recordingConstraints.recording_url}
                       bind:value={$recordingForm.recording_url}>
                {#if $recordingErrors.recording_url}
                  <p class="text-red-500 text-xs mt-1">{$recordingErrors.recording_url}</p>
                {/if}
              </div>
            </label>
          </div>
          <label class="grid grid-cols-[120px_1fr] mb-2 items-start">
            <div>Description</div>
            <div>
              <textarea name="description" class="border border-muted-b bg-input w-full"
                        placeholder="Enter recording description (optional)"
                        {...$recordingConstraints.description}
                        bind:value={$recordingForm.description}></textarea>
              {#if $recordingErrors.description}
                <p class="text-red-500 text-xs mt-1">{$recordingErrors.description}</p>
              {/if}
            </div>
          </label>
          <input type="hidden" name="event_id" value={selectedEvent.id}>
          <div class="w-full flex justify-end gap-2">
            <button type="button" 
                    class="border border-gray-600 hover:border-gray-500 p-2 pt-1 pb-1
                           mt-2 bg-gray-700 hover:bg-gray-600 text-white transition-all"
                    onclick={cancelAddRecording}>
              Cancel
            </button>
            <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                           mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={$recordingSubmitting}>
              {#if $recordingSubmitting}
                Adding...
              {:else}
                Add Recording
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <!-- Events Display with Recordings -->
  <div class="bg-form border border-muted-b">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Events and Recordings ({data.eventData.length})
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if data.eventData.length === 0}
        <p class="text-gray-400">No events found. Add events first in the Events page.</p>
      {:else}
        <div class="space-y-6">
          {#each data.eventData as event}
            {@const eventRecordings = getRecordingsForEvent(event.id)}
            <div class="border border-muted-b p-4 bg-input">
              <!-- Event Header -->
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <div class="font-semibold text-white text-lg mb-1">{event.name}</div>
                  <div class="text-emerald-400 text-sm">
                    {formatDate(event.date)}
                    {#if event.time}
                      <span class="text-gray-400 ml-2">at {formatTime(event.time)}</span>
                    {/if}
                  </div>
                  <div class="text-gray-300 text-sm">
                    <span class="text-emerald-400">📍</span> {event.locations.name}
                  </div>
                  {#if event.description}
                    <div class="text-gray-300 text-sm mt-1">{event.description}</div>
                  {/if}
                </div>
                <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                               bg-emerald-800 hover:bg-emerald-700 text-white transition-all text-sm"
                         onclick={() => selectEventForRecording(event)}>
                  Add Recording
                </button>
              </div>

              <!-- Recordings for this event -->
              {#if eventRecordings.length > 0}
                <div class="border-t border-muted-b pt-3">
                  <div class="text-white font-medium mb-2">
                    Recordings ({eventRecordings.length})
                  </div>
                  <div class="space-y-2">
                    {#each eventRecordings as recording}
                      <div class="border border-muted-b p-3 bg-form">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="font-medium text-white">{recording.name}</div>
                            {#if recording.description}
                              <div class="text-gray-300 text-sm mt-1">{recording.description}</div>
                            {/if}
                            <div class="text-emerald-400 text-sm mt-1">
                              <a href={recording.recording_url} target="_blank" rel="noopener noreferrer"
                                 class="hover:underline">
                                🔗 Listen to Recording
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {:else}
                <div class="border-t border-muted-b pt-3">
                  <p class="text-gray-400 text-sm">No recordings yet for this event.</p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
