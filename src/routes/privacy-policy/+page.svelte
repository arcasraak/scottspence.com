<script>
  import Head from '@components/head.svelte'
  import { name, website } from '@lib/info'
  import { ogImageUrl } from '@lib/og-image-url-build'

  export let data
  let { Copy } = data
</script>

<Head
  title={`Privacy Policy · ${name}`}
  description={`${name} Privacy Policy page.`}
  image={ogImageUrl(name, `scottspence.com`, `Privacy Policy`)}
  url={`${website}/privacy-policy`}
/>

<div class="all-prose">
  <svelte:component this={Copy} />
</div>

<div class="flex flex-col w-full my-10">
  <div class="divider" />
</div>
