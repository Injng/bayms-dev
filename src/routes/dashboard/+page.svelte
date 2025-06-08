<!--
    dashboard/+page.svelte
    Author: Lin Jiang (@Injng)
    The default dashboard page for editing profile information.
  -->
<script lang="ts">
  import { fileProxy, superForm } from "sveltekit-superforms";

  // get page data loaded from server
  let { data } = $props();

  // load personal information form from superforms
  const {
    form: personalInformationForm,
    errors: personalInformationErrors,
    constraints: personalInformationConstraints,
    message: personalInformationMessage,
    enhance: personalInformationEnhance,
    submitting: personalInformationSubmitting,
  } = superForm(data.personalInformationForm, {
    resetForm: false,
  });

  // load location and school form from superforms
  const {
    form: locationSchoolForm,
    errors: locationSchoolErrors,
    constraints: locationSchoolConstraints,
    message: locationSchoolMessage,
    enhance: locationSchoolEnhance,
    submitting: locationSchoolSubmitting,
  } = superForm(data.locationSchoolForm, {
    resetForm: false,
  });

  // load about information form from superforms
  const {
    form: aboutInformationForm,
    errors: aboutInformationErrors,
    constraints: aboutInformationConstraints,
    message: aboutInformationMessage,
    enhance: aboutInformationEnhance,
    submitting: aboutInformationSubmitting,
  } = superForm(data.aboutInformationForm, {
    resetForm: false,
  });
  const picture = fileProxy(aboutInformationForm, 'picture');

  // load parent 1 information form from superforms
  const {
    form: parent1InformationForm,
    errors: parent1InformationErrors,
    constraints: parent1InformationConstraints,
    message: parent1InformationMessage,
    enhance: parent1InformationEnhance,
    submitting: parent1InformationSubmitting,
  } = superForm(data.parent1InformationForm, {
    resetForm: false,
  });
  
  // load parent 2 information form from superforms
  const {
    form: parent2InformationForm,
    errors: parent2InformationErrors,
    constraints: parent2InformationConstraints,
    message: parent2InformationMessage,
    enhance: parent2InformationEnhance,
    submitting: parent2InformationSubmitting,
  } = superForm(data.parent2InformationForm, {
    resetForm: false,
  });

  // states
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // instruments
  const instruments = [
    "Bassoon", "Cello", "Clarinet", "Flute", "Oboe", "Percussion", "Piano",
    "Saxophone", "Trumpet", "Viola", "Violin", "Voice"
  ];
</script>

<div class="pl-52 pr-52 pt-5">
  <div class="text-2xl text-white">
    User Profile
  </div>

  <!-- Personal Information Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Personal Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $personalInformationMessage}
        <p class="mb-3 text-sm text-white">{$personalInformationMessage}</p>
      {/if}
      <form method="POST" action="?/save_personal_information"
            use:personalInformationEnhance>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Name</div>
          <div>
            <input name="name" type="text" class="border border-muted-b bg-input w-full"
                   {...$personalInformationConstraints.name}
                   bind:value={$personalInformationForm.name}>
            {#if $personalInformationErrors.name}
              <p class="text-red-500 text-xs mt-1">{$personalInformationErrors.name}</p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Email</div>
          <div>
            <input name="email" type="email"
                   class="border-muted-b bg-input opacity-50 w-full cursor-not-allowed"
                   disabled
                   {...$personalInformationConstraints.email}
                   bind:value={$personalInformationForm.email}>
            {#if $personalInformationErrors.email}
              <p class="text-red-500 text-xs mt-1">{$personalInformationErrors.email}</p>
            {/if}
          </div>
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-start">
            <div>Phone</div>
            <div>
              <input name="phone" type="tel" class="border border-muted-b bg-input w-full"
                     {...$personalInformationConstraints.phone}
                     bind:value={$personalInformationForm.phone}>
              {#if $personalInformationErrors.phone}
                <p class="text-red-500 text-xs mt-1">{$personalInformationErrors.phone}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 ml-5 items-start">
            <div>Birthday</div>
            <div>
              <input name="birthday" type="date" 
                     class="border border-muted-b bg-input w-full"
                     {...$personalInformationConstraints.birthday}
                     bind:value={$personalInformationForm.birthday}>
              {#if $personalInformationErrors.birthday}
                <p class="text-red-500 text-xs mt-1">
                  {$personalInformationErrors.birthday}
                </p>
              {/if}
            </div>
          </label>
        </div>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$personalInformationSubmitting}>
            {#if $personalInformationSubmitting}
              Saving...
            {:else}
              Save
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- School and Location Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Address and School Information
    </div>
    {#if $locationSchoolMessage}
      <div class="pl-5 pr-5 pt-3">
        <p class="mb-3 text-sm text-white">{$locationSchoolMessage}</p>
      </div>
    {/if}
    <form method="POST" action="?/save_location_information"
          use:locationSchoolEnhance>
      <div class="pt-3 pb-3 pl-5 pr-5 border-b border-muted-b">
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Street</div>
          <div>
            <input name="street" type="text" class="border border-muted-b bg-input w-full"
                   {...$locationSchoolConstraints.street}
                   bind:value={$locationSchoolForm.street}>
            {#if $locationSchoolErrors.street}
              <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.street}</p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>City</div>
          <div>
            <input name="city" type="text" class="border border-muted-b bg-input w-full"
                   {...$locationSchoolConstraints.city}
                   bind:value={$locationSchoolForm.city}>
            {#if $locationSchoolErrors.city}
              <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.city}</p>
            {/if}
          </div>
        </label>
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 mr-5 items-start">
            <div>State</div>
            <div>
              <select name="state" id="states" class="border border-muted-b bg-input w-full"
                      {...$locationSchoolConstraints.state}
                      bind:value={$locationSchoolForm.state}>
                <option value="">Select a state</option>
                {#each states as state}
                  <option value={state}>{state}</option>
                {/each}
              </select>
              {#if $locationSchoolErrors.state}
                <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.state}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-[150px_1fr] ml-5 items-start">
            <div>ZIP Code</div>
            <div>
              <input name="zip" type="text" class="border border-muted-b bg-input w-full"
                     {...$locationSchoolConstraints.zip}
                     bind:value={$locationSchoolForm.zip}>
              {#if $locationSchoolErrors.zip}
                <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.zip}</p>
              {/if}
            </div>
          </label>
        </div>
      </div>
      <div class="pt-3 pb-3 pl-5 pr-5">
        <div class="grid grid-cols-2">
          <label class="grid grid-cols-[150px_1fr] mb-2 items-start mr-5">
            <div>School Name</div>
            <div>
              <input name="school" type="text" class="border border-muted-b bg-input w-full"
                     {...$locationSchoolConstraints.school}
                     bind:value={$locationSchoolForm.school}>
              {#if $locationSchoolErrors.school}
                <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.school}</p>
              {/if}
            </div>
          </label>
          <label class="grid grid-cols-[150px_1fr] mb-2 items-start ml-5">
            <div>Grade</div>
            <div>
              <input name="grade" type="number" class="border border-muted-b bg-input w-full"
                     {...$locationSchoolConstraints.grade}
                     bind:value={$locationSchoolForm.grade}>
              {#if $locationSchoolErrors.grade}
                <p class="text-red-500 text-xs mt-1">{$locationSchoolErrors.grade}</p>
              {/if}
            </div>
          </label>
        </div>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$locationSchoolSubmitting}>
            {#if $locationSchoolSubmitting}
              Saving...
            {:else}
              Save
            {/if}
          </button>
        </div>
      </div>
    </form>
  </div>

  <!-- About Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      About
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $aboutInformationMessage}
        <p class="mb-3 text-sm text-white">{$aboutInformationMessage}</p>
      {/if}
      <form method="POST" action="?/save_about_information" enctype="multipart/form-data"
            use:aboutInformationEnhance>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Picture (max 5 MB)</div>
          <div>
            <input name="picture" type="file"
                   class="border border-muted-b bg-input p-2 w-full"
                   accept=".jpg, .jpeg, .png, .webp"
                   {...$aboutInformationConstraints.picture}
                   bind:files={$picture}>
            {#if $aboutInformationErrors.picture}
              <p class="text-red-500 text-xs mt-1">{$aboutInformationErrors.picture}</p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Instruments</div>
          <div>
            <select name="instruments" class="border border-muted-b bg-input w-full"
                    multiple
                    {...$aboutInformationConstraints.instruments}
                    bind:value={$aboutInformationForm.instruments}>
              {#each instruments as instrument}
                <option value={instrument}>{instrument}</option>
              {/each}
            </select>
            {#if $aboutInformationErrors.instruments}
              <p class="text-red-500 text-xs mt-1">{$aboutInformationErrors.instruments}</p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Biography</div>
          <div>
            <textarea name="bio"
                      class="border border-muted-b bg-input w-full"
                      placeholder="Enter your biography here (max 650 chars)"
                      maxlength="650"
                      {...$aboutInformationConstraints.bio}
                      bind:value={$aboutInformationForm.bio}></textarea>
            {#if $aboutInformationErrors.bio}
              <p class="text-red-500 text-xs mt-1">{$aboutInformationErrors.bio}</p>
            {/if}
          </div>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$aboutInformationSubmitting}>
            {#if $aboutInformationSubmitting}
              Saving...
            {:else}
              Save
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Parent 1 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 1 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $parent1InformationMessage}
        <p class="mb-3 text-sm text-white">{$parent1InformationMessage}</p>
      {/if}
      <form method="POST" action="?/save_parent1_information"
            use:parent1InformationEnhance>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 1 Name</div>
          <div>
            <input name="parent1name" type="text"
                   class="border border-muted-b bg-input w-full"
                   {...$parent1InformationConstraints.parent1name}
                   bind:value={$parent1InformationForm.parent1name}>
            {#if $parent1InformationErrors.parent1name}
              <p class="text-red-500 text-xs mt-1">
                {$parent1InformationErrors.parent1name}
              </p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 1 Email</div>
          <div>
            <input name="parent1email" type="email"
                   class="border border-muted-b bg-input w-full"
                   {...$parent1InformationConstraints.parent1email}
                   bind:value={$parent1InformationForm.parent1email}>
            {#if $parent1InformationErrors.parent1email}
              <p class="text-red-500 text-xs mt-1">
                {$parent1InformationErrors.parent1email}
              </p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 1 Phone</div>
          <div>
            <input name="parent1phone" type="tel"
                   class="border border-muted-b bg-input w-full"
                   {...$parent1InformationConstraints.parent1phone}
                   bind:value={$parent1InformationForm.parent1phone}>
            {#if $parent1InformationErrors.parent1phone}
              <p class="text-red-500 text-xs mt-1">
                {$parent1InformationErrors.parent1phone}
              </p>
            {/if}
          </div>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$parent1InformationSubmitting}>
            {#if $parent1InformationSubmitting}
              Saving...
            {:else}
              Save
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Parent 2 Form -->
  <div class="bg-form border border-muted-b mt-5">
    <div class="border-b border-muted-b pt-3 pb-3 pl-5 pr-5 text-white text-lg">
      Parent 2 Information
    </div>
    <div class="pt-3 pb-3 pl-5 pr-5">
      {#if $parent2InformationMessage}
        <p class="mb-3 text-sm text-white">{$parent2InformationMessage}</p>
      {/if}
      <form method="POST" action="?/save_parent2_information"
            use:parent2InformationEnhance>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 2 Name</div>
          <div>
            <input name="parent2name" type="text"
                   class="border border-muted-b bg-input w-full"
                   {...$parent2InformationConstraints.parent2name}
                   bind:value={$parent2InformationForm.parent2name}>
            {#if $parent2InformationErrors.parent2name}
              <p class="text-red-500 text-xs mt-1">
                {$parent2InformationErrors.parent2name}
              </p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 2 Email</div>
          <div>
            <input name="parent2email" type="email"
                   class="border border-muted-b bg-input w-full"
                   {...$parent2InformationConstraints.parent2email}
                   bind:value={$parent2InformationForm.parent2email}>
            {#if $parent2InformationErrors.parent2email}
              <p class="text-red-500 text-xs mt-1">
                {$parent2InformationErrors.parent2email}
              </p>
            {/if}
          </div>
        </label>
        <label class="grid grid-cols-[150px_1fr] mb-2 items-start">
          <div>Parent 2 Phone</div>
          <div>
            <input name="parent2phone" type="tel"
                   class="border border-muted-b bg-input w-full"
                   {...$parent2InformationConstraints.parent2phone}
                   bind:value={$parent2InformationForm.parent2phone}>
            {#if $parent2InformationErrors.parent2phone}
              <p class="text-red-500 text-xs mt-1">
                {$parent2InformationErrors.parent2phone}
              </p>
            {/if}
          </div>
        </label>
        <div class="w-full flex justify-end">
          <button class="border border-emerald-900 hover:border-emerald-800 p-2 pt-1 pb-1
                         mt-2 bg-emerald-800 hover:bg-emerald-700 text-white transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={$parent2InformationSubmitting}>
            {#if $parent2InformationSubmitting}
              Saving...
            {:else}
              Save
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

