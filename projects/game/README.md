# The ORB

## Story & Setting

The goal of the game is to find and steal THE ORB!!!, and then flee back to your campsite before the CURSE OF THE ORB!!! takes its revenge.

This story is set in a foresty area (jungle, perhaps? or is that too on-the-nose?). Somewhere in this forest is the grand temple which houses THE ORB!!!. You must navigate the river to reach the temple, then search for the keys to the temple's inner sanctum where THE ORB!!! is waiting. Since THE ORB!!! just has to be cursed, you must escape back to your campsite within a certain amount of turns or else the CURSE OF THE ORB!!! will consume you.

## Map

This miiight have to be cut down depending on how hard it is to make this 😳😔 Just maybe

```mermaid
graph TD;
    s(((Start))) -.- Campsite
    Campsite --- cart[Cartographer] & sci[Researcher]
    cart -.-|Talk to recieve| mnc(["Map"])
    Campsite === Boat
    Boat ==== river["River Travel"]
    river =====  Riverbank
    Riverbank === grounds["Temple Grounds"]
    grounds --- lb["Left Bench"] & rb["Right Bench"]
    lb -.-|Visible from bench| large(["Large Key"])
    grounds ===== hall["Great Hall"]


    hall ====== door["Big Locked Door"]
    hall --- fl["Front Left Room"]
    hall ---- ml["Mid Left Room
                  (DARK)"]
    hall ----- bl["Back Left Room 
                  (DARK)"]
    hall --- fr["Front Right Room
                 (DARK)"]
    hall ---- mr["Mid Right Room"]
    hall ----- br["Back Right Room"]


    fr -.-|Secret passage!!
           Visible with light| grounds
    bl -.-|Visible with light| small(["Small Key"])
    mr -.- medium(["Medium Key"])
    br -.- lant([Lantern])


    door ====|3 keys required| Sanctum
    Sanctum --- admire["Admire the Orb"]
    Sanctum ===== orb(("THE ORB!!!!!!!!!!!!!"))
```

### Map Details:
- You cannot start your journey without the mapping supplies
- You cannot inspect a DARK room without the LANTERN
- Once you recieve THE ORB!!! and so also the CURSE OF THE ORB!!!, the main temple door will close. You will have to get back out using the secret passage.
- Whatever the physical manefestation of the CURSE OF THE ORB!!! is will chase you down; you will lose the game if you cannot make it back to the Campsite in a certain number of turns

## Required Global Variables

All are booleans except for `remainingTurnsToEscape`, a number.

- `hasMap`
- `hasSmallKey`
- `hasMediumKey`
- `hasLargeKey`
- `hasLantern`
- `hasDiscoveredSecretPass`
- `hasCurseOfTheOrb`
- `remainingTurnsToEscape`