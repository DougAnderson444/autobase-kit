<script>
	import { onMount } from 'svelte';

	let swarm, sw;
	let core;
	let latestCore;

	onMount(async () => {
		const Corestore = await import('../modules/corestore/corestore');
		const RAM = await import('random-access-memory');

		const store = new Corestore.default(RAM.default);

		// You can access cores from the store either by their public key or a local name
		core = store.get({ name: 'my-first-core' });

		await core.ready();

		core.on('append', (data) => {
			// the core has been appended, either locally or remotely.
			core = core; // trigger svelte refresh
		});

		await core.append(Buffer.from('a block'));
		await core.append(Buffer.from('another block'));
	});
</script>

Corestore<br />
{#if core && core.key}
	Core public key: {core.key.toString('hex')}<br />
	Core has {core.length} entries
{/if}
