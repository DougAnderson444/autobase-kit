<script>
	import { onMount } from 'svelte';

	import Corestore from './Corestore.svelte';

	let swarm, sw;
	let mounted;

	onMount(async () => {
		// setup some globals
		const process = await import('process');
		global.process = process;

		const Buffer = await import('buffer');
		global.Buffer = Buffer.Buffer;

		const mod = await import('@geut/discovery-swarm-webrtc');

		const getSwarm = mod.default;

		const encoder = new TextEncoder();
		const algorithm = 'SHA-256';
		const data = encoder.encode('hey there!');
		const topicArrayBuff = await crypto.subtle.digest(algorithm, data);
		const topic = global.Buffer.from(topicArrayBuff);

		let typedArray = new Uint8Array(32);

		swarm = getSwarm({
			bootstrap: ['wss://geut-webrtc-signal-v3.glitch.me'],
			id: global.Buffer.from(crypto.getRandomValues(typedArray)) // peer-id for user
			// stream: (info) => stream, // stream to replicate across peers
			// simplePeer: {}, // options for the simplePeer instances,
			// maxPeers: 5, // max connections by peer
			// timeout: 15 * 1000, // defines the time to wait to establish a connection
		});

		// Swarms abstract away servers and clients and just gives you connections
		swarm.on('connection', function (encryptedSocket) {
			console.log('New connection from', encryptedSocket.remotePublicKey.toString('hex'));

			encryptedSocket.write('Hello world!');

			encryptedSocket.on('data', function (data) {
				console.log('Remote peer said:', data.toString());
			});
			encryptedSocket.on('error', function (err) {
				console.log('Remote peer errored:', err);
			});
			encryptedSocket.on('close', function () {
				console.log('Remote peer fully left');
			});

			encryptedSocket.pipe(console.log);
		});

		swarm.join(topic);
		// swarm.leave(Buffer)  // Leave from specific channel. Destroy all the connections and leave the channel.
		// swarm.close([callback]) // Close the entire swarm. Destroy all the connections and disconnect from the signal.
		// swarm.getPeers([channel]) // Returns the list of connected peers for a specific channel.
		// swarm.connect(channel: Buffer, peerId: Buffer) -> Promise<SimplePeer> // Connect directly to a specific peer.
		mounted = true;
	});
</script>

<svelte:head>
	<script>
		global = globalThis; // for solana web3 repo
	</script>
</svelte:head>

<!-- {JSON.stringify(swarm)} -->

{#if mounted}
	<Corestore />
{/if}
