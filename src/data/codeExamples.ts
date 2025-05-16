export const codeExamples = {
  basic: `// Basic Array Operations
#include <iostream>
using namespace std;

int main() {
    // Initialize an array
    int arr[10] = {0};
    
    // Set values
    for (int i = 0; i < 10; i++) {
        arr[i] = i * 10;
    }
    
    // Print values
    for (int i = 0; i < 10; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`,

  linearSearch: `// Linear Search
#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            return i;
        }
    }
    return -1; // Not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 10;
    
    int result = linearSearch(arr, n, x);
    
    if (result == -1) {
        cout << "Element not found";
    } else {
        cout << "Element found at index " << result;
    }
    
    return 0;
}`,

  binarySearch: `// Binary Search
#include <iostream>
using namespace std;

int binarySearch(int arr[], int low, int high, int x) {
    if (high >= low) {
        int mid = low + (high - low) / 2;
        
        // If the element is present at the middle
        if (arr[mid] == x)
            return mid;
        
        // If element is smaller than mid
        if (arr[mid] > x)
            return binarySearch(arr, low, mid - 1, x);
        
        // Else the element can only be present in right subarray
        return binarySearch(arr, mid + 1, high, x);
    }
    
    // Element is not present in array
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 10;
    
    int result = binarySearch(arr, 0, n - 1, x);
    
    if (result == -1) {
        cout << "Element not found";
    } else {
        cout << "Element found at index " << result;
    }
    
    return 0;
}`,

  bubbleSort: `// Bubble Sort
#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    bubbleSort(arr, n);
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    
    return 0;
}`
};