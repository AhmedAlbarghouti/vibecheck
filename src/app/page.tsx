import { getCurrentlyPlayingTrack } from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
	const spotify = await getCurrentlyPlayingTrack();

	return (
		<main className='flex min-h-screen flex-col items-center justify-center gap-20 p-5 md:p-24 '>
			<h1 className='text-3xl md:text-5xl text-center text-green-400 '>
				Ahmed&apos;s Current Spotify Vibe
			</h1>
			<div className='flex flex-col items-center justify-center'>
				{spotify?.is_playing ? (
					<div className='flex flex-col md:flex-row items-center justify-center gap-8'>
						<div className='relative inline-block shadow-pulse slow-spin'>
							<Image
								src={spotify?.item?.album?.images[0].url}
								alt={spotify?.item?.album?.name}
								width={250}
								height={250}
								className='rounded-full'
							/>
						</div>
						<div className='flex flex-col gap-4'>
							<h2 className='text-xl text-center md:text-left md:text-3xl font-bold'>
								{spotify?.item?.name}
							</h2>
							<p className='text-center md:text-left text-lg'>
								{spotify.item.artists.map((artist) => artist.name).join(", ")}
							</p>
						</div>
					</div>
				) : (
					<p className='text-xl text-center '>
						Ahmed is currently not listening to anything 🥺
					</p>
				)}
			</div>
		</main>
	);
}
