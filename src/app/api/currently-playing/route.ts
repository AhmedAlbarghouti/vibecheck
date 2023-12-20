import { getCurrentlyPlayingTrack } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
      // Check for the secret key in request headers
      const secretKey = req.headers.get('x-secret-key');
      const expectedSecretKey = process.env.SECRET_KEY;
      if (!secretKey || secretKey !== expectedSecretKey) {
        // Respond with an error message if the secret key is missing or incorrect
        return NextResponse.json({ message: 'Unauthorized', status:401 })
      }
  
      // Fetch the currently playing track
      const spotify = await getCurrentlyPlayingTrack();
  
      if (!spotify || !spotify.is_playing) {
        return NextResponse.json({ message: 'No track currently playing.', status:404 })
      }
  
      // Respond with the track details
     const itemToSend = {
        title: spotify.item.name,
        artist: spotify.item.artists.map((artist) => artist.name).join(', '),
      };
     
      return NextResponse.json(itemToSend,{ status:200 })
    } catch (error) {
      console.error('Server error:', error);
      return NextResponse.json({ message: 'Internal server error', status:500 })
    }
  }