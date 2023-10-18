import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
export default function PostMarker = (db, lat, long, words) => {
  push(ref(db, '/markers'), {
    location: { latitude: lat, longitude: long },
    description: false,
    words: words,
  });
}