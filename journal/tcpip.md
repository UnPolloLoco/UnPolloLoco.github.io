# The TCP/IP Model

This is an internet model with four layers.


## Application

This is the human part. It turns whatever you do into the 1s and 0s that
will be used for the other layers.

Examples:

- WWW (World Wide Web)
    - HTTP/HTTPS
- Email
- Calls
    - VOIP (Voice over IP)
- Messaging
    - SMS (Short Message Service)


## Transport

Either creates new packets or reassembles collected packets, depending on
which direction the data is going.

Protocols:

- TCP (Transmission Control)
    - Fixes lost packets
    - Slower
- UDP (User Datagram)
    - Ignores lost packets
    - Faster
    - Used for LIVE things like calls


## Internet

This is the layer where router-to-router communication happens.
The internet layer is also where IP addresses come into play, these being:

- IPv4
- IPv6

## Link (Network Access)

The physical aspect, be it light in a fiber-optic cable or radio waves
is part of this layer.

Some protocols include:

- WiFi
- Ethernet
- Bluetooth
- LTE
