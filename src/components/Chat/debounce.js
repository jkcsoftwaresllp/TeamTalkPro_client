import debounce from 'lodash.debounce';

export default function useDebounce(func, wait = 300) {
  return debounce(func, wait);
}
