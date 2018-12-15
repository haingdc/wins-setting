# Recursive version for binary search:
#   L: list
#   k: item to find
#   look for k for index range [low, high]
def binary_search(L, k, low, high):
  if low > high:
    return None
  else:
    mid = (low+high) // 2
    guess = L[mid]
    if k == guess:
      return mid
    if k < guess: 
      return binary_search(L, k, low, mid-1)
    else:
      return binary_search(L, k, mid+1, high)

my_list = [1, 3, 5, 7, 9]

print(binary_search(my_list, 3, 0, len(my_list)-1))
print(binary_search(my_list, -1, 0, len(my_list)-1))
print(binary_search(my_list, 7, 0, len(my_list)-1))