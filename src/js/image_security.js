import { md5 } from "./md5.js";

class ImageSecurity {
  constructor() {
    this.images = document.querySelectorAll("img[data-obfuscate]");
    this.addEventListeners();
    this.obfuscateImageURLs();
  }

  addEventListeners() {
    document.addEventListener("contextmenu", (event) => {
      if (event.target.matches("img[data-obfuscate]")) {
        event.preventDefault();
      }
    });

    document.addEventListener("dragstart", (event) => {
      if (event.target.matches("img[data-obfuscate]")) {
        event.preventDefault();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.ctrlKey &&
        (event.key === "c" || event.key === "i") &&
        event.target.matches("img[data-obfuscate]")
      ) {
        event.preventDefault();
      }
    });
  }

  static generateUniqueFilename(originalFilename) {
    const hash = md5(originalFilename);
    const fileExtension = originalFilename.substring(
      originalFilename.lastIndexOf(".") + 1,
    );
    const uniqueFilename = `${hash}.${fileExtension}`;
    return uniqueFilename;
  }

  obfuscateImageURLs() {
    this.images.forEach((image) => {
      const originalSrc = image.getAttribute("src");
      const uniqueFilename = ImageSecurity.generateUniqueFilename(originalSrc);
      image.setAttribute("src", uniqueFilename);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new ImageSecurity());
