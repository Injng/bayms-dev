<script lang="ts">
  import "../app.css";
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { Session } from '@supabase/supabase-js';
  
  let { data, children } = $props()
  let { session, supabase } = $derived(data)
  
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession: Session | null) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })
  
    return () => data.subscription.unsubscribe()
  })
</script>

<div>
  {@render children()}
</div>
