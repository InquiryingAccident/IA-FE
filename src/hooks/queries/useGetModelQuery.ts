import {getModel} from '@/api/post';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

function useGetModelQuery(
  modelCode: string,
  queryOptions?: UseQueryCustomOptions,
) {
  return useQuery({
    queryFn: () => getModel(modelCode),
    queryKey: [queryKeys],
    ...queryOptions,
  });
}

export default useGetModelQuery;
