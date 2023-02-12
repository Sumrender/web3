// Fallback and Receive 
Example demonstrating the use of receive and fallback.

fallback and receive are special functions in solidity.
they are called when we send eth directly without using any of the functions
implemented in the contracts.

these functions do not use the function keyword while declaring.
Another example of special function is constructor()

receive() is called when there is no data but cash is sent to the contract.
fallback() is called when there is some accompanying data with the cash sent to the 
contract.

Refer to the example contract for more clarity.