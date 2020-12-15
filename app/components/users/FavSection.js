import React from 'react';
import { getMediaType } from '../../functions/helpers';
import { ScrollingContent } from '../common/Layout';
import SectionTitle from '../common/SectionTitle';
import ArtistsList from '../media/artists/ArtistsList';
import TrackList from '../media/tracks/TrackList';

export default ({ favorites }) => {
  const tracksAndAlbums = favorites.filter(fav => getMediaType(fav) !== 'artist')
  const artists = favorites.filter(fav => getMediaType(fav) === 'artist')

  return (
    <ScrollingContent>
      <SectionTitle text='Morceaux et albums'/>
      <TrackList showArtist tracks={tracksAndAlbums} />
      <SectionTitle text='Artistes' />
      <ArtistsList artists={artists} />
    </ScrollingContent>
  )

}
