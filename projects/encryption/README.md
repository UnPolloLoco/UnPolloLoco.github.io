
# Encryption Activity Reflection


## Part 1: Key Exchange

My Key: `9`

My Partner's Key: `7`

**Our initial shared key: `16`**


## Part 2: Messaging

Complete this table with each of your messages. This should 
include the entire conversation - the messages that you sent
and the messages that you received.

| Encoded Message | Decoded Message | Key |
| --------------- | --------------- | --- |
| xy              | hi              | 16  |
| khb             | hey             | 3   |
| xhk             | hru             | 16  |
| jrrg            | good            | 3   |
| cu jee          | me too          | 16  |
| bdb             | yay             | 3   |

NOTE: The keys alternating was just bad luck; this (probably) doesn't happen in
the real thing!


## Part 3: Connection to TCP/IP Model

### Application Layer: Turn your message into binary

Everything we've done in this activity takes place in the application layer. By the time the message leaves the application
layer, it is encoded in binary. We've been working with text for this activity for convenience, but let's see what the binary
looks like.

Go back to the first encrypted message that you sent (it should be in `rsa_encryption_activity/send/encrypted_message.b64`).

This message is represented as a string of letters, numbers, and symbols. But we know that the real message is in binary.

Select the first six characters from this message and copy them here:

`n0uHSU`

Using the ASCII table, convert these five characters to binary (if necessary,
include leading zeroes so that each character is 8 bits): 

```
0110 1110
0011 0000
0111 0101
0100 1000
0101 0011
0101 0101
```


### Transport Layer: Break your message into packets

Assume that each packet can hold two bytes. Fill in the packet information below with the binary values you computed above.

    =========
    Packet 1:

    Source: Luka
    Destination: Grace 
    Sequence: 1/3
    Data: 0110 1110 0011 0000
    =========
    Packet 2:

    Source: Luka
    Destination: Grace
    Sequence: 2/3 
    Data: 0111 0101 0100 1000
    =========
    Packet 3:

    Source: Luka
    Destination: Grace
    Sequence: 3/3
    Data: 0101 0011 0101 0101
    =========

## Part 4: Reflection Questions

- **What is the difference between symmetric and asymmetric encryption? What purpose did each serve in this simulation?**
    - In symmetric encryption, both sides have a shared secret. In *asymmetric* encryption, however, the secrets are different—asymmetric, if you will. For our simulation, we used asymmetric encryption to create a SECURE symmetric shared secret.

- **Why is it important that this protocol uses a new key for each message?**
    - If we used the key over and over, an attacker only has to break the code once to read *every single* message. However, if the key changes every time, then the attacker can only read *one* message.

- **Why is it important that you never share your secret key?**
    - My private key is the only thing that can decode encrypted messages coming my way, so if anyone else gets their hands on it then they can read everything too.

- **In the transport layer, do these messages use TCP or UDP? Why?**
    - These messages should probably be TCP (the reliable one), since it's not something continous like a live call that can easily recover from a lost packet or two.

- **Now that you've created packets in the transport layer, give a short explanation of what happens to these packets in the internet layer and in the link layer.**
    - Once the packets are made, they're sent to the router—this is the internet layer. The router uses its routing table (map of the internet) and the packet's destination IP to make a best guess on where to send the packet next. Then, it sends the binary through a physical medium (link layer), which may include radio waves or fiber-optic cables. The next router recieves this binary (still in the link layer), checks its own routing table (internet layer), then forwards the packet once more. This repeats until the packet finally reaches the router whose IP address matches the packet's destination IP address.

- **This protocol successfully encrypts the _content_ of the message. Even though and adversary in the middle can't read the content of the message, what other information can they still see?**
    - I assume they're still able to see the header, including where it came from and where it's going. Also, this doesn't *really* count but they can at least see the encrypted version of the message too.
