def partition(list, lo, hi):
  i = lo + 1
  pivot = list[lo]
  for j in range(lo + 1, hi + 1):
    if list[j] < pivot:
      list[i], list[j] = list[j], list[i]
      i = i + 1

  list[lo], list[i-1] = list[i-1], list[lo]
  return i-1

def quick_sort(list, lo, hi):
  if (lo < hi):
    p = partition(list, lo, hi)
    quick_sort(list, lo, p-1)
    quick_sort(list, p+1, hi)

arr = [1,12,5,26,7,14,3,7,2]
arr = [10, 7, 8, 9, 1, 5]

print('original: %s' % arr)
quick_sort(arr, 0, len(arr)-1)
print(arr)