class HashMap {
  constructor() {
    // Initialize the hash map with default capacity and load factor
    this.capacity = 16; // Initial size of the buckets array
    this.loadFactor = 0.8; // Determines when to resize (size/capacity >= number)
    this.size = 0; // Number of key-value pairs in the hash map
    // Create an array of empty buckets (each bucket is an array)
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []); // Each bucket starts as an empty array
  }

  // Hash function to compute the index for a given key
  hash(key) {
    let hashCode = 0; // Initialize hash code to 0
    const primeNumber = 31; // Prime number for generating the hash code

    // Generate a hash code by combining ASCII values of characters
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const asciiValue = char.charCodeAt(0); // Get ASCII value of the character
      hashCode += asciiValue * primeNumber; // Multiply and accumulate
    }

    return hashCode % this.capacity; // Return index within current capacity
  }

  // Check if the calculated index is within valid bounds
  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  // Resize the hash map when the load factor is exceeded
  resize() {
    const newCapacity = this.capacity * 2; // Double the capacity
    // Create a new array of buckets with the new capacity
    const newBuckets = Array(newCapacity)
      .fill(null)
      .map(() => []);

    // Rehash all existing key-value pairs into the new buckets
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        const newIndex = this.hash(key) % newCapacity; // Calculate new index
        this.checkIndex(newIndex); // Ensure index is valid
        newBuckets[newIndex].push([key, value]); // Add the pair to the new bucket
      }
    }

    // Update the hash map's capacity and buckets
    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  // Get the bucket corresponding to a given key
  getBucket(key) {
    const index = this.hash(key); // Compute the bucket index
    this.checkIndex(index); // Ensure the index is valid
    return this.buckets[index]; // Return the bucket
  }

  // Add or update a key-value pair in the hash map
  set(key, value) {
    const bucket = this.getBucket(key); // Get the appropriate bucket

    // Check if the key already exists and update its value
    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedValue] = bucket[i];
      if (storedKey === key) {
        bucket[i] = [key, value]; // Update the value
        return;
      }
    }

    // If the key does not exist, add a new pair
    bucket.push([key, value]);
    this.size++; // Increment the size

    // Check if resizing is needed
    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }
  }

  // Retrieve the value associated with a given key
  get(key) {
    const bucket = this.getBucket(key); // Get the appropriate bucket

    // Search for the key in the bucket
    for (const [storedKey, storedValue] of bucket) {
      if (storedKey === key) return storedValue; // Return the value if found
    }

    return null; // Return null if the key is not found
  }

  // Check if a key exists in the hash map
  has(key) {
    const bucket = this.getBucket(key); // Get the appropriate bucket

    // Search for the key in the bucket
    for (const [storedKey, storedValue] of bucket) {
      if (storedKey === key) return true; // Return true if found
    }
    return false; // Return false if not found
  }

  // Remove a key-value pair from the hash map
  remove(key) {
    const bucket = this.getBucket(key); // Get the appropriate bucket

    // Search for the key in the bucket
    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedValue] = bucket[i];
      if (storedKey === key) {
        bucket.splice(i, 1); // Remove the key-value pair
        this.size--; // Decrement the size
        return;
      }
    }
  }

  // Get the number of key-value pairs in the hash map
  length() {
    console.log("The number of stored keys is: ", this.size);
  }

  // Clear all key-value pairs in the hash map
  clear() {
    // Reset buckets to an empty array of the current capacity
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0; // Reset the size to 0
  }

  // Get all keys in the hash map
  keys() {
    const keys = []; // Initialize an empty array to store keys

    for (const bucket of this.buckets) {
      for (const [storedKey, storedValue] of bucket) {
        keys.push(storedKey); // Add each key to the array
      }
    }
    return keys; // Return the array of keys
  }

  // Get all values in the hash map
  values() {
    const values = []; // Initialize an empty array to store values

    for (const bucket of this.buckets) {
      for (const [storedKey, storedValue] of bucket) {
        values.push(storedValue); // Add each value to the array
      }
    }
    return values; // Return the array of values
  }

  // Get all key-value pairs as an array of [key, value] arrays
  entries() {
    const entries = []; // Initialize an empty array to store entries

    for (const bucket of this.buckets) {
      for (const [storedKey, storedValue] of bucket) {
        entries.push([storedKey, storedValue]); // Add each pair to the array
      }
    }
    return entries; // Return the array of entries
  }
}

// Instantiate the HashMap
const test = new HashMap();

// Add key-value pairs
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Test `get` method
console.log("apple:", test.get("apple")); // Expected: "red"
console.log("banana:", test.get("banana")); // Expected: "yellow"
console.log("lion:", test.get("lion")); // Expected: "golden"

// Test `has` method
console.log("Has 'dog' key?", test.has("dog")); // Expected: true
console.log("Has 'zebra' key?", test.has("zebra")); // Expected: false

// Test `remove` method
test.remove("frog");
console.log("Has 'frog' key after removal?", test.has("frog")); // Expected: false

// Test `keys` method
console.log("Keys:", test.keys());
// Expected: ["apple", "banana", "carrot", "dog", "elephant", "grape", "hat", "ice cream", "jacket", "kite", "lion"]

// Test `values` method
console.log("Values:", test.values());
// Expected: ["red", "yellow", "orange", "brown", "gray", "purple", "black", "white", "blue", "pink", "golden"]

// Test `entries` method
console.log("Entries:", test.entries());
// Expected: [["apple", "red"], ["banana", "yellow"], ["carrot", "orange"], ["dog", "brown"], ...]

// Test resizing behavior
console.log("Current capacity before resizing:", test.capacity); // Expected: 16
test.set("monkey", "brown"); // Add another key-value pair to trigger resizing
test.set("tree", "green");
test.set("eyes", "gray-blue");
console.log("Capacity after resizing:", test.capacity); // Expected: 32
test.length(); //Expected: The number of keys is 14

// Test `clear` method
test.clear();
console.log("Keys after clearing:", test.keys()); // Expected: []
console.log("Values after clearing:", test.values()); // Expected: []
