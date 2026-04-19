import { exec } from "child_process";
import dotenv from "dotenv";
import * as fs from "fs";
import { imageSizeFromFile } from "image-size/fromFile";

dotenv.config({ quiet: true });

const assetsFolder = process.env.IMAGES_DIRECTORY;
if (!assetsFolder) {
  throw new Error("No IMAGES_DIRECTORY found in .env");
}

let outputFolder = process.env.OUTPUT_DIRECTORY;
if (!outputFolder) {
  outputFolder = "./images";
}

const outputFolderPortrait = outputFolder + "/portrait/";
if (!fs.existsSync(outputFolderPortrait)) {
  fs.mkdirSync(outputFolderPortrait);
}

const outputFolderLandscape = outputFolder + "/landscape/";
if (!fs.existsSync(outputFolderLandscape)) {
  fs.mkdirSync(outputFolderLandscape);
}

const files = fs.readdirSync(assetsFolder);

const portraitFiles = fs.readdirSync(outputFolderPortrait);
const landscapeFiles = fs.readdirSync(outputFolderLandscape);

const promises = [];

files.forEach((_file) => {
  const file = assetsFolder + _file;
  const stats = fs.statSync(file);
  const sizeInKb = stats.size / 1024;
  if (
    sizeInKb > 100 &&
    !portraitFiles.includes(_file + ".jpg") &&
    !landscapeFiles.includes(_file + ".jpg")
  ) {
    const promise = imageSizeFromFile(file).then((dimensions) => {
      if (dimensions.width > dimensions.height) {
        fs.copyFileSync(file, outputFolderLandscape + _file + ".jpg");
      } else {
        fs.copyFileSync(file, outputFolderPortrait + _file + ".jpg");
      }
    });

    promises.push(promise);
  }
});

Promise.all(promises).then(() => {
  console.log(promises.length, "new images copied");
});

if (promises.length > 0 && process.argv?.[2] === "save") {
  exec("git add .", (err) => {
    if (err) throw err;
    exec(`git commit -m "Added ${promises.length} more images`, (err) => {
      if (err) throw err;
      exec("git push", (err) => {
        if (err) throw err;
        console.log("Images successfully commited to git and pushed");
      });
    });
  });
}
