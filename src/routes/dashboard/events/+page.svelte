<!--
    dashboard/events/+page.svelte
    Author: Lin Jiang (@Injng)
    The events page for showing all events and locations, as well as adding new events.
-->

<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { Trash } from 'lucide-svelte';

  // get page data loaded from server
  let { data } = $props();

  // load location form from superforms
  const {
    form: locationForm,
    errors: locationErrors,
    constraints: locationConstraints,
    message: locationMessage,
    enhance: locationEnhance,
    submitting: locationSubmitting,
  } = superForm(data.locationForm, {
    resetForm: true,
  });

  // load event form from superforms
  const {
    form: eventForm,
    errors: eventErrors,
    constraints: eventConstraints,
    message: eventMessage,
    enhance: eventEnhance,
    submitting: eventSubmitting,
  } = superForm(data.eventForm, {
    resetForm: true,
  });

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

  // auto-fill event name and description when location is selected
  function handleLocationChange(locationId: number) {
    if (!locationId) return;
    
    const selectedLocation = data.locationData.find(loc => loc.id === locationId);
    if (!selectedLocation) return;

    // Only auto-fill if the fields are empty
    if (!$eventForm.name) {
      $eventForm.name = selectedLocation.name;
    }
    if (!$eventForm.description && selectedLocation.description) {
      $eventForm.description = selectedLocation.description;
    }
  }

  // handle event deletion
  async function deleteEvent(eventId: number, eventName: string) {
    if (!confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
      return;
    }

    // use supabase to delete the event
    const { error } = await data.supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    if (error) {
      alert('Error deleting event. Please try again.');
    }

    // refresh the page to show updated data
    window.location.reload();
  }

  // handle location deletion
  async function deleteLocation(locationId: number, locationName: string) {
    if (!confirm(`Are you sure you want to delete "${locationName}"? This action cannot be undone.`)) {
      return;
    }

    // use supabase to delete the location
    const { error } = await data.supabase
      .from('locations')
      .delete()
      .eq('id', locationId);
    if (error) {
      alert('Error deleting location. Please try again.');
    }

    // refresh the page to show updated data
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Events - Dashboard - BAYMS</title>
</svelte:head>

<div class="px-4 md:px-10 lg:px-52 pt-5">
  <div class="text-2xl text-white mb-5">
    Locations and Events
  </div>

  <!-- Add Location Form -->
  <div class="bg-form border border-muted-b mb-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Add New Location
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $locationMessage}
        <p class="mb-3 text-sm text-white">{$locationMessage}</p>
      {/if}
      <form method="POST" action="?/add_location" use:locationEnhance>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] mb-2 items-start gap-2">
            <div>Name</div>
            <div>
              <input name="name" type="text" class="border border-muted-b bg-input w-full"
                     {...$locationConstraints.name}
                     bind:value={$locationForm.name}>
              {#if $locationErrors.name}
                <p class="text-red-500 text-xs mt-1">{$locationErrors.name}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] mb-2 items-start gap-2">
            <div>Description</div>
            <div>
              <input name="description" type="text" class="border border-muted-b bg-input w-full"
                     {...$locationConstraints.description}
                     bind:value={$locationForm.description}>
              {#if $locationErrors.description}
                <p class="text-red-500 text-xs mt-1">{$locationErrors.description}</p>
              {/if}
            </div>
          </label>
        </div>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$locationSubmitting}>
            {#if $locationSubmitting}
              Adding...
            {:else}
              Add Location
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Add Event Form -->
  <div class="bg-form border border-muted-b mb-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Add New Event
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $eventMessage}
        <p class="mb-3 text-sm text-white">{$eventMessage}</p>
      {/if}
      <form method="POST" action="?/add_event" use:eventEnhance>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
            <div>Event Name</div>
            <div>
              <input name="name" type="text" class="border border-muted-b bg-input w-full"
                     {...$eventConstraints.name}
                     bind:value={$eventForm.name}>
              {#if $eventErrors.name}
                <p class="text-red-500 text-xs mt-1">{$eventErrors.name}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
            <div>Location</div>
            <div>
              <select name="location_id" class="border border-muted-b bg-input w-full"
                      {...$eventConstraints.location_id}
                      bind:value={$eventForm.location_id}
                      onchange={(e) => handleLocationChange(Number((e.target as HTMLSelectElement).value))}>
                <option value="">Select a location</option>
                {#each data.locationData as location}
                  <option value={location.id}>{location.name}</option>
                {/each}
              </select>
              {#if $eventErrors.location_id}
                <p class="text-red-500 text-xs mt-1">{$eventErrors.location_id}</p>
              {/if}
            </div>
          </label>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
            <div>Date</div>
            <div>
              <input name="date" type="date" class="border border-muted-b bg-input w-full"
                     {...$eventConstraints.date}
                     bind:value={$eventForm.date}>
              {#if $eventErrors.date}
                <p class="text-red-500 text-xs mt-1">{$eventErrors.date}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-2">
            <div>Time</div>
            <div>
              <input name="time" type="time" class="border border-muted-b bg-input w-full"
                     {...$eventConstraints.time}
                     bind:value={$eventForm.time}>
              {#if $eventErrors.time}
                <p class="text-red-500 text-xs mt-1">{$eventErrors.time}</p>
              {/if}
            </div>
          </label>
        </div>
        <label class="grid grid-cols-1 md:grid-cols-[120px_1fr] mb-2 items-start gap-2">
          <div>Description</div>
          <div>
            <textarea name="description" class="border border-muted-b bg-input w-full"
                      placeholder="Enter event description (optional)"
                      {...$eventConstraints.description}
                      bind:value={$eventForm.description}></textarea>
            {#if $eventErrors.description}
              <p class="text-red-500 text-xs mt-1">{$eventErrors.description}</p>
            {/if}
          </div>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$eventSubmitting}>
            {#if $eventSubmitting}
              Adding...
            {:else}
              Add Event
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Locations Display -->
  <div class="bg-form border border-muted-b mb-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Locations ({data.locationData.length})
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if data.locationData.length === 0}
        <p class="text-gray-400">No locations found. Add a location above.</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each data.locationData as location}
            <div class="border border-muted-b p-3 bg-input relative">
              <div class="font-semibold text-white mb-1">{location.name}</div>
              {#if location.description}
                <div class="text-gray-300 text-sm">{location.description}</div>
              {/if}
              <button 
                class="absolute top-2 right-2 text-destructive hover:text-destructive-600 p-1 rounded transition-colors"
                onclick={() => deleteLocation(location.id, location.name)}
                title="Delete location">
                <Trash size={16} />
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Events Display -->
  <div class="bg-form border border-muted-b">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Events ({data.eventData.length})
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if data.eventData.length === 0}
        <p class="text-gray-400">No events found. Add an event above.</p>
      {:else}
        <div class="space-y-4">
          {#each data.eventData as event}
            <div class="border border-muted-b p-4 bg-input">
              <div class="flex justify-between items-start mb-2">
                <div class="font-semibold text-white text-lg">{event.name}</div>
                <div class="flex items-center gap-3">
                  <div class="text-emerald-400 text-sm">
                    {formatDate(event.date)}
                    {#if event.time}
                      <span class="text-gray-400 ml-2">at {formatTime(event.time)}</span>
                    {/if}
                  </div>
                  <button 
                    class="text-destructive hover:text-destructive-600 p-1 rounded transition-colors"
                    onclick={() => deleteEvent(event.id, event.name)}
                    title="Delete event">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <div class="text-gray-300 mb-2">
                <span class="text-emerald-400">📍</span> {event.locations.name}
              </div>
              {#if event.description}
                <div class="text-gray-300 text-sm">{event.description}</div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
