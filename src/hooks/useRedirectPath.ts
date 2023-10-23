import { useSearchParams } from 'next/navigation';

function useRedirectPath() {
  return useSearchParams().get('redirectPath');
}

export { useRedirectPath };
