import axios from 'axios';
import getConfig from 'next/config';

import { config } from '../commons.queries';

const { publicRuntimeConfig } = getConfig();

export const getLocations = async () => {
  const url = `${publicRuntimeConfig.backend_url}/locations`;

  config.headers['x-auth-token'] =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJqdWFubWFhbHRAZ21haWwuY29tIiwidXNlclR5cGVJZCI6MiwiZmlyc3ROYW1lIjoiSnVhbiIsImxhc3ROYW1lIjoiQWx0YW1pcmFubyIsInBob25lIjoxMTAyMzkzOTIsImRuaSI6Mzc5MzkyMDM5LCJzdGF0dXNJZCI6MiwiYXBwcm92ZWRCeSI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMTBUMjE6MTE6MTkuMTY4WiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6eyJpZCI6MywiYmFsYW5jZSI6MCwiaXNBY3RpdmUiOnRydWV9LCJzdGF0dXMiOnsiaWQiOjIsImRlc2NyaXB0aW9uIjoiQXByb2JhZG8ifSwiaWF0IjoxNjE2NjE4NTQyfQ.NRPtEehND-mU0ZB0geDoNgPKzKNvst_hUCp8oPBJksc';

  const { data } = await axios.get(url, config);

  const result = data.results.map((location) => location.name);

  return result;
};
