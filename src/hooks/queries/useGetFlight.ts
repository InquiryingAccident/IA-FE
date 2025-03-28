import {getFlight} from '@/api/post';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

function useGetFlight(ident: string, queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryFn: () => getFlight(ident),
    queryKey: [queryKeys.GET_FLIGHT],
    ...queryOptions,
  });
}

export default useGetFlight;
