import emoji
import string
import random
import urllib.parse as urllib


EMOJI = "😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕😣😖😫😩🥺😢😭😤😠😡" + "🤬😳😱😨😰😥😓🤗🤔🤭😶😐😑😬🙄😯😦😮😲🤤😴🤒🤕🤑🤠😈👹👺🤡💩👻💀☠️👽🤖👍👎👊✌️🤞🤜🤛✊🤟🤘"


infinity = 922337203685477580


def gen_long_url(mode, amplifier, longer=False):
    print(amplifier)
    print(longer)
    if (amplifier == "1") and longer:
        min_len = 128
    elif (amplifier == "2") and longer:
        min_len = 256
    elif (amplifier == "3") and longer:
        min_len = 512
    elif (amplifier == "4") and longer:
        min_len = 1048
    else:
        min_len = 1048
        
    chars = string.ascii_letters + string.digits
    
    if mode == "caramel":
        chars += EMOJI + "$-_.+!*(),"
    
    for i in range(infinity):
        rand_chars = random.choices(chars, k=(i + min_len))
        rand_chars = "".join(rand_chars)
        return rand_chars


def gen_short_url(mode):
    chars = string.ascii_letters + string.digits
    
    if mode == "caramel":
        chars += EMOJI + "$-_.+!*(),"

    for i in range(infinity):
        rand_chars = random.choices(chars, k=(i + 7))
        rand_chars = "".join(rand_chars)
        return rand_chars
        