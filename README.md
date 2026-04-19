# Windows 11 lock screen image copier

Windows lock screens can be quite beautiful. Generally you'll see a new one each day. There isn't a full list saved to your computer. Instead, Windows appears to downloaded new ones on a regular basis and stores about 10 ready to show you at any point. However, Windows doesn't show you all the images that it downloads for you. Sometimes it'll repeat.

Sometimes I want to know where an image is from an Windows doesn't tell me. To figure this out, I like to upload them to use Google to search by image. The image files are stored away deep in the AppData folder. They also aren't stored as image files - instead being stored without an extension. In that folder there is also a bunch of files that aren't lock screen backgrounds.

This script will copy all lock screen images saved to your computer.

## Instructions

### Step 1:

Create a .env file in this repo's directory. It should look something like this (but with "XXXX" replaced with your user):

```
IMAGES_DIRECTORY="C:/Users/XXXX/AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets/"
OUTPUT_DIRECTORY=""
```

`OUTPUT_DIRECTORY` is optional. If one isn't provided then the images will be saved to the images folder inside this repo's directory.

`IMAGES_DIRECTORY` must contain the absolute directory of the assets folder.

###Step 2:

Run `npm start` in a terminal, then check your output directory.

Images will be split by orientation.
